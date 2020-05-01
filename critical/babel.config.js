export default {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
      },
    ],
  ],

  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '~': '.',
        },
      },
    ],
  ],
};
