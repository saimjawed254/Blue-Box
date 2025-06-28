"use client";

import ShaderWrapper from "@/components/BG/RippleWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      {/* <div>
        {shaderOwner === "landing" && (
          <ShaderWrapper visible={shadersVisible} owner="landing" />
        )}
      </div> */}
      {/* <Cursor /> */}
      {/* <GradientBG /> */}
      {children}
      {/* <MenuButton /> */}
    </>
  );
}
