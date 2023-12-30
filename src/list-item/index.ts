export class ListItem<T> {
  data: T;
  next: ListItem<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}
