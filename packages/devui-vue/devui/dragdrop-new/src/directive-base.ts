import { Subscription } from 'rxjs';
import { EventEmitter } from './preserve-next-event-emitter';

export interface ISimpleChange {
  previousValue: any;
  currentValue: any;
  firstChange: boolean;
}
export class NgSimpleChange {
  constructor(public previousValue: any, public currentValue: any, public firstChange: boolean) {}
  isFirstChange(): boolean {
    return this.firstChange;
  }
}
export type NgSimpleChanges = Record<string, NgSimpleChange>;
export class NgDirectiveBase<
  IInput extends { [prop: string]: any } = { [prop: string]: any },
  IOutput = { [prop: string]: (e: any) => void }
> {
  private __eventListenerMap = new Map<string, Subscription>();
  mounted() {
    if (this.hostBindingMap && this.el.nativeElement) {
      Object.keys(this.hostBindingMap).forEach((key) => {
        if ((this as any)[key] !== undefined) {
          this.hostBinding(this.hostBindingMap![key], key);
        }
      });
    }
    if (this.hostListenerMap && this.el.nativeElement) {
      Object.keys(this.hostListenerMap).forEach((key) => {
        if ((this as any)[key]) {
          this.hostListener(this.hostListenerMap![key], key);
        }
      });
    }
  }
  el: { nativeElement: any } = { nativeElement: null };
  setInput(props: IInput & IOutput & { [props: string]: any }) {
    if (!props) {
      return;
    }
    const changes: Map<string, ISimpleChange> = new Map();
    Object.keys(props).forEach((key) => {
      if (key.startsWith('@')) {
        const outputKey = this.getOutputKey(key.slice(1));
        this.eventListener(outputKey, props[key]);
      } else {
        const inputKey = this.getInputKey(key);
        const previousValue = (this as any)[inputKey];
        (this as any)[inputKey] = props[key];
        changes.set(inputKey, {
          previousValue,
          currentValue: props[key],
          firstChange: true,
        });
      }
    });
    this.notifyOnChanges(changes);
    if (this.hostBindingMap && this.el.nativeElement) {
      Object.keys(this.hostBindingMap).forEach((key) => {
        if (props[key]) {
          this.hostBinding(this.hostBindingMap![key], key);
        }
      });
    }
  }
  updateInput(props: IInput & IOutput, old: IInput & IOutput) {
    const changes: Map<string, ISimpleChange> = new Map();
    props &&
      Object.keys(props).forEach((key) => {
        const inputKey = this.getInputKey(key);
        if (props[key] !== old?.[key]) {
          changes.set(inputKey, {
            previousValue: old[key],
            currentValue: props[key],
            firstChange: old[key] === undefined,
          });
        }
      });
    old &&
      Object.keys(old)
        .filter((key) => !Object.keys(props).includes(key))
        .forEach((key) => {
          if (old[key] !== props?.[key]) {
            const inputKey = this.getInputKey(key);
            changes.set(inputKey, {
              previousValue: old[key],
              currentValue: props[key],
              firstChange: old[key] === undefined,
            });
          }
        });
    changes.forEach((value, key) => {
      if (key.startsWith('@')) {
        this.eventListener(key.slice(1), value['currentValue']);
      } else {
        (this as any)[key] = value['currentValue'];
      }
    });
    this.notifyOnChanges(changes);
    if (this.hostBindingMap && this.el.nativeElement) {
      Object.keys(this.hostBindingMap).forEach((key) => {
        if (changes.get(key)) {
          this.hostBinding(this.hostBindingMap![key], key);
        }
      });
    }
  }
  hostBinding(key: string, valueKey: string) {
    const element = this.el.nativeElement as HTMLElement;
    const value = (this as any)[valueKey];
    element.setAttribute(key, value);
  }

  hostListener(key: string, functionKey: string) {
    const element = this.el.nativeElement as HTMLElement;
    element.addEventListener(key, (this as any)[functionKey].bind(this));
  }
  eventListener(key: string, userFunction: (e: any) => void) {
    const subscription = ((this as any)[key] as EventEmitter).subscribe((e: any) => {
      userFunction(e);
    });
    if (this.__eventListenerMap.get(key)) {
      this.__eventListenerMap.get(key)?.unsubscribe();
      this.__eventListenerMap.delete(key);
    }
    this.__eventListenerMap.set(key, subscription);
  }

  ngOnChanges?(changes: NgSimpleChanges): void;
  hostBindingMap?: { [key: string]: string } = undefined;
  hostListenerMap?: { [key: string]: string } = undefined;
  inputNameMap?: { [key: string]: string } = undefined;
  outputNameMap?: { [key: string]: string } = undefined;

  getInputKey(key: string) {
    return (this.inputNameMap && this.inputNameMap[key]) || key;
  }

  getOutputKey(key: string) {
    return (this.outputNameMap && this.outputNameMap[key]) || key;
  }

  notifyOnChanges(changes: Map<string, ISimpleChange>) {
    if (this.ngOnChanges) {
      const simpleChanges = [...changes.entries()]
        .filter(([key, value]) => !key.startsWith('@'))
        .reduce((obj: NgSimpleChanges, [key, value]) => {
          const { previousValue, currentValue, firstChange } = value;
          obj[key] = new NgSimpleChange(previousValue, currentValue, firstChange);
          return obj;
        }, {});
      if (Object.keys(simpleChanges).length) {
        this.ngOnChanges(simpleChanges);
      }
    }
  }
}
