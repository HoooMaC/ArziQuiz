import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { getItem, setItem } from "./localMemory.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const useLocalMemory = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const item = getItem(key);
    return (item as T) || initialValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [value]);

  return [value, setValue] as const;
};
