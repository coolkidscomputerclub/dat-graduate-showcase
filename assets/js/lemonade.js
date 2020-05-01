import { prefix } from 'inline-style-prefixer';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';
const LAYOUTS = [HORIZONTAL, VERTICAL];

const FORWARDS = 'forwards';
const BACKWARDS = 'backwards';
const DIRECTIONS = [FORWARDS, BACKWARDS];

const DEFAULT_OPTIONS = {
  layout: HORIZONTAL, // can be either horizontal or vertical
  frameCount: undefined, // will be set dynamically if not defined
  direction: FORWARDS, // forwards or backwards
  frameRate: undefined, // `undefined` will run on requestAnimationFrame
  startFrame: 1, // any number less than frameCount
  frameWidth: undefined, // will be set dynamically if undefined
  frameHeight: undefined, // will be set dynamically if undefined
  imageWidth: undefined, // will be set dynamically if undefined
  imageHeight: undefined, // will be set dynamically if undefined
  repeat: true, // can be true, or a number
  waitForImage: true, // wait for image to load before starting
  padding: '0 0 0 0',
};

export default class Lemonade {
  constructor(el, options) {
    this.el = el;

    const dataOptions = this.el.dataset;

    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
      ...dataOptions,
    };

    if (!DIRECTIONS.some(direction => this.options.direction !== direction)) {
      throw new Error(`Invalid \`direction\`: ${this.options.direction}`);
    }

    if (!LAYOUTS.some(layout => this.options.layout !== layout)) {
      throw new Error(`Invalid \`layout\`: ${this.options.layout}`);
    }

    if (typeof this.options.frameWidth === 'undefined') {
      this.frameWidth = this.el.getBoundingClientRect().width;
    }

    if (typeof this.options.frameHeight === 'undefined') {
      this.frameHeight = this.el.getBoundingClientRect().height;
    }

    return this;
  }

  async init() {
    this.currentFrame = this.options.startFrame;

    if (this.currentFrame > 0) {
      this.updateFrame();
    }

    if (this.options.waitForImage === true) {
      await this.loadImage();
    }

    return this;
  }

  loadImage() {
    return new Promise(resolve => {
      this.el.addEventListener('lazyloaded', resolve);
    });
  }

  start() {
    if (this.state !== 'playing') {
      this.state = 'playing';

      this.startStepping();

      // start event
    }

    return this;
  }

  stop() {
    if (this.state !== 'stopped') {
      this.state = 'stopped';

      this.cancelNextFrame();

      // stop event
    }

    return this;
  }

  reset(frame) {
    if (typeof frame !== 'undefined') {
      this.goToFrame(frame);
    } else if (this.options.direction === FORWARDS) {
      this.goToFrame(this.options.startFrame);
    } else {
      this.goToFrame(this.options.frameCount);
    }

    // reset event

    return this;
  }

  end() {
    this.state = 'stopped';

    this.cancelNextFrame();

    // stop event
  }

  goToFrame(frame) {
    if (this.state === 'playing') {
      this.delayNextFrame();
    }

    this.currentFrame = frame;

    this.updateFrame();

    return this;
  }

  startStepping() {
    if (typeof this.time === 'undefined') {
      this.time = Date.now();
    }

    this.frameRequest = requestAnimationFrame(() => this.step());

    return this;
  }

  step() {
    var time, delta;

    this.frameRequest = requestAnimationFrame(() => this.step());

    if (typeof this.options.frameRate !== 'undefined') {
      time = Date.now();
      delta = time - this.time;

      if (delta >= 1000 / this.options.frameRate) {
        this.time = time;
      } else {
        return this;
      }
    }

    // frame event

    if (
      this.options.direction === FORWARDS &&
      this.currentFrame < this.options.frameCount
    ) {
      this.currentFrame++;

      this.updateFrame();
    } else if (this.options.direction === BACKWARDS && this.currentFrame > 1) {
      this.currentFrame--;

      this.updateFrame();
    } else if (this.options.repeat === true) {
      this.reset();

      // repeat event
    } else {
      this.end();
    }

    return this;
  }

  cancelNextFrame() {
    cancelAnimationFrame(this.frameRequest);

    return this;
  }

  delayNextFrame() {
    cancelAnimationFrame(this.frameRequest);

    this.startStepping();

    return this;
  }

  updateFrame() {
    const { layout } = this.options;
    let styles = {};

    if (layout === HORIZONTAL) {
      const translateX = `${(this.currentFrame - 1) *
        this.options.frameWidth *
        -1}px`;

      styles = prefix({
        transform: `translateX(${translateX})`,
      });
    } else {
      const translateY = `${(this.currentFrame - 1) *
        this.options.frameHeight *
        -1}px`;

      styles = prefix({
        transform: `translateY(${translateY})`,
      });
    }

    Object.entries(styles).forEach(([name, value]) => {
      this.el.style[name] = value;
    });
  }

  destroy() {
    this.stop();

    return this;
  }
}
