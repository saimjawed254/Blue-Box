import ShaderWrapper from "@/components/BG/RippleWrapper";
import MenuButton from "@/components/UI/Buttons/MenuButton";
import ProductsSidebar from "@/components/UI/ProductsSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShaderWrapper visible={true} />
      <ProductsSidebar slug={`best-sellers`} />
      {children}
      <MenuButton />
    </>
  );
}
