'use client';

import VantaClouds from '../components/VantaClouds';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CardBody, CardContainer, CardItem } from '../components/ui/3d-card';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function AnimePage() {
  const router = useRouter();
  const animeGridRef = useRef<HTMLDivElement>(null);
  const animeCardsRef = useRef<HTMLDivElement[]>([]);

  const animeList = [
    { id: 1, title: 'Attack on Titan', image: '' },
    { id: 2, title: 'Naruto / Naruto Shippuden', image: '' },
    { id: 3, title: 'One Piece', image: '' },
    { id: 4, title: 'Demon Slayer (Kimetsu no Yaiba)', image: '' },
    { id: 5, title: 'Jujutsu Kaisen', image: '' },
    { id: 6, title: 'Death Note', image: '' },
    { id: 7, title: 'Dragon Ball Z / Super', image: '' },
    { id: 8, title: 'My Hero Academia', image: '' },
    { id: 9, title: 'Hunter x Hunter', image: '' },
    { id: 10, title: 'Tokyo Ghoul', image: '' },
    { id: 11, title: 'Fullmetal Alchemist: Brotherhood', image: '' },
    { id: 12, title: 'Sword Art Online', image: '' },
    { id: 13, title: 'One Punch Man', image: '' },
    { id: 14, title: 'Bleach', image: '' },
    { id: 15, title: 'Chainsaw Man', image: '' },
    { id: 16, title: 'Black Clover', image: '' },
    { id: 17, title: 'Haikyuu!!', image: '' },
    { id: 18, title: 'Fairy Tail', image: '' },
    { id: 19, title: 'Code Geass', image: '' },
    { id: 20, title: 'Steins;Gate', image: '' },
    { id: 21, title: 'Re:Zero', image: '' },
    { id: 22, title: 'Mob Psycho 100', image: '' },
    { id: 23, title: 'Vinland Saga', image: '' },
    { id: 24, title: 'Ao Haru Ride', image: '' },
    { id: 25, title: 'Blue Lock', image: '' },
    { id: 26, title: 'Spy x Family', image: '' },
    { id: 27, title: 'Kaguya-Sama: Love is War', image: '' },
    { id: 28, title: 'Your Lie in April', image: '' },
    { id: 29, title: 'Erased', image: '' },
    { id: 30, title: 'The Seven Deadly Sins', image: '' },
  ];

  useEffect(() => {
    const checkGsap = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(checkGsap);
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Animate each anime card on scroll
        animeCardsRef.current.forEach((card, index) => {
          if (card) {
            // Stagger animation based on position
            const delay = (index % 5) * 0.1;
            
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: 'top bottom-=50',
                end: 'top center',
                scrub: 1,
              },
              y: 100,
              opacity: 0,
              scale: 0.8,
              rotation: index % 2 === 0 ? -10 : 10,
              delay,
            });

            // Hover effect enhancement with GSAP
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                scale: 1.05,
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
              });
            });

            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          }
        });

        // Animate header
        gsap.from('.anime-header', {
          scrollTrigger: {
            trigger: '.anime-header',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          x: -100,
          opacity: 0,
          scale: 0.9,
        });
      }
    }, 100);

    return () => clearInterval(checkGsap);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Vanta Clouds Background */}
      <VantaClouds />

      {/* Content */}
      <div className="relative pointer-events-auto" style={{ zIndex: 10 }}>
        {/* Navigation */}
        <nav className="p-6 absolute top-0 left-0 right-0" style={{ zIndex: 20 }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 
              className="text-3xl font-bold text-black font-[Bungee] cursor-pointer hover:scale-105 transition-transform"
              onClick={() => router.push('/main')}
            >
              ANIXYA
            </h1>
            <button
              onClick={() => router.push('/main')}
              className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-lg text-black font-semibold hover:bg-white/30 transition-all border border-black/20"
            >
              ← Back to Home
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="anime-header text-5xl md:text-7xl font-bold text-black font-[Bungee] mb-4">
              Popular Anime
            </h1>
            <p className="anime-header text-xl text-black/80 max-w-2xl">
              Explore the most popular and trending anime series of all time
            </p>
          </div>
        </section>

        {/* Anime Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-7xl mx-auto">
            <div 
              ref={animeGridRef}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-16"
            >
              {animeList.map((anime, index) => (
                <div
                  key={anime.id}
                  ref={(el) => { if (el) animeCardsRef.current[index] = el; }}
                  className="flex justify-center"
                >
                  <CardContainer className="inter-var w-full max-w-md">
                    <CardBody className="bg-white/10 backdrop-blur-md relative group/card dark:hover:shadow-2xl dark:hover:shadow-blue-500/[0.1] border-black w-full h-auto rounded-xl p-6 border-4">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-black dark:text-white font-[Bungee]"
                      >
                        {anime.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-black/70 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        Hover over this card to see the 3D effect
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mt-4">
                        <div className="h-48 w-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl group-hover/card:shadow-xl flex items-center justify-center">
                          <div className="text-6xl">🎬</div>
                        </div>
                      </CardItem>
                      <div className="flex justify-between items-center mt-6">
                        <CardItem
                          translateZ={20}
                          className="px-4 py-2 rounded-xl text-xs font-normal text-black dark:text-white flex items-center gap-2"
                        >
                          <span>⭐ 4.8</span>
                          <span>•</span>
                          <span>#{anime.id}</span>
                        </CardItem>
                        <CardItem
                          translateZ={20}
                          as="button"
                          className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center gap-2 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Watch Now
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-6 md:px-12 lg:px-20 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border-2 border-white/20 text-center">
              <h2 className="text-4xl font-bold text-black font-[Bungee] mb-4">
                Can't find your favorite?
              </h2>
              <p className="text-xl text-black/80 mb-8">
                We're constantly adding new anime to our collection
              </p>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
                Request Anime
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
