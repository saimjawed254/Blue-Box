import GradientBG from "@/components/BG/Background";
import ShaderWrapper from "@/components/BG/RippleWrapper";
import MenuButton from "@/components/UI/Buttons/MenuButton";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ShaderWrapper>
      <div>
        <GradientBG />
        {children}
        <MenuButton/>
      </div>
    </ShaderWrapper>
  );
}
