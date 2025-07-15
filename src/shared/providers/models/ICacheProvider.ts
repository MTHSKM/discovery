export interface ICacheProvider {
  set(key: string, value: unknown): Promise<void>;
  get<T>(key: string): Promise<T>;
  deleteManyBySulfix(sulfix: string): Promise<void>;
}
