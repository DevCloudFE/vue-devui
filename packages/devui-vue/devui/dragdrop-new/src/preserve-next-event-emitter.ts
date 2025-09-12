import { Subject, Subscription } from 'rxjs';

export class EventEmitter<T = any> extends Subject<T> {
  protected __isAsync: boolean; // tslint:disable-line

  constructor(isAsync: boolean = false) {
    super();
    this.__isAsync = isAsync;
  }

  emit(value?: any) {
    super.next(value);
  }

  subscribe(generatorOrNext?: any, error?: any, complete?: any): Subscription {
    let schedulerFn: (t: any) => any;
    let errorFn = (err: any): any => null;
    let completeFn = (): any => null;

    if (generatorOrNext && typeof generatorOrNext === 'object') {
      schedulerFn = this.__isAsync
        ? (value: any) => {
            setTimeout(() => generatorOrNext.next(value));
          }
        : (value: any) => {
            generatorOrNext.next(value);
          };

      if (generatorOrNext.error) {
        errorFn = this.__isAsync
          ? (err) => {
              setTimeout(() => generatorOrNext.error(err));
            }
          : (err) => {
              generatorOrNext.error(err);
            };
      }

      if (generatorOrNext.complete) {
        errorFn = this.__isAsync
          ? () => {
              setTimeout(() => generatorOrNext.complete());
            }
          : () => {
              generatorOrNext.complete();
            };
      }
    } else {
      schedulerFn = this.__isAsync
        ? (value: any) => {
            setTimeout(() => generatorOrNext(value));
          }
        : (value: any) => {
            generatorOrNext(value);
          };

      if (error) {
        errorFn = this.__isAsync
          ? (err) => {
              setTimeout(() => error(err));
            }
          : (err) => {
              error(err);
            };
      }

      if (complete) {
        completeFn = this.__isAsync
          ? () => {
              setTimeout(() => complete());
            }
          : () => {
              complete();
            };
      }
    }

    const sink = super.subscribe(schedulerFn, errorFn, completeFn);

    if (generatorOrNext instanceof Subscription) {
      generatorOrNext.add(sink);
    }

    return sink;
  }
}

export class PreserveNextEventEmitter<T> extends EventEmitter<T> {
  // 保留注册的 generatorOrNext 构成的函数
  private _schedulerFns: Set<any> | undefined;
  private _isAsync: boolean = false;
  get schedulerFns() {
    return this._schedulerFns;
  }
  forceCallback(value: T, once = false) {
    if (this.schedulerFns && this.schedulerFns.size) {
      this.schedulerFns.forEach((fn) => {
        fn(value);
      });
      if (once) {
        this.cleanCallbackFn();
      }
    }
  }

  cleanCallbackFn() {
    this._schedulerFns = undefined;
  }

  subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
    let schedulerFn: (t: any) => any;

    if (generatorOrNext && typeof generatorOrNext === 'object') {
      schedulerFn = this._isAsync
        ? (value: any) => {
            setTimeout(() => generatorOrNext.next(value));
          }
        : (value: any) => {
            generatorOrNext.next(value);
          };
    } else {
      schedulerFn = this._isAsync
        ? (value: any) => {
            setTimeout(() => generatorOrNext(value));
          }
        : (value: any) => {
            generatorOrNext(value);
          };
    }
    if (!this._schedulerFns) {
      this._schedulerFns = new Set<any>();
    }
    this._schedulerFns.add(schedulerFn);

    return super.subscribe(generatorOrNext, error, complete);
  }
}
