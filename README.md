# Node.js addon for Curve25519 Scalarmult, written in Rust

Uses the Rust `Dalek` library to implement a performant scalarmult function.

## Installing curve25519-scalarmult-neon

Installing curve25519-scalarmult-neon requires a [supported version of Node and Rust](https://github.com/neon-bindings/neon#platform-support).

You can install the project with npm. In the project directory, run:

```sh
$ npm install
```

This fully installs the project, including installing any dependencies and running the build.

## Building curve25519-scalarmult-neon

If you have already installed the project and only want to run the build, run:

```sh
$ npm run build
```

This command uses the [cargo-cp-artifact](https://github.com/neon-bindings/cargo-cp-artifact) utility to run the Rust build and copy the built library into `./index.node`.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the project, including running `npm run build`.

### `npm build`

Builds the Node addon (`index.node`) from source.

Additional [`cargo build`](https://doc.rust-lang.org/cargo/commands/cargo-build.html) arguments may be passed to `npm build` and `npm build-*` commands. For example, to enable a [cargo feature](https://doc.rust-lang.org/cargo/reference/features.html):

```
npm run build -- --feature=beetle
```

#### `npm build-debug`

Alias for `npm build`.

#### `npm build-release`

Same as [`npm build`](#npm-build) but, builds the module with the [`release`](https://doc.rust-lang.org/cargo/reference/profiles.html#release) profile. Release builds will compile slower, but run faster.

### `npm test`

Runs the unit tests by calling `cargo test`. You can learn more about [adding tests to your Rust code](https://doc.rust-lang.org/book/ch11-01-writing-tests.html) from the [Rust book](https://doc.rust-lang.org/book/).

## Making prebuilds

### For Android

Make sure you have the cross-compilation targets supported:

```
rustup target add arm-linux-android
```

```
rustup target add aarch64-linux-android
```

```
rustup target add x86_64-linux-android
```

Use Android NDK version 24 or higher by ensuring you have the env var `ANDROID_NDK_HOME` pointed at the NDK 24 directory. If you get a compilation error about `-lgcc`, you might have to apply [this hack deep in your NDK](https://stackoverflow.com/questions/68873570/how-do-i-fix-ld-error-unable-to-find-library-lgcc-when-cross-compiling-rust).

```
npx prebuild-for-nodejs-mobile android-arm --sdk31 --verbose
```

```
npx prebuild-for-nodejs-mobile android-arm64 --sdk31 --verbose
```

```
npx prebuild-for-nodejs-mobile android-x64 --sdk31 --verbose
```

### For iOS


Make sure you have the cross-compilation targets supported:

```
rustup target add x86_64-apple-ios
```

```
rustup target add aarch64-apple-ios
```

Then compile the prebuilds:

```
npx prebuild-for-nodejs-mobile ios-arm64 --verbose
```

```
npx prebuild-for-nodejs-mobile ios-x64 --sdk31 --verbose
```
