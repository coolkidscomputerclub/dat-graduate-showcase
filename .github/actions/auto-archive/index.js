const path = require('path');

const core = require('@actions/core');
const axios = require('axios');
const { readJson, pathExists, readFile, writeJson } = require('fs-extra');
const DOMParser = require('xmldom').DOMParser;

const INTERNET_ARCHIVE_API_URL = 'https://dawn-rain-4cff.bkardell.workers.dev/';

(async () => {
  try {
    const dryRun = core.getInput('dry_run') === 'true';

    const manifestFilepath = path.join(
      process.cwd(),
      core.getInput('manifest', { required: true }),
    );

    let manifest = {};

    if (await pathExists(manifestFilepath)) {
      core.info('Reading manifest file');

      manifest = await readJson(manifestFilepath);
    } else {
      core.info('No manifest file found');
    }

    const { lastRan = 0 } = manifest;

    const sitemapFilepath = path.join(
      process.cwd(),
      core.getInput('sitemap', { required: true }),
    );

    if (!(await pathExists(sitemapFilepath))) {
      core.setFailed(`Sitemap not found: ${sitemapFilepath}`);

      return;
    }

    core.info('Reading sitemap file');

    const sitemap = await readFile(sitemapFilepath, 'utf8');

    core.info('Parsing content info from sitemap XML');

    const urls = Array.from(
      new DOMParser().parseFromString(sitemap).getElementsByTagName('url'),
    ).map(urlNode => {
      const [loc] = Array.from(urlNode.getElementsByTagName('loc'));
      const [lastmod] = Array.from(urlNode.getElementsByTagName('lastmod'));

      return {
        url: loc.textContent,
        lastModified: lastmod.textContent,
      };
    });

    const freshUrls = urls.filter(({ lastModified }) => {
      return new Date(lastModified) > new Date(lastRan);
    });

    if (freshUrls.length === 0) {
      core.info('No URLs to snapshot, exiting...');

      return;
    }

    await Promise.all(
      freshUrls.map(({ url }) => {
        core.info(
          `Sending \`snapshotURL\` request to Internet Archive API: ${url}`,
        );

        if (dryRun) {
          return Promise.resolve();
        }

        return axios.post(INTERNET_ARCHIVE_API_URL, { snapshotURL: url });
      }),
    );

    manifest.lastRan = Date.now();

    core.info(`Writing \`lastRan\` to manifest file: ${manifestFilepath}`);

    if (dryRun) {
      return;
    }

    await writeJson(manifestFilepath, manifest);
  } catch (error) {
    core.setFailed(`Action failed: ${error}`);
  }
})();
