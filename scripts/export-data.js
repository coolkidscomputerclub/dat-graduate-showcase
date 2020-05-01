const path = require('path');

const { writeJson, ensureDir } = require('fs-extra');

const { DATA_DIR, PROJECTS_DIR } = require('../utilities/constants');
const entries = require('../entries.json');

(async () => {
  await ensureDir(DATA_DIR);
  await ensureDir(PROJECTS_DIR);

  const projects = entries.map(({ project }) => project);

  await Promise.all([
    writeJson(
      path.join(PROJECTS_DIR, 'validation.json'),
      projects.map(({ slug }) => slug),
    ),

    writeJson(
      path.join(DATA_DIR, 'index.json'),
      entries.map(({ project, student }) => ({
        projectSlug: project.slug,
        projectTitle: project.title,
        studentSlug: student.slug,
        studentName: student.name,
        frameCount: student.frames,
      })),
    ),

    ...entries.map(entry =>
      writeJson(path.join(PROJECTS_DIR, `${entry.project.slug}.json`), entry),
    ),
  ]);
})();
