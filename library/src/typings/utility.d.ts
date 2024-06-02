/* eslint-disable @typescript-eslint/no-explicit-any */
type IsUnion<T, B = T> = T extends any ? ([B] extends [T] ? false : true) : never;
type EnsureUnion<T> = IsUnion<T> extends true ? T : never;

export type Autocomplete<T extends EnsureUnion<T>> = string & T;
