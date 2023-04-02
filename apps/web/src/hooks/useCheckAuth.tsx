import { useEffect, useState } from "react";

export default function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("u") || localStorage.getItem("u") === null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated };
}
