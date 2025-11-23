'use client';

import VantaClouds from '../components/VantaClouds';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function Main() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuresRef = useRef<HTMLElement>(null);
  const featureCardsRef = useRef<HTMLDivElement[]>([]);

  const animeCards = [
    {
      title: 'Naruto: Legends Unite',
      description: 'Join Naruto and his friends on an epic journey through the Hidden Leaf Village and beyond.',
      image: '/naruto1.png'
    },
    {
      title: 'One Piece: Grand Adventure',
      description: 'Set sail with the Straw Hat Pirates in search of the ultimate treasure, the One Piece.',
      image: '/naruto1.png' // Replace with actual images
    },
    {
      title: 'Attack on Titan: Final Season',
      description: 'Humanity\'s last stand against the Titans in this thrilling conclusion to the epic saga.',
      image: '/naruto1.png' // Replace with actual images
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % animeCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + animeCards.length) % animeCards.length);
  };

  useEffect(() => {
    const checkGsap = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(checkGsap);
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Parallax effect on feature cards
        featureCardsRef.current.forEach((card, index) => {
          if (card) {
            // Fade in and slide up
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                end: 'top center',
                scrub: 1,
              },
              y: 100,
              opacity: 0,
              scale: 0.8,
              rotation: index % 2 === 0 ? -5 : 5,
            });

            // Continuous parallax movement
            gsap.to(card, {
              scrollTrigger: {
                trigger: featuresRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
              },
              y: index % 2 === 0 ? -50 : 50,
              ease: 'none',
            });
          }
        });

        // Title animation
        if (featuresRef.current) {
          gsap.from(featuresRef.current.querySelector('h2'), {
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
            x: -100,
            opacity: 0,
            scale: 0.9,
          });
        }
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
            <h1 className="text-3xl font-bold text-black font-[Bungee]">ANIXYA</h1>
            <button
              onClick={() => router.push('/anime')}
              className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-lg text-black font-semibold hover:bg-white/30 transition-all border border-black/20"
            >
              Browse Anime →
            </button>
          </div>
        </nav>

        {/* Hero Section - Carousel */}
        <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-20">
          <div className="relative w-full max-w-7xl">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-3xl border-2 backdrop-blur-md bg-white/5" style={{ 
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              borderImage: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.3)) 1'
            }}>
              {/* Slides */}
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {animeCards.map((anime, index) => (
                  <div
                    key={index}
                    className="min-w-full"
                  >
                    <div
                      className="relative h-[700px] rounded-2xl overflow-hidden"
                      style={{
                        backgroundImage: `url(${anime.image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>
                          {anime.title}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 leading-relaxed max-w-2xl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '1px 1px 4px rgba(0,0,0,0.9)' }}>
                          {anime.description}
                        </p>
                        <div className="flex gap-4 flex-wrap">
                          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            Watch Now
                          </button>
                          <button className="bg-gray-700/90 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add to List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {animeCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section ref={featuresRef} className="max-w-7xl mx-auto px-6 py-32">
          <h2 className="text-4xl font-bold mb-16 text-black font-[Bungee]">Explore Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div 
              ref={(el) => { if (el) featureCardsRef.current[0] = el; }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-black/20 hover:border-black/40 transition-all hover:bg-white/15 hover:shadow-2xl"
            >
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-2xl font-bold mb-4 text-black font-[Bungee]">Latest Releases</h3>
              <p className="text-black">Stay updated with the newest anime releases and episodes</p>
            </div>
            <div 
              ref={(el) => { if (el) featureCardsRef.current[1] = el; }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-black/20 hover:border-black/40 transition-all hover:bg-white/15 hover:shadow-2xl"
            >
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-4 text-black font-[Bungee]">Community</h3>
              <p className="text-black">Connect with fellow otakus and share your passion</p>
            </div>
            <div 
              ref={(el) => { if (el) featureCardsRef.current[2] = el; }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-black/20 hover:border-black/40 transition-all hover:bg-white/15 hover:shadow-2xl"
            >
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-4 text-black font-[Bungee]">Recommendations</h3>
              <p className="text-black">Get personalized anime suggestions based on your taste</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
