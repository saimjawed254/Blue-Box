"use client";

import GradientBG from "@/components/BG/Background";
import Cursor from "@/components/BG/cursor";
import ShaderWrapper from "@/components/BG/RippleWrapper";
import MenuButton from "@/components/UI/Buttons/MenuButton";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Layout({ children }: { children: React.ReactNode }) {
  const shadersVisible = useSelector(
    (state: RootState) => state.ui.shadersVisible
  );

  return (
    <>
      {/* <Cursor /> */}
      {/* {shadersVisible && <ShaderWrapper visible={shadersVisible} />} */}
      {/* <GradientBG /> */}
      {children}
      {/* <MenuButton /> */}
    </>
  );
}
