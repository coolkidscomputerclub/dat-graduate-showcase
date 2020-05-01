export default () => {
  if (process.env.SITE_ENV !== 'production') {
    return;
  }

  if (window.location.hostname !== 'dat.coolkidscomputer.club') {
    return;
  }

  const { fathom } = window;

  if (typeof fathom === 'undefined') {
    console.warn('Fathom missing.');

    return;
  }

  fathom('trackPageview');
};
