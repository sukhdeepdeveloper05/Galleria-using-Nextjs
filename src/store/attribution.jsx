"use client";

import { createContext, useState } from "react";

export const AttributionCtx = createContext({
  isAttributionShown: false,
  setIsAttributionShown: () => {},
  attributionData: {},
  setAttributionData: () => {},
});

export function AttributionCtxProvider({ children }) {
  const [isAttributionShown, setIsAttributionShown] = useState(false);
  const [attributionData, setAttributionData] = useState({});

  const ctxValue = {
    isAttributionShown,
    setIsAttributionShown,
    attributionData,
    setAttributionData,
  };

  return (
    <AttributionCtx.Provider value={ctxValue}>
      {children}
    </AttributionCtx.Provider>
  );
}
