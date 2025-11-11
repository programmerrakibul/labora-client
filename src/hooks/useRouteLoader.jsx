import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const useRouteLoader = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setLoading(true);

    if (pathname !== currentPath) {
      setCurrentPath(pathname);
    } else if (pathname === currentPath) {
      const timerId = setTimeout(() => {
        setLoading(false);
      }, 700);

      return () => clearTimeout(timerId);
    }
  }, [pathname, currentPath]);

  return loading;
};

export default useRouteLoader;
