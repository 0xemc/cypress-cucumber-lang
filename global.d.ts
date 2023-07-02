export {};
declare global {
  type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

  type PrimitiveKey = string | number | symbol;

  type Predicate<T> = (x: T) => boolean;

  type Nullable<T> = T | null | undefined;

  type ValueOf<T> = T[keyof T];
}
