export function arrayRemoveFirst<T>(array: T[], item: T): T[] {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

export function arrayRemoveAll<T>(array: T[], item: T): T[] {
  let i = 0;
  while (i < array.length) {
    if (array[i] === item) {
      array.splice(i, 1);
    } else {
      i += 1;
    }
  }

  return array;
}

export function removeArrayDuplicates<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
