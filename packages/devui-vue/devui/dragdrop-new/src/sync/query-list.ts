import { Observable } from 'rxjs';
import { EventEmitter } from '../preserve-next-event-emitter';

/**
 * Flattens an array.
 */
export function flatten(list: any[], dst?: any[]): any[] {
  if (dst === undefined) dst = list;
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    if (Array.isArray(item)) {
      // we need to inline it.
      if (dst === list) {
        // Our assumption that the list was already flat was wrong and
        // we need to clone flat since we need to write to it.
        dst = list.slice(0, i);
      }
      flatten(item, dst);
    } else if (dst !== list) {
      dst.push(item);
    }
  }
  return dst;
}

function symbolIterator<T>(this: QueryList<T>): Iterator<T> {
  return ((this as any as { _results: Array<T> })._results as any)[Symbol.iterator]();
}

export class QueryList<T> implements Iterable<T> {
  public readonly dirty = true;
  private _results: Array<T> = [];
  public readonly changes: Observable<any> = new EventEmitter();

  readonly length: number = 0;
  readonly first!: T;
  readonly last!: T;

  constructor() {
    const symbol = Symbol.iterator;
    const proto = QueryList.prototype as any;
    if (!proto[symbol]) proto[symbol] = symbolIterator;
  }

  // proxy array method to property '_results'
  map<U>(fn: (item: T, index: number, array: T[]) => U): U[] {
    return this._results.map(fn);
  }
  filter(fn: (item: T, index: number, array: T[]) => boolean): T[] {
    return this._results.filter(fn);
  }
  find(fn: (item: T, index: number, array: T[]) => boolean): T | undefined {
    return this._results.find(fn);
  }
  reduce<U>(fn: (prevValue: U, curValue: T, curIndex: number, array: T[]) => U, init: U): U {
    return this._results.reduce(fn, init);
  }
  forEach(fn: (item: T, index: number, array: T[]) => void): void {
    this._results.forEach(fn);
  }
  some(fn: (value: T, index: number, array: T[]) => boolean): boolean {
    return this._results.some(fn);
  }

  /**
   * Returns a copy of the internal results list as an Array.
   */
  toArray(): T[] {
    return this._results.slice();
  }

  toString(): string {
    return this._results.toString();
  }

  /**
   * Updates the stored data of the query list, and resets the `dirty` flag to `false`, so that
   * on change detection, it will not notify of changes to the queries, unless a new change
   * occurs.
   *
   * @param resultsTree The query results to store
   */
  reset(resultsTree: Array<T | any[]>): void {
    this._results = flatten(resultsTree);
    (this as { dirty: boolean }).dirty = false;
    (this as { length: number }).length = this._results.length;
    (this as { last: T }).last = this._results[this.length - 1];
    (this as { first: T }).first = this._results[0];
  }

  /**
   * Triggers a change event by emitting on the `changes` {@link EventEmitter}.
   */
  notifyOnChanges(): void {
    (this.changes as EventEmitter<any>).emit(this);
  }

  /** internal */
  setDirty() {
    (this as { dirty: boolean }).dirty = true;
  }

  /** internal */
  destroy(): void {
    (this.changes as EventEmitter<any>).complete();
    (this.changes as EventEmitter<any>).unsubscribe();
  }

  // The implementation of `Symbol.iterator` should be declared here, but this would cause
  // tree-shaking issues with `QueryList. So instead, it's added in the constructor (see comments
  // there) and this declaration is left here to ensure that TypeScript considers QueryList to
  // implement the Iterable interface. This is required for template type-checking of NgFor loops
  // over QueryLists to work correctly, since QueryList must be assignable to NgIterable.
  [Symbol.iterator]!: () => Iterator<T>;
}
