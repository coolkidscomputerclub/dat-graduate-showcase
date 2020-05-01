import path from 'path';

import { pathExistsSync } from 'fs-extra';

import { STATIC_DIR } from '~/utilities/constants';

const OPEN_GRAPH_IMAGE_WIDTH = 1200;
const OPEN_GRAPH_IMAGE_HEIGHT = 530;

export const getOpenGraphImage = slug => {
  const imagePath = `img/${slug}-featured.jpg`;
  const filepath = path.join(STATIC_DIR, imagePath);

  if (!pathExistsSync(filepath)) {
    return null;
  }

  return {
    url: `${process.env.URL}${imagePath}`,
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  };
};
