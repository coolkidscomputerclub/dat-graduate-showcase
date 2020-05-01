const path = require('path');

const glob = require('glob');
const { readFileSync } = require('fs-extra');
const postcss = require('postcss');

const settingsDir = path.join(process.cwd(), 'assets/css/settings');

module.exports = () => {
  const filepaths = glob.sync(path.join(settingsDir, 'settings.*.css'));

  const customProperties = filepaths.reduce((acc, filepath) => {
    const css = readFileSync(filepath, 'utf8');
    const root = postcss.parse(css);
    const props = {};

    root.walkRules(':root', node => {
      node.walkDecls(/^--/, ({ prop, value }) => {
        props[prop] = value;
      });
    });

    return {
      ...acc,
      ...props,
    };
  }, {});

  return customProperties;
};
