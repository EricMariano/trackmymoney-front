// Polyfill para localStorage no servidor
if (typeof window === 'undefined') {
  const storageMap = new Map<string, string>();

  (global as any).localStorage = {
    getItem: (key: string) => storageMap.get(key) ?? null,
    setItem: (key: string, value: string) => storageMap.set(key, value),
    removeItem: (key: string) => storageMap.delete(key),
    clear: () => storageMap.clear(),
    get length() {
      return storageMap.size;
    },
    key: (index: number) => {
      const keys = Array.from(storageMap.keys());
      return keys[index] ?? null;
    },
  };
}

export {};

