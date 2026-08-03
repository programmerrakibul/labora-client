import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./use-debounce";

export const useDebouncedSearch = (onDebouncedChange, delay = 500) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, delay);
  const onChangeRef = useRef(onDebouncedChange);

  useEffect(() => {
    onChangeRef.current = onDebouncedChange;
  });

  useEffect(() => {
    onChangeRef.current?.(debouncedSearch);
  }, [debouncedSearch]);

  return { search, setSearch, debouncedSearch };
};
