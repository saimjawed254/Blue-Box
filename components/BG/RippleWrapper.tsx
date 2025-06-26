"use client";

import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const RippleSimulation = dynamic(() => import("@/components/BG/ripple"), {
  ssr: false,
  loading: () => null,
});

type ShaderWrapperProps = {
  visible: boolean;
  owner: "landing" | "home" | "wcu" | "na"; // add more if needed
};

export default function ShaderWrapper({ visible, owner }: ShaderWrapperProps) {
  const currentOwner = useSelector((state: RootState) => state.ui.shaderOwner);

  if (!visible || currentOwner !== owner) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0vh",
        left: "0vw",
        width: "100vw",
        height: "200vh",
        zIndex: 1,
      }}
    >
      <RippleSimulation visible={visible} offset={0.0} />
    </div>
  );
}
