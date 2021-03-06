const path = require('path');

const ROOT_DIR = process.cwd();
const STATIC_DIR = path.join(ROOT_DIR, 'static');
const CRITICAL_DIR = path.join(ROOT_DIR, 'critical');
const DATA_DIR = path.join(ROOT_DIR, 'assets/data');
const PROJECTS_DIR = path.join(DATA_DIR, 'projects');

module.exports = {
  ROOT_DIR,
  STATIC_DIR,
  CRITICAL_DIR,
  DATA_DIR,
  PROJECTS_DIR,
};
