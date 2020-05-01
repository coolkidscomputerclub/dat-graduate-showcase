module.exports = {
  extends: 'stylelint-config-standard',

  plugins: ['stylelint-order', 'stylelint-no-unsupported-browser-features'],

  rules: {
    indentation: null,

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['nest'],
      },
    ],
    'comment-empty-line-before': null,

    // NOTE: these rules clash with Prettier
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,

    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
      },
    ],
  },
};
