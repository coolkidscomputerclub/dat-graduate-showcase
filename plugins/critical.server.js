import path from 'path';

import { readFile } from 'fs-extra';

export default async ({ app: { head } }) => {
  const criticalJs = await readFile(
    path.join(process.cwd(), 'critical/critical.min.js'),
    'utf8',
  );

  head.__dangerouslyDisableSanitizersByTagID = {
    ...head.__dangerouslyDisableSanitizersByTagID,

    'critical-js': ['innerHTML'],
  };

  head.script.push({
    hid: 'critical-js',
    innerHTML: criticalJs,
    once: true,
  });
};
