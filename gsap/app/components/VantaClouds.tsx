'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THREE: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VANTA: any;
  }
}

export default function VantaClouds() {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let threeScript: HTMLScriptElement;
    let vantaScript: HTMLScriptElement;

    const loadVanta = () => {
      // Load Three.js
      threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      document.head.appendChild(threeScript);

      threeScript.onload = () => {
        // Load Vanta Clouds (not Clouds2)
        vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
        document.head.appendChild(vantaScript);

        vantaScript.onload = () => {
          const initVanta = setInterval(() => {
            if (vantaRef.current && window.VANTA && !vantaEffect.current) {
              clearInterval(initVanta);
              try {
                vantaEffect.current = window.VANTA.CLOUDS({
                  el: vantaRef.current,
                  THREE: window.THREE,
                  mouseControls: true,
                  touchControls: true,
                  gyroControls: false,
                  minHeight: 200.00,
                  minWidth: 200.00,
                  skyColor: 0x68b8d7,
                  cloudColor: 0xadc1de,
                  cloudShadowColor: 0x1a2a42,
                  sunColor: 0xff9919,
                  sunlightColor: 0xff9933,
                  speed: 2.00
                });
              } catch (error) {
                console.error('Vanta initialization error:', error);
              }
            }
          }, 100);
        };
      };
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.error('Vanta cleanup error:', error);
        }
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0"
      style={{ 
        zIndex: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
}
