"use client";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressBarProvider({ children }) {
  return (
    <>
      <ProgressBar color="#f11946" options={{ showSpinner: false }} shallowRouting />
      {children}
    </>
  );
}
