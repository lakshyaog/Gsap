'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

// Animated birds background component using Vanta.js
export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Load Three.js
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
    threeScript.async = true;
    document.body.appendChild(threeScript);

    threeScript.onload = () => {
      // Load Vanta Birds
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
      vantaScript.async = true;
      document.body.appendChild(vantaScript);

      vantaScript.onload = () => {
        // Small debug to confirm Vanta loaded (safe for dev only)
        // The log will be suppressed in production builds by bundlers if needed
        // eslint-disable-next-line no-console
        console.debug('[Vanta] birds script loaded');

        if (!vantaEffect.current && vantaRef.current && window.VANTA) {
          vantaEffect.current = window.VANTA.BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x0a1628,
            color1: 0x1a3a52,      // Dark blue birds
            color2: 0x2d5a7b,      // Medium blue birds
            colorMode: 'variance',
            birdSize: 1.2,
            wingSpan: 25.0,
            speedLimit: 3.6,       // tiny speed nudge for smoother motion
            separation: 25.0,
            alignment: 25.0,
            cohesion: 25.0,
            quantity: 4.2,         // slight increase for fuller effect
          });
        }
      };
    };

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}
