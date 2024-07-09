"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ImageModal({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  function closeModal(e) {
    if (e.key === "Escape") {
      router.back();
    }
  }

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeModal);

    return () => {
      setIsMounted(false);
      document.body.style.overflow = "visible";
      window.removeEventListener("keydown", closeModal);
    };
  }, []);

  return (
    isMounted &&
    createPortal(
      <>
        <div
          className="fixed inset-0 z-20 cursor-zoom-out overflow-auto bg-[#000000bf]"
          onClick={() => router.back()}
        >
          <dialog
            className="bg-white absolute top-4 w-11/12 mx-auto rounded border-none shadow-[0_8px_16px_#00000026] cursor-auto z-50"
            open
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </dialog>
        </div>
      </>,
      document.getElementById("selected-image-modal")
    )
  );
}
