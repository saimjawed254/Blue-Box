'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RippleSimulation() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const simRes = 1024;
    const width = window.innerWidth;
    const height = window.innerHeight * 2.0;
    const offset=0.0;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const rtA = new THREE.WebGLRenderTarget(simRes, simRes, {
      type: THREE.FloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
    });
    const rtB = rtA.clone();
    let currentRT = rtA;
    let nextRT = rtB;

    const simUniforms = {
      iChannel0: { value: null },
      iResolution: { value: new THREE.Vector3(simRes, simRes, 1) },
      iTime: { value: 0 },
      iFrame: { value: 0 },
      iMouse: { value: new THREE.Vector4() },
    };

    const bufferAShader = `
      uniform sampler2D iChannel0;
      uniform vec3 iResolution;
      uniform float iTime;
      uniform int iFrame;
      uniform vec4 iMouse;

      const float delta = 1.0;

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        if (iFrame == 0) { fragColor = vec4(0.0); return; }

        float pressure = texelFetch(iChannel0, ivec2(fragCoord), 0).x;
        float pVel = texelFetch(iChannel0, ivec2(fragCoord), 0).y;

        float pR = texelFetch(iChannel0, ivec2(fragCoord) + ivec2(1, 0), 0).x;
        float pL = texelFetch(iChannel0, ivec2(fragCoord) + ivec2(-1, 0), 0).x;
        float pU = texelFetch(iChannel0, ivec2(fragCoord) + ivec2(0, 1), 0).x;
        float pD = texelFetch(iChannel0, ivec2(fragCoord) + ivec2(0, -1), 0).x;

        if (fragCoord.x == 0.5) pL = pR;
        if (fragCoord.x == iResolution.x - 0.5) pR = pL;
        if (fragCoord.y == 0.5) pD = pU;
        if (fragCoord.y == iResolution.y - 0.5) pU = pD;

        pVel += delta * (-2.0 * pressure + pR + pL) / 8.0;
        pVel += delta * (-2.0 * pressure + pU + pD) / 8.0;
        pressure += delta * pVel;

        pVel -= 0.005 * delta * pressure;
        pVel *= 1.0 - 0.002 * delta;
        pressure *= 0.9;

        fragColor = vec4(pressure, pVel, (pR - pL) / 2.0, (pU - pD) / 2.0);

        if (iMouse.z > 0.0) {
          float dist = distance(fragCoord, iMouse.xy * iResolution.xy);
          if (dist <= 10.0) {
            fragColor.x += 5.0 * (1.0 - dist / 10.0);
          }
        }
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const imageShader = `
      uniform sampler2D iChannel0;
      uniform vec3 iResolution;

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        vec4 data = texture2D(iChannel0, uv);

        vec3 baseColor = vec3(1.0);
        float brightness = 1.0 - exp(-3.0 * abs(data.x));
        vec3 normal = normalize(vec3(-data.z, 0.2, -data.w));

        vec3 light1 = normalize(vec3(-3, 10, 3));
        float spec1 = pow(max(0.0, dot(normal, light1)), 60.0);
        vec3 color1 = vec3(0.976, 0.341, 0.0);  // #F95700

        vec3 light2 = normalize(vec3(3, 5, -2));
        float spec2 = pow(max(0.0, dot(normal, light2)), 50.0);
        vec3 color2 = vec3(0.0, 0.847, 0.976); // #00D8F940.0);

        vec3 color = baseColor * brightness + 4.0 * spec1 * color1 + 4.0 * spec2 * color2;
        float alpha = 0.6 * smoothstep(0.01, 0.1, abs(data.x));

        color = clamp(color, 0.0, 1.0);
        fragColor = vec4(color, alpha);
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const simMat = new THREE.ShaderMaterial({
      fragmentShader: bufferAShader,
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      uniforms: simUniforms,
    });

    const displayMat = new THREE.ShaderMaterial({
      fragmentShader: imageShader,
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      uniforms: {
        iChannel0: { value: null },
        iResolution: { value: new THREE.Vector3(width, height, 1) },
      },
      transparent: true,
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const simScene = new THREE.Scene();
    const displayScene = new THREE.Scene();
    simScene.add(new THREE.Mesh(quadGeo, simMat));
    displayScene.add(new THREE.Mesh(quadGeo, displayMat));

    const mouse = new THREE.Vector4();
    const lastMouse = new THREE.Vector2();
    let lastMoveTime = performance.now();

    const onMouseMove = (e) => {
      const x = e.clientX / width;
      const y = 1.0 - e.clientY / height;
      if (Math.abs(x - lastMouse.x) > 0.001 || Math.abs(y - lastMouse.y) > 0.001) {
        lastMoveTime = performance.now();
        mouse.z = 1.0;
        lastMouse.set(x, y);
      }
      mouse.x = x;
      mouse.y = y;
    };

    window.addEventListener("mousemove", onMouseMove);

    const idleTimer = setInterval(() => {
      if (performance.now() - lastMoveTime > 500) {
        mouse.z = 0.0;
      }
    }, 100);

    let frame = 0;
    let animationId;

    const animate = (t) => {
      simMat.uniforms.iTime.value = t / 1000;
      simMat.uniforms.iFrame.value = frame;
      simMat.uniforms.iMouse.value.copy(mouse);
      simMat.uniforms.iChannel0.value = currentRT.texture;

      renderer.setRenderTarget(nextRT);
      renderer.render(simScene, camera);

      displayMat.uniforms.iChannel0.value = nextRT.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);

      [currentRT, nextRT] = [nextRT, currentRT];
      frame++;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      clearInterval(idleTimer);
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);

      // 🔥 Dispose of GPU resources
      quadGeo.dispose();
      simMat.dispose();
      displayMat.dispose();
      rtA.dispose();
      rtB.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  },[]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}