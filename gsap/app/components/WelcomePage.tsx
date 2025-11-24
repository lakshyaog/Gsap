'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    gsap: any;
  }
}

export default function WelcomePage() {
  const router = useRouter();
  const titleRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkGsap = setInterval(() => {
      if (window.gsap) {
        clearInterval(checkGsap);
        const gsap = window.gsap;

        // Fade + Motion Parallax Timeline with improved timing
        const tl = gsap.timeline({
          onComplete: () => {
            // Exit animation sequence
            const exitTl = gsap.timeline({
              onComplete: () => {
                router.push('/main');
              }
            });

            // Animate text elements out with stagger
            exitTl
              .to(titleRef.current, {
                y: -100,
                opacity: 0,
                scale: 1.2,
                rotationX: 20,
                duration: 1,
                ease: 'power3.in'
              })
              .to(welcomeRef.current, {
                y: -80,
                opacity: 0,
                scale: 1.15,
                rotationX: 15,
                duration: 0.9,
                ease: 'power3.in'
              }, '-=0.7')
              .to(subtitleRef.current, {
                y: -60,
                opacity: 0,
                scale: 1.1,
                rotationX: 10,
                duration: 0.8,
                ease: 'power3.in'
              }, '-=0.6')
              .to('.welcome-container', {
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                ease: 'power2.in'
              }, '-=0.4');
          }
        });

        // Title - Fade in with parallax motion (slow movement)
        tl.fromTo(titleRef.current, 
          {
            opacity: 0,
            y: 150,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.5,
            ease: 'power4.out'
          }
        )
        // Welcome - Fade in with parallax motion (medium speed)
        .fromTo(welcomeRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.2,
            ease: 'power3.out'
          },
          '-=1.8'
        )
        // Subtitle - Fade in with parallax motion (fast movement)
        .fromTo(subtitleRef.current,
          {
            opacity: 0,
            y: 80,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.8,
            ease: 'power2.out'
          },
          '-=1.6'
        );

        // Add subtle floating animation to elements
        gsap.to(titleRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3
        });

        gsap.to(welcomeRef.current, {
          y: -8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3.2
        });

        gsap.to(subtitleRef.current, {
          y: -6,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3.4
        });
      }
    }, 100);

    return () => clearInterval(checkGsap);
  }, [router]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="flex min-h-screen items-center justify-center relative z-10 welcome-container">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0a1628]/30 to-transparent pointer-events-none" />
      
      <div className="text-center px-4 sm:px-8 relative max-w-7xl mx-auto">
        {/* Main title with fade + parallax */}
        <div 
          ref={titleRef} 
          className="mb-8 sm:mb-12"
          style={{
            opacity: 0,
            transform: 'translateY(150px) scale(0.8)'
          }}
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none transition-all duration-300 hover:scale-105 cursor-default text-center"
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              color: '#f4a7b9',
              textShadow: `
                0 0 15px rgba(244, 167, 185, 0.4),
                0 0 25px rgba(244, 167, 185, 0.2)
              `,
              WebkitTextStroke: '1px rgba(255, 192, 203, 0.2)',
              letterSpacing: '0.05em'
            }}
          >
            ANIXYA
          </h1>
        </div>

        {/* Welcome text with fade + parallax */}
        <div 
          ref={welcomeRef} 
          className="mb-4 sm:mb-6"
          style={{
            opacity: 0,
            transform: 'translateY(100px) scale(0.9)'
          }}
        >
          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide transition-all duration-300 hover:scale-105 cursor-default text-center"
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 600,
              color: '#ffb6c1',
              textShadow: `
                0 0 10px rgba(255, 182, 193, 0.3),
                0 0 20px rgba(255, 182, 193, 0.15)
              `,
              letterSpacing: '0.1em'
            }}
          >
            WELCOME
          </p>
        </div>

        {/* Subtitle with fade + parallax */}
        <div
          ref={subtitleRef}
          style={{
            opacity: 0,
            transform: 'translateY(80px) scale(0.95)'
          }}
        >
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wider mb-6 sm:mb-10 transition-all duration-300 hover:text-[#ffc0cb] cursor-default uppercase text-center"
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 500,
              color: '#ffd1dc',
              textShadow: `
                0 0 8px rgba(255, 209, 220, 0.25),
                0 0 15px rgba(255, 209, 220, 0.12)
              `,
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            EXPLORE • WATCH • ENJOY
          </p>

          {/* Decorative lines with animation */}
          <div className="flex justify-center items-center gap-3 sm:gap-6 mt-6 sm:mt-8">
            <div
              className="w-16 sm:w-24 md:w-32 lg:w-40 h-0.5 animate-pulse"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 182, 193, 0.4), transparent)',
                boxShadow: '0 0 8px rgba(255, 182, 193, 0.3)',
              }}
            />
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 rotate-45 animate-spin"
              style={{
                background: '#ffb6c1',
                boxShadow: '0 0 10px rgba(255, 182, 193, 0.4)',
                animation: 'spin 4s linear infinite'
              }}
            />
            <div
              className="w-16 sm:w-24 md:w-32 lg:w-40 h-0.5 animate-pulse"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 182, 193, 0.4), transparent)',
                boxShadow: '0 0 8px rgba(255, 182, 193, 0.3)',
              }}
            />
          </div>

          {/* Loading indicator */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <div className="flex gap-2">
              <div 
                className="w-2 h-2 rounded-full bg-[#f4a7b9]"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite',
                  boxShadow: '0 0 8px rgba(244, 167, 185, 0.4)'
                }}
              />
              <div 
                className="w-2 h-2 rounded-full bg-[#ffb6c1]"
                style={{
                  animation: 'pulse 1.5s ease-in-out 0.2s infinite',
                  boxShadow: '0 0 8px rgba(255, 182, 193, 0.4)'
                }}
              />
              <div 
                className="w-2 h-2 rounded-full bg-[#ffd1dc]"
                style={{
                  animation: 'pulse 1.5s ease-in-out 0.4s infinite',
                  boxShadow: '0 0 8px rgba(255, 209, 220, 0.4)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
