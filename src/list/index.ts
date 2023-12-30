import { ListItem } from '../list-item';

export type MapFunc<T> = (elem: T, index: number) => boolean;

export class List<T> {
  head: ListItem<T> | null;
  tail: ListItem<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  length(): number {
    return this.size;
  }

  add(data: T) {
    const item = new ListItem(data);

    /**
     * If the element is first to add - set it as head
     * and make if reference to end of list
     * */
    if (!this.head || !this.tail) {
      this.head = item;
      this.tail = item;

      this.size++;
      return;
    }

    /**
     * Set new item as next to tail and make it a tail of list
     * */
    this.tail.next = item;
    this.tail = item;
    this.size++;
  }

  insert(data: T, index: number) {
    this.checkIndex(index);

    /**
     * When inserting to 0 position
     * we need to redefine head
     * */
    if (index === 0) {
      const item = new ListItem(data);
      item.next = this.head;
      this.head = item;

      this.size++;
      return;
    }

    /**
     * Setting to `size` index or to empty list means simple adding element
     * */
    if (index === this.size) {
      this.add(data);
      return;
    }

    let i = 0;
    let current = this.head!;
    /**
     * Iterating to `index - 1` pos to stop before
     * element on position `index` and make this element `next`
     * */
    while (i < index - 1) {
      /**
       * Iterating through list
       * */
      current = current.next!;
      i++;
    }

    const item = new ListItem(data);
    /**
     * Setting `next` to new item
     * Inserting new item
     * */
    item.next = current.next;
    current.next = item;
    this.size++;
  }

  get(index: number): T {
    this.checkIndex(index, true);

    let i = 0;
    let current = this.head!;

    /**
     * Iterate to `index`
     * */
    while (i < index) {
      current = current.next!;
      i++;
    }

    return current.data;
  }

  remove(index: number): T {
    this.checkIndex(index, true);

    /**
     * If the index is zero - remove first element of list
     * and set new head
     * */
    if (index === 0) {
      const item = this.head!;

      this.head = item.next;

      this.size--;
      return item.data;
    }

    let i = 0;
    let current = this.head!;

    /**
     * Iterate to `index - 1` because we need
     * access to prev element. In double linked list it will be fixed
     * */
    while (i < index - 1) {
      current = current.next!;
      i++;
    }

    const item = current.next!;

    /**
     * If removing last element - update tail
     * */
    if (item === this.tail) {
      this.tail = current;
    }

    current.next = item.next;

    this.size--;
    return item.data;
  }

  indexOf(item: T): number {
    let index = 0;
    let current = this.head;

    while (current) {
      if (current.data === item) return index;

      current = current.next;
      index++;
    }

    return -1;
  }

  contains(item: T): boolean {
    let current = this.head;

    while (current) {
      if (current.data === item) {
        return true;
      }

      current = current.next;
    }

    return false;
  }

  addCol(data: T[]) {
    for (const elem of data) {
      this.add(elem);
    }
  }

  insertCol(data: T[], index: number) {
    this.checkIndex(index);

    if (index === this.size) {
      this.addCol(data);
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const elem = data[i];
      this.insert(elem, index + i);
    }
  }

  set(data: T, index: number) {
    this.checkIndex(index, true);

    let i = 0;
    let current = this.head!;

    while (i < index) {
      current = current.next!;
      i++;
    }

    current.data = data;
  }

  reverse() {
    if (this.size < 2) {
      return;
    }

    /**
     * Start with second element in the list
     * */
    let prev = this.head!;
    let current = this.head?.next;

    /**
     * Iterate all elements except head and tail
     * */
    while (current) {
      const next = current.next;

      /**
       * Change the `next` ref
       * we make current element look for `prev`
       * we don't touch `prev` so it creates conflict of circular relations
       * it is resolved by starting with second element and changing refs of head and tail
       * */
      current.next = prev;

      prev = current;
      current = next;
    }

    /**
     * Replace head and tail
     * */
    const temp = this.tail;
    this.head!.next = null;
    this.tail = this.head;
    this.head = temp;
  }

  toArray(): T[] {
    const result: T[] = [];

    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  private checkIndex(index: number, strict = false) {
    if (strict) {
      if (index < 0 || index >= this.size) {
        throw new Error(
          `Index out of bounds index: ${index}, size: ${this.size}`,
        );
      }
    } else {
      if (index < 0 || index > this.size) {
        throw new Error(
          `Index out of bounds index: ${index}, size: ${this.size}`,
        );
      }
    }
  }
}
