import easing from './easing';
export interface fromType {
  value: number;
}
export interface toType {
  value: number;
}

export type easingType = 'easeOutCubic' | 'linear' | 'easeOutExpo' | 'easeInOutExpo';
export type formAndToAttributesType = 'value' | unknown;
export type startFunc = (key: number) => number;
export type updateFunc = (key: toType) => void;
export type finishFunc = (key: toType) => void;

export interface AnimationOptions {
  from: fromType;
  to: toType;
  duration?: number;
  delay?: number;
  easing?: easingType;
  onStart?: startFunc;
  onUpdate?: updateFunc;
  onFinish?: finishFunc;
}

export class Tween {
  from: fromType;
  to: toType;
  duration?: number;
  delay?: number;
  easing?: easingType;
  onStart?: startFunc;
  onUpdate?: updateFunc;
  onFinish?: finishFunc;
  startTime?: number;
  started?: boolean;
  finished?: boolean;
  timer?: null | number;
  time?: number;
  elapsed?: number;
  keys?: toType;
  constructor(options: AnimationOptions) {
    const { from, to, duration, delay, easing: easingValue, onStart, onUpdate, onFinish } = options;
    for (const key in from) {
      if (to[key] === undefined) {
        to[key] = from[key];
      }
    }

    for (const key in to) {
      if (from[key] === undefined) {
        from[key] = to[key];
      }
    }

    this.from = from;
    this.to = to;
    this.duration = duration;
    this.delay = delay;
    this.easing = easingValue;
    this.onStart = onStart;
    this.onUpdate = onUpdate;
    this.onFinish = onFinish;
    this.startTime = Date.now() + this.delay;
    this.started = false;
    this.finished = false;
    this.timer = null;
    this.keys = {};
  }

  update(): void {
    this.time = Date.now();
    // delay some time
    if (this.time < this.startTime) {
      return;
    }
    if (this.finished) {
      return;
    }
    // finish animation
    if (this.elapsed === this.duration) {
      if (!this.finished) {
        this.finished = true;
        this.onFinish && this.onFinish(this.keys);
      }
      return;
    }
    // elapsed 时间 和  duration 时间比较 逝去光阴
    this.elapsed = this.time - this.startTime;
    // 防止 时间 一直 流逝 ~
    this.elapsed = this.elapsed > this.duration ? this.duration : this.elapsed;
    // 从0 到 1 elapsed time
    for (const key in this.to) {
      this.keys[key] =
        this.from[key] +
        (this.to[key] - this.from[key]) * easing[this.easing](this.elapsed / this.duration);
    }
    if (!this.started) {
      this.onStart && this.onStart(this.keys);
      this.started = true;
    }
    this.onUpdate(this.keys);
  }

  // 递归 重绘
  start(): void {
    this.startTime = Date.now() + this.delay;
    const tick = () => {
      this.update();
      this.timer = requestAnimationFrame(tick);
      if (this.finished) {
        // 在判断 update中 结束后 停止 重绘
        cancelAnimationFrame(this.timer);
        this.timer = null;
      }
    };
    tick();
  }

  stop(): void {
    cancelAnimationFrame(this.timer);
    this.timer = null;
  }
}
