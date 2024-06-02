export const convertListToRecord = <T, K extends string | number | symbol = string>(
  keySelector: (item: T) => K,
  list: T[],
): Record<K, T> => {
  return list.reduce(
    (acc, item) => {
      const key = keySelector(item);
      if (key in acc) {
        throw new Error(`Duplicate key found: ${String(key)}`);
      }
      acc[key] = item;
      return acc;
    },
    {} as Record<K, T>,
  );
};

export const convertRecordToList = <T, K extends string | number | symbol = string>(record: Record<K, T>): T[] => {
  return Object.values(record);
};

export const groupListByKey = <T, K extends string | number | symbol = string>(
  keySelector: (item: T) => K,
  list: T[],
): Record<K, T[]> => {
  return list.reduce(
    (acc, item) => {
      const key = keySelector(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
};

export const flattenArray = <T>(arrays: T[][]): T[] => {
  return arrays.reduce((acc, array) => acc.concat(array), []);
};

export const convertArrayToMap = <T, K>(keySelector: (item: T) => K, list: T[]): Map<K, T> => {
  return list.reduce((acc, item) => {
    const key = keySelector(item);
    if (acc.has(key)) {
      throw new Error(`Duplicate key found: ${key}`);
    }
    acc.set(key, item);
    return acc;
  }, new Map<K, T>());
};

export const convertMapToArray = <K, V>(map: Map<K, V>): V[] => {
  return Array.from(map.values());
};
