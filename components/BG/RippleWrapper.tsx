"use client";

import dynamic from "next/dynamic";
import { ReactNode, useState } from "react";
const RippleSimulation = dynamic(() => import("@/components/BG/ripple"), {
  ssr: false,
});

export default function ShaderWrapper({ children }: { children: ReactNode }) {

  // const [offset,setOffset] = useState(0)
  //     const onMouseMove = (e : any) => {
  //     const x = e.clientX / window.innerWidth;
  //     const y = (1.0 - e.clientY / window.innerHeight);
      
  //     const scrollY=window.scrollY;
  //     if (window.scrollY>window.innerHeight){
  //       setOffset(offset+((window.innerHeight)/100))
  //       console.log(offset)
  //     }
  //     console.log(scrollY)
  //   };

  //   window.addEventListener("scroll", onMouseMove);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0vh",
          width: "100vw",
          height: "200vh",
          zIndex: 1,
        }}
      >
        <RippleSimulation offset={0.0}/>
      </div>
      {/* <div
        style={{
          position: "absolute",
          top: "950vh",
          width: "100vw",
          height: "50vh",
          overflow: "hidden",
        }}
      >
        <RippleSimulation offset={4.75} />
      </div> */}
      {/* <div
        style={{
          position: "absolute",
          top: "400vh",
          width: "100vw",
          height: "185vh",
          overflow: "hidden"
        }}
      >
        <RippleSimulation offset={2.0} />
      </div>
       */}
      {children}
    </>
  );
}
