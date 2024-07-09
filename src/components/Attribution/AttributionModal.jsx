"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function Modal({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    isMounted &&
    createPortal(
      <>
        <div className="fixed bottom-0 left-0 right-0 shadow-[0_8px_16px_#00000026] z-50 pointer-events-none flex items-center justify-center">
          {children}
        </div>
      </>,
      document.getElementById("attribution-modal")
    )
  );
}
