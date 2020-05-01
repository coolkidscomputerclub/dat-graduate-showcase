export const DEVELOPMENT = 'development';
export const STAGING = 'staging';
export const PRODUCTION = 'production';

export const NODE_ENV = process.env.NODE_ENV || DEVELOPMENT;
export const SITE_ENV = process.env.SITE_ENV || DEVELOPMENT;
export const PORT = process.env.PORT || 3000;

export const isDevelopment = NODE_ENV === DEVELOPMENT;
export const isStaging = SITE_ENV === STAGING;
export const isProduction = SITE_ENV === PRODUCTION;

export const ANALYZE = process.env.ANALYZE
  ? process.env.ANALYZE === 'true'
  : false;

export const FATHOM_SITE_ID = 'LQZWWCJY';

export const PRODUCTION_URL = 'https://dat.coolkidscomputer.club/';

export const URL = (() => {
  if (isProduction) {
    return PRODUCTION_URL;
  }

  if (isStaging) {
    return 'https://dat.coolkidscomputerclub.workers.dev/';
  }

  return `http://localhost:${PORT}/`;
})().replace(/\/?$/, '/');
