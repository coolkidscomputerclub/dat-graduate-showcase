export const FEATURE_NAME = 'requestAnimationFrame';

export const CLASS_NAME = 'supports-request-animation-frame';

export default (() => {
  if (process.server) {
    return false;
  }

  return FEATURE_NAME in window;
})();
