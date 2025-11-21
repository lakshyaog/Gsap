'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gsap: any;
  }
}

export default function WelcomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const checkGsap = setInterval(() => {
      if (window.gsap) {
        clearInterval(checkGsap);
        const gsap = window.gsap;

        // Set initial states
        gsap.set(titleRef.current, { opacity: 0 });
        gsap.set(welcomeRef.current, { opacity: 0, scale: 0.8 });
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
        gsap.set(cursorRef.current, { opacity: 0 });
        gsap.set(lettersRef.current, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: '50% 50%',
        });

        // Complex entrance timeline
        const mainTimeline = gsap.timeline();

        // Rapid glitch sequence
        mainTimeline
          .to(glitchRef.current, {
            opacity: 0.8,
            x: -5,
            duration: 0.03,
            ease: 'steps(1)',
          })
          .to(glitchRef.current, {
            x: 5,
            duration: 0.03,
          })
          .to(glitchRef.current, {
            x: -3,
            duration: 0.03,
          })
          .to(glitchRef.current, {
            opacity: 0,
            x: 0,
            duration: 0.05,
          })
          // Reveal title container
          .to(titleRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.in',
          })
          // Sophisticated letter animation with 3D effects
          .to(lettersRef.current, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: {
              each: 0.12,
              from: 'center',
              ease: 'back.out(2)',
            },
            duration: 1.2,
            ease: 'expo.out',
          }, '-=0.3')
          // Welcome text reveal with scale
          .to(welcomeRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
          }, '-=0.3')
          // Cursor appear
          .to(cursorRef.current, {
            opacity: 1,
            duration: 0.1,
          })
          // Subtitle slide up
          .to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          }, '-=0.5');

        // Cursor blink only
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)',
          delay: 2.5,
        });

        // Occasional glitch on random letters
        const glitchInterval = setInterval(() => {
          if (Math.random() > 0.8 && lettersRef.current.length > 0) {
            const randomLetter = lettersRef.current[Math.floor(Math.random() * lettersRef.current.length)];
            gsap.timeline()
              .to(randomLetter, {
                x: gsap.utils.random(-2, 2),
                opacity: 0.5,
                duration: 0.05,
              })
              .to(randomLetter, {
                x: 0,
                opacity: 1,
                duration: 0.05,
              });
          }
        }, 4000);

        return () => {
          clearInterval(glitchInterval);
        };
      }
    }, 100);

    return () => clearInterval(checkGsap);
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        ref={(el) => {
          if (el) lettersRef.current[index] = el;
        }}
        style={{
          display: 'inline-block',
          opacity: 0,
          transform: 'translateY(50px) rotateX(-90deg)',
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen items-center justify-center relative z-10"
    >
      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
        }}
      />

      <div className="text-center px-8 relative">
        {/* Glitch overlay */}
        <div
          ref={glitchRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: 0,
            mixBlendMode: 'difference',
          }}
        >
          <h1
            className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-widest mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#4a90e2',
            }}
          >
            ANIXYA
          </h1>
        </div>

        {/* Main title */}
        <div ref={titleRef} className="mb-16">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-widest leading-none"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 900,
              color: '#5dade2',
              textShadow: `
                0 0 15px rgba(93, 173, 226, 0.6),
                0 0 30px rgba(93, 173, 226, 0.4)
              `,
              WebkitTextStroke: '1.5px rgba(133, 193, 233, 0.3)',
              paintOrder: 'stroke fill',
            }}
          >
            {splitText('ANIXYA')}
          </h1>
        </div>

        {/* Welcome text with typing effect */}
        <div ref={welcomeRef} className="mb-8" style={{ opacity: 0 }}>
          <p
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              color: '#85c1e9',
              textShadow: `
                0 0 10px rgba(133, 193, 233, 0.5),
                0 0 20px rgba(133, 193, 233, 0.3)
              `,
            }}
          >
            WELCOME
            <span
              ref={cursorRef}
              style={{
                color: '#5dade2',
                opacity: 0,
              }}
            >
              _
            </span>
          </p>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl tracking-widest mb-10"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 600,
              color: '#aed6f1',
              textShadow: `
                0 0 8px rgba(174, 214, 241, 0.4),
                0 0 16px rgba(174, 214, 241, 0.2)
              `,
            }}
          >
            THE PLACE WHERE OTAKUS BELONG
          </p>

          {/* Decorative lines */}
          <div className="flex justify-center items-center gap-6">
            <div
              className="w-24 sm:w-32 md:w-40 h-0.5"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(93, 173, 226, 0.6), transparent)',
                boxShadow: '0 0 8px rgba(93, 173, 226, 0.4)',
              }}
            />
            <div
              className="w-2.5 h-2.5 rotate-45"
              style={{
                background: '#5dade2',
                boxShadow: '0 0 12px rgba(93, 173, 226, 0.6)',
              }}
            />
            <div
              className="w-24 sm:w-32 md:w-40 h-0.5"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(133, 193, 233, 0.6), transparent)',
                boxShadow: '0 0 8px rgba(133, 193, 233, 0.4)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
