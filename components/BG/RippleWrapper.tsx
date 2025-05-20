'use client';

import dynamic from "next/dynamic"
import { ReactNode } from "react";
const RippleSimulation = dynamic(() => import('@/components/BG/ripple'), {
  ssr: false,
});

export default function ShaderWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <RippleSimulation />
      {children}
    </>
  );
}