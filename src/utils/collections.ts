export function first<T>(collection: ArrayLike<T>): T | undefined {
  return collection.length ? collection[0] : undefined;
}

export function last<T>(collection: ArrayLike<T>): T | undefined {
  return collection.length ? collection[collection.length - 1] : undefined;
}
