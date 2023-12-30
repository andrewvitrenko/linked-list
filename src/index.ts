import { List } from './list';

const start = () => {
  const list = new List<string>();
  list.add('1');
  list.add('2');
  list.add('3');

  list.insert('4', 0);
  list.insertCol(['5', '6', '7'], 0);
  console.dir(list.toArray());
  list.reverse();

  console.dir(list.toArray());
};

start();
