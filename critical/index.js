import 'lazysizes';
import 'focus-visible';
import domready from 'domready';

import Lemonade from '~/assets/js/lemonade';

domready(() => {
  const els = document.querySelectorAll('.js-image-sequence');

  els.forEach(el => {
    const lemonade = new Lemonade(el).init();

    el.addEventListener('mouseenter', () => lemonade.start());
    el.addEventListener('mouseleave', () => lemonade.stop().reset());
  });
});
