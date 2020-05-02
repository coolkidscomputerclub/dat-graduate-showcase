const parseCustomProperties = require('./utilities/parse-css-custom-properties');
const breakpoints = require('./assets/js/breakpoints');

const screens = Object.entries(breakpoints).reduce(
  (accumulator, [name, { em }]) => ({
    ...accumulator,

    [name]: `${em}em`,
    [`<${name}`]: { max: `${em - 0.0000000001}em` },
  }),
  {},
);

const customProperties = parseCustomProperties();
const extractProperties = (customProperties, prefix) =>
  Object.entries(customProperties).reduce((acc, [prop, value]) => {
    if (prop.startsWith(prefix)) {
      return {
        ...acc,
        [prop.replace(prefix, '')]: value,
      };
    }

    return acc;
  }, {});

const colors = extractProperties(customProperties, '--color-');
const fontSize = extractProperties(customProperties, '--font-size-');
const spacing = extractProperties(customProperties, '--spacing-');

module.exports = {
  purge: false,
  theme: {
    screens,
    colors: {
      ...colors,
      transparent: 'transparent',
      'current-color': 'currentColor',
    },
    fontSize,
    spacing,
    inset: {
      ...spacing,
      ...Object.entries(spacing).reduce(
        (acc, [name, value]) => ({
          ...acc,
          [`-${name}`]: `-${value}`,
        }),
        {},
      ),
      full: '100%',
      '1/2': '50%',
    },
  },

  variants: {
    padding: ['responsive', 'first'],
  },
};
