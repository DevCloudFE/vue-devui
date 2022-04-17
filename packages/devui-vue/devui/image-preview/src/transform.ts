interface Options {
  transformX?: number;
  transformY?: number;
  zoom?: number;
  rotate?: number;
}
interface HTMLElementPlus extends HTMLElement {
  onmousewheel?: (...args: unknown[]) => void;
}

export default class Transform {
  private el: HTMLElementPlus;

  private oTransformX = 0;
  private oTransformY = 0;
  private transformX: number;
  private transformY: number;
  private zoom: number;
  private rotate: number;

  private STEP = 0.25;
  private MIN_SCALE = 0.2;
  private MAX_SCALE = 2.5;
  private TRANSFORMX = 0;
  private TRANSFORMY = 0;
  private ZOOM = 1;
  private ROTATE = 0;

  constructor(el: HTMLElementPlus, options: Options = {}) {
    this.el = el;
    this.transformX = options.transformX || this.TRANSFORMX;
    this.transformY = options.transformY || this.TRANSFORMY;
    this.zoom = options.zoom || this.ZOOM;
    this.rotate = options.rotate || this.ROTATE;

    this.handleDefaultDraggable();
    this.onDraggable();
    this.onMouseWheel();
  }
  handleDefaultDraggable(): void {
    document.body.ondragstart = () => {
      window.event.returnValue = false;
      return false;
    };
  }
  onDraggable(): void {
    this.el.onmousedown = (e: MouseEvent) => {
      const ox = e.clientX;
      const oy = e.clientY;
      document.onmousemove = (e1: MouseEvent) => {
        const disX = e1.clientX - ox;
        const disY = e1.clientY - oy;
        this.transformX = this.oTransformX + disX;
        this.transformY = this.oTransformY + disY;
        this.el.style.cursor = 'grabbing';
        this.setPosition();
      };
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      this.oTransformX = this.transformX;
      this.oTransformY = this.transformY;
      this.el.style.cursor = 'grab';
    };
  }
  onMouseWheel(): void {
    const handleWheel = this.throttle(this.setMouseWheel, 100);
    this.el.onmousewheel = (e) => {
      const value: number = -e.wheelDelta || e.deltaY || e.detail;
      handleWheel(value);
    };
  }
  throttle(fn: (...args: unknown[]) => void, t: number): void {
    let timer = null;
    return (...args) => {
      if (!timer) {
        setTimeout(() => {
          timer = null;
          fn.apply(this, args);
        }, t);
      }
    };
  }
  setMouseWheel(value: number): void {
    if (value < 0) {
      if (this.zoom >= this.MAX_SCALE) {
        this.el.style.cursor = 'not-allowed';
        return;
      }
      this.el.style.cursor = 'zoom-in';
      this.setZoomIn(this.STEP);
    } else {
      if (this.zoom <= this.MIN_SCALE) {
        this.el.style.cursor = 'not-allowed';
        return;
      }
      this.el.style.cursor = 'zoom-out';
      this.setZoomOut(this.STEP);
    }
    this.setPosition();
  }
  setZoomIn(step = this.STEP): void {
    this.zoom = Math.min(this.MAX_SCALE, this.zoom + step);
    this.setPosition();
  }
  setZoomOut(step = this.STEP): void {
    this.zoom = Math.max(this.MIN_SCALE, this.zoom - step);
    this.setPosition();
  }
  setZoomBest(): void {
    this.reset();
    this.setPosition();
  }
  setZoomOriginal(): void {
    this.reset();
    this.setPosition();
  }
  setRotate(): void {
    this.rotate += 0.25;
    this.setPosition();
  }
  reset(): void {
    this.transformX = this.TRANSFORMX;
    this.transformY = this.TRANSFORMY;
    this.zoom = this.ZOOM;
  }
  setPosition(): void {
    this.el.style.transform = `translate(${this.transformX}px, ${this.transformY}px) scale(${this.zoom}) rotate(${this.rotate}turn)`;
  }
}
