function debounceFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...funcArgs: Parameters<T>) => void {
  let timerId: NodeJS.Timeout | null;
  return (...args: Parameters<T>): void => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

export default debounceFunction;
