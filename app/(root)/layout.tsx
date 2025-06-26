"use client";

import GradientBG from "@/components/BG/Background";
import Cursor from "@/components/BG/cursor";
import ShaderWrapper from "@/components/BG/RippleWrapper";
import MenuButton from "@/components/UI/Buttons/MenuButton";
import { RootState } from "@/store";
import { setShaderOwner } from "@/store/slices/uiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Layout({ children }: { children: React.ReactNode }) {
  const shadersVisible = useSelector(
    (state: RootState) => state.ui.shadersVisible
  );
  const shaderOwner = useSelector((state: RootState) => state.ui.shaderOwner);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShaderOwner("landing"));
  }, [dispatch]);

  return (
    <>
      <div>
        {shaderOwner === "landing" && (
          <ShaderWrapper visible={shadersVisible} owner="landing" />
        )}
      </div>
      {/* <Cursor /> */}
      {/* <GradientBG /> */}
      {children}
      {/* <MenuButton /> */}
    </>
  );
}
