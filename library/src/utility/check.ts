// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFalsyValue(value: any) {
  if (value === false) return false;
  if (value === null) return false;
  if (value === 0) return false;
  if (value === '') return false;
  if (value === undefined) return false;
  if (value.isNaN) return false;

  return true;
}
