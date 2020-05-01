import {
  listenForTouchSupport,
  toggleJavaScriptSupportClassNames,
} from '~/assets/js/supports';

toggleJavaScriptSupportClassNames();
listenForTouchSupport();

// fix `:active` styles on iOS
document.addEventListener('touchstart', () => {}, true);
