use std::convert::TryInto;
use neon::prelude::*;

use curve25519_dalek::edwards::CompressedEdwardsY;
use curve25519_dalek::edwards::EdwardsPoint;
use curve25519_dalek::scalar::Scalar;
use curve25519_dalek::traits::MultiscalarMul;
use neon::types::buffer::TypedArray;

fn scalarmult(mut cx: FunctionContext) -> JsResult<JsArrayBuffer> {
    let point_bytes = cx.argument::<JsTypedArray<u8>>(0)?;
    let mut scalar_bytes = cx.argument::<JsTypedArray<u8>>(1)?;

    let compressed_point = CompressedEdwardsY::from_slice(point_bytes.as_slice(&cx));
    let inpoint = compressed_point.decompress().unwrap();

    let scalar_slice = scalar_bytes.as_mut_slice(&mut cx);
    scalar_slice.reverse();
    let scalar = Scalar::from_bytes_mod_order(scalar_slice.try_into().expect("invalid"));

    let outpoint = EdwardsPoint::multiscalar_mul([scalar], [inpoint]);
    let outpoint_bytes = outpoint.compress().to_bytes();
    let mut output = cx.array_buffer(32)?;

    // Copy outpoint bytes to output
    let lock = cx.lock();
    output
        .try_borrow_mut(&lock)
        .map(|mut slice| {
            slice.copy_from_slice(outpoint_bytes[..].as_ref());
        })
        .or_throw(&mut cx)?;

    Ok(output)
}


fn init(mut cx: FunctionContext) -> JsResult<JsPromise> {
    let (deferred, promise) = cx.promise();
    let result = cx.null();
    deferred.resolve(&mut cx, result);
    Ok(promise)
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    let exports = cx.exports_object()?;
    let js_init = JsFunction::new(&mut cx, init)?;
    let js_scalar_multiply = JsFunction::new(&mut cx, scalarmult)?;
    let tru = cx.boolean(true);
    exports.set(&mut cx, "default", js_init)?;
    exports.set(&mut cx, "scalarMultiply", js_scalar_multiply)?;
    exports.set(&mut cx, "__esModule", tru)?;
    Ok(())
}
