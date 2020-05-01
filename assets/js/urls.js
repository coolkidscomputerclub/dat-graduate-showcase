const URL = process.env.URL;

export const indexUrl = (absolute = false, baseUrl = URL) =>
  absolute ? `${baseUrl}` : `/`;

export const studentsUrl = (absolute = false, baseUrl = URL) =>
  absolute ? `${baseUrl}students/` : `/students/`;

export const projectUrlFromSlug = (slug, absolute = false, baseUrl = URL) =>
  absolute ? `${baseUrl}projects/${slug}/` : `/projects/${slug}/`;

export const INDEX_PATH_REGEXP = /^\/$/;
export const STUDENTS_PATH_REGEXP = /^\/students\/?$/;
export const PROJECT_PATH_REGEXP = /^\/projects\/[\w-]+\/?$/;
