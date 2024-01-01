import { beforeEach, describe, expect, it } from '@jest/globals';

import { List } from '../src/list';

describe('Linked list', () => {
  let linkedList: List<string>;

  beforeEach(() => {
    linkedList = new List<string>();
  });

  it('should init properly', () => {
    expect(linkedList.length()).toBe(0);
  });

  it('should add item', () => {
    // Test adding to an empty list
    linkedList.add('1');
    // Test adding to the existing list
    linkedList.add('2');

    expect(linkedList.length()).toBe(2);
    expect(linkedList.get(0)).toBe('1');
    expect(linkedList.get(1)).toBe('2');
  });

  it('should insert element', () => {
    linkedList.add('1');
    linkedList.add('2');

    // Test inserting in the middle of list
    linkedList.insert('3', 1);
    expect(linkedList.length()).toBe(3);
    expect(linkedList.get(1)).toBe('3');
    expect(linkedList.get(2)).toBe('2');

    // Test inserting in the end of list
    linkedList.insert('4', 3);
    expect(linkedList.length()).toBe(4);
    expect(linkedList.get(3)).toBe('4');

    // Test inserting on 0 position
    linkedList.insert('5', 0);
    expect(linkedList.length()).toBe(5);
    expect(linkedList.get(0)).toBe('5');
    expect(linkedList.get(1)).toBe('1');

    // Test insert on 0 pos in empty list
    const newLL = new List<string>();
    newLL.insert('1', 0);
    newLL.add('2');
    expect(newLL.length()).toBe(2);
    expect(newLL.get(0)).toBe('1');
    expect(newLL.get(1)).toBe('2');
  });

  it('should find index of the element', () => {
    linkedList.add('1');
    linkedList.add('2');
    linkedList.add('3');

    // Test for element in the list
    expect(linkedList.indexOf('1')).toBe(0);
    // Test for element that is not in the list
    expect(linkedList.indexOf('4')).toBe(-1);
  });

  it('should check if list contains element', () => {
    linkedList.add('1');
    linkedList.add('2');
    linkedList.add('3');

    expect(linkedList.contains('1')).toBeTruthy();
    expect(linkedList.contains('4')).toBeFalsy();
  });

  it('should add collection to list', () => {
    const collection = ['1', '2', '3'];

    linkedList.addCol(collection);

    expect(linkedList.length()).toBe(3);
    expect(linkedList.get(0)).toBe(collection[0]);
    expect(linkedList.get(1)).toBe(collection[1]);
    expect(linkedList.get(2)).toBe(collection[2]);
  });

  it('should insert collection', () => {
    linkedList.add('1');
    linkedList.add('2');
    linkedList.add('3');

    const collection = ['4', '5', '6'];

    linkedList.insertCol(collection, 1);

    expect(linkedList.length()).toBe(6);
    expect(linkedList.get(0)).toBe('1');
    expect(linkedList.get(1)).toBe(collection[0]);
    expect(linkedList.get(2)).toBe(collection[1]);
    expect(linkedList.get(3)).toBe(collection[2]);
    expect(linkedList.get(4)).toBe('2');
    expect(linkedList.get(5)).toBe('3');

    const collection2 = ['7', '8'];

    linkedList.insertCol(collection2, 6);
    expect(linkedList.length()).toBe(8);
    expect(linkedList.get(6)).toBe(collection2[0]);
    expect(linkedList.get(7)).toBe(collection2[1]);
  });

  it('should set value properly', () => {
    linkedList.add('1');
    linkedList.add('2');
    linkedList.add('3');

    linkedList.set('4', 0);
    linkedList.set('5', 2);

    expect(linkedList.get(0)).toBe('4');
    expect(linkedList.get(2)).toBe('5');
  });

  it('should parse list to the array', () => {
    linkedList.add('1');
    linkedList.add('2');
    linkedList.add('3');

    const result = linkedList.toArray();

    expect(result).toEqual(['1', '2', '3']);
  });

  it('should check index', () => {
    // Test strict check
    expect(() => linkedList.get(0)).toThrowError('Index out of bounds');

    // Test not strict check
    expect(() => linkedList.insert('2', -1)).toThrowError(
      'Index out of bounds',
    );
  });

  it('should reverse list', () => {
    linkedList.reverse();

    // Test for empty list
    expect(linkedList.toArray()).toEqual([]);

    linkedList.add('1');
    linkedList.add('2');
    linkedList.add('3');

    linkedList.reverse();

    // Test for list with elements
    expect(linkedList.toArray()).toEqual(['3', '2', '1']);
  });

  it('should remove element', () => {
    linkedList.addCol(['1', '2', '3', '4', '5', '6', '7']);

    const removedHead = linkedList.remove(0);

    expect(removedHead).toBe('1');
    expect(linkedList.length()).toBe(6);
    expect(linkedList.get(0)).toBe('2');

    const removedBody = linkedList.remove(2);

    expect(linkedList.length()).toBe(5);
    expect(removedBody).toBe('4');
    expect(linkedList.get(2)).toBe('5');

    const removedTail = linkedList.remove(4);

    expect(removedTail).toBe('7');
    expect(linkedList.length()).toBe(4);
    expect(linkedList.get(3)).toBe('6');
  });
});
