import * as supportsRequestAnimationFrame from '~/assets/js/supports/request-animation-frame';
import { addHtmlClassName, removeHtmlClassName } from '~/assets/js/utilities';

const htmlElement = document.documentElement;

export const JAVASCRIPT_UNSUPPORTED_CLASS_NAME = 'no-js';
export const JAVASCRIPT_SUPPORTED_CLASS_NAME = 'js';

export const DEFAULT_FEATURE_TESTS = [];

// add corresponding class names to HTML element if certain features are supported
export const addFeatureSupportClassNames = (
  featureTests = DEFAULT_FEATURE_TESTS,
) => {
  const classNames = featureTests
    .map(({ default: supported, CLASS_NAME }) => supported && CLASS_NAME)
    .filter(Boolean)
    .join(' ');

  addHtmlClassName(classNames);
};

export const addFeatureSupportGlobal = (
  featureTests = DEFAULT_FEATURE_TESTS,
) => {
  const supports = {};

  featureTests.reduce((accumulator, { default: isSupported, FEATURE_NAME }) => {
    if (isSupported) {
      accumulator[FEATURE_NAME] = isSupported;
    }

    return accumulator;
  }, supports);

  window.supports = supports;
};

export const toggleJavaScriptSupportClassNames = () => {
  if (supportsRequestAnimationFrame) {
    requestAnimationFrame(() => {
      removeHtmlClassName(JAVASCRIPT_UNSUPPORTED_CLASS_NAME);
      addHtmlClassName(JAVASCRIPT_SUPPORTED_CLASS_NAME);
    });

    return;
  }

  removeHtmlClassName(JAVASCRIPT_UNSUPPORTED_CLASS_NAME);
  addHtmlClassName(JAVASCRIPT_SUPPORTED_CLASS_NAME);
};

export const TOUCH_SUPPORTED_CLASS_NAME = 'supports-touch';

export const listenForTouchSupport = () => {
  // add `.supports-touch` to <html> if touch event is triggered
  document.addEventListener(
    'touchstart',
    function handleTouchStart() {
      htmlElement.className += ` ${TOUCH_SUPPORTED_CLASS_NAME}`;

      document.removeEventListener('touchstart', handleTouchStart, false);
    },
    false,
  );
};
