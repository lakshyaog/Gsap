'use client';

import VantaClouds from '../components/VantaClouds';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import EveryButton from '../components/ui/EveryButton';
import PixelTransition from '../components/PixelTransition';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gsap: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ScrollTrigger: any;
  }
}

export default function AnimePage() {
  const router = useRouter();
  const animeGridRef = useRef<HTMLDivElement>(null);
  const animeCardsRef = useRef<HTMLDivElement[]>([]);

  const handleWatchAnime = (animeTitle: string, animeId: number) => {
    // Navigate to internal watch page for each anime
    const slug = animeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/watch/${slug}?id=${animeId}`);
  };

  const handleRequestAnime = () => {
    alert('Request anime feature coming soon! We will add your favorite anime.');
  };

  const animeList = [
    { id: 1, title: 'Attack on Titan', image: '/attackontitan.jpeg' },
    { id: 2, title: 'Naruto / Naruto Shippuden', image: '/N.jpeg' },
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

        // Animate each anime card on scroll - alternating from left and right
        animeCardsRef.current.forEach((card, index) => {
          if (card) {
            // Alternate between left and right
            const fromLeft = index % 2 === 0;
            
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top center+=100',
                scrub: 2,
                toggleActions: 'play none none reverse',
              },
              x: fromLeft ? -1000 : 1000,
              opacity: 0,
              rotation: fromLeft ? -20 : 20,
              scale: 0.5,
              ease: 'power2.out',
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
        <nav className="p-4 sm:p-6 absolute top-0 left-0 right-0" style={{ zIndex: 20 }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <h1 
              className="text-2xl sm:text-3xl font-bold text-black font-[Bungee] cursor-pointer hover:scale-105 transition-transform"
              onClick={() => router.push('/main')}
            >
              ANIXYA
            </h1>
            <EveryButton onClick={() => router.push('/main')}>
              <span className="text-sm sm:text-base">← <span className="hidden sm:inline">Back to</span> Home</span>
            </EveryButton>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="anime-header text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black font-[Bungee] mb-3 sm:mb-4">
              Popular Anime
            </h1>
            <p className="anime-header text-base sm:text-lg md:text-xl text-black/80 max-w-2xl">
              Explore the most popular and trending anime series of all time
            </p>
          </div>
        </section>

        {/* Anime Grid */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-20 pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto">
            <div 
              ref={animeGridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16"
            >
              {animeList.map((anime, index) => (
                <div
                  key={anime.id}
                  ref={(el) => { if (el) animeCardsRef.current[index] = el; }}
                  className="flex justify-center w-full"
                >
                  <PixelTransition
                    className="w-full max-w-md rounded-xl border-4 border-black overflow-hidden bg-gray-900"
                    style={{ minHeight: '400px' }}
                    aspectRatio="125%"
                    gridSize={12}
                    pixelColor="#000000"
                    animationStepDuration={0.5}
                    firstContent={
                      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] bg-gray-900">
                        {anime.image ? (
                          <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${anime.image})` }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                            <div className="text-7xl sm:text-8xl md:text-9xl">🎬</div>
                          </div>
                        )}
                        
                        {/* Subtle overlay for depth */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Content */}
                        <div className="relative p-4 sm:p-6 h-full flex flex-col justify-end">
                          <h3
                            className="text-lg sm:text-xl font-bold text-white px-3 sm:px-4 py-2 rounded-lg mb-2 sm:mb-3 font-[Bungee]"
                            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}
                          >
                            {anime.title}
                          </h3>
                          <p className="text-white/90 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm mb-3 sm:mb-4"
                            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
                          >
                            Hover to reveal
                          </p>
                          <div className="flex justify-between items-center gap-2">
                            <div className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2"
                              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
                            >
                              <span>⭐ 4.8</span>
                              <span>•</span>
                              <span>#{anime.id}</span>
                            </div>
                            <button
                              onClick={() => handleWatchAnime(anime.title, anime.id)}
                              className="px-4 sm:px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-lg cursor-pointer touch-manipulation"
                            >
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                              <span className="hidden sm:inline">Watch Now</span>
                              <span className="sm:hidden">Watch</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    }
                    secondContent={
                      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] bg-gray-900">
                        {anime.image ? (
                          <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ 
                              backgroundImage: `url(${anime.image})`,
                              filter: 'blur(10px)',
                              transform: 'scale(1.1)'
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center"
                            style={{ filter: 'blur(10px)' }}
                          >
                            <div className="text-7xl sm:text-8xl md:text-9xl">🎬</div>
                          </div>
                        )}
                        
                        {/* Subtle overlay for depth */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Content */}
                        <div className="relative p-4 sm:p-6 h-full flex flex-col justify-end">
                          <h3
                            className="text-lg sm:text-xl font-bold text-white px-3 sm:px-4 py-2 rounded-lg mb-2 sm:mb-3 font-[Bungee]"
                            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}
                          >
                            {anime.title}
                          </h3>
                          <p className="text-white/90 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm mb-3 sm:mb-4"
                            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
                          >
                            Click to watch!
                          </p>
                          <div className="flex justify-between items-center gap-2">
                            <div className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2"
                              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
                            >
                              <span>⭐ 4.8</span>
                              <span>•</span>
                              <span>#{anime.id}</span>
                            </div>
                            <button
                              onClick={() => handleWatchAnime(anime.title, anime.id)}
                              className="px-4 sm:px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-lg cursor-pointer touch-manipulation z-10 relative pointer-events-auto"
                            >
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                              <span className="hidden sm:inline">Watch Now</span>
                              <span className="sm:hidden">Watch</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    }
                  />
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
                Can&apos;t find your favorite?
              </h2>
              <p className="text-xl text-black/80 mb-8">
                We&apos;re constantly adding new anime to our collection
              </p>
              <EveryButton onClick={handleRequestAnime}>
                Request Anime
              </EveryButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
