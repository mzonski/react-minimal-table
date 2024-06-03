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

export const getTypedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;
export const getTypedEntries = Object.entries as <T extends object>(obj: T) => Array<[keyof T, T[keyof T]]>;

function filterNonNullValues<T extends object>(entries: Array<[keyof T, T[keyof T]]>): Array<[keyof T, T[keyof T]]> {
  return entries.filter(([_, value]) => value !== null && value !== undefined);
}

export function convertKeysToSet<T extends object>(obj: T): Set<keyof T> {
  const entries = getTypedEntries(obj);
  const filteredEntries = filterNonNullValues(entries);
  const filteredKeys = filteredEntries.map(([key, _]) => key);
  return new Set(filteredKeys);
}

export function convertValuesToSet<T extends object>(obj: T): Set<T[keyof T]> {
  const values = Object.values(obj) as T[keyof T][];
  const filteredValues = values.filter((value) => value !== null && value !== undefined);
  return new Set(filteredValues);
}

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

export function convertMapToRecord<TKey extends string | number | symbol, TValue>(
  map: Map<TKey, TValue>,
): Record<TKey, TValue> {
  const record: Record<TKey, TValue> = {} as Record<TKey, TValue>;
  map.forEach((value, key) => {
    record[key] = value;
  });
  return record;
}

export function convertRecordToMap<TKey extends string | number | symbol, TValue>(
  record: Record<TKey, TValue>,
): Map<TKey, TValue> {
  const map = new Map<TKey, TValue>();
  Object.entries(record).forEach(([key, value]) => {
    map.set(key as TKey, value as TValue);
  });
  return map;
}

export function convertListToSet<T>(list: T[]): Set<T> {
  return new Set(list);
}

export function removeDuplicates<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const intersection = new Set<T>();
  setA.forEach((item) => {
    if (setB.has(item)) {
      intersection.add(item);
    }
  });
  return intersection;
}

/**
 * Removes all values in setB from setA.
 */
export function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>(setA);
  setB.forEach((value) => {
    result.delete(value);
  });
  return result;
}
