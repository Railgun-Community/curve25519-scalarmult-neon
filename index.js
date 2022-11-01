// Workaround to fix webpack's build warnings:
// 'the request of a dependency is an expression'
const runtimeRequire =
  typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;

const {scalarmult} = runtimeRequire(__dirname + '/index.node');

module.exports = {
  scalarMultiply(point, scalar) {
    const arrayBuf = scalarmult(point, scalar);
    return new Uint8Array(arrayBuf);
  },
  default() {
    return Promise.resolve();
  },
  __esModule: true,
};
