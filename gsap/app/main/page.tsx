'use client';

import VantaClouds from '../components/VantaClouds';
import { useState, useEffect, useRef } from 'react';
import EveryButton from '../components/ui/EveryButton';
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
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const featuresRef = useRef<HTMLElement>(null);
  const featureCardsRef = useRef<HTMLDivElement[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const animeCards = [
    {
      title: 'Naruto: Legends Unite',
      description: 'Join Naruto and his friends on an epic journey through the Hidden Leaf Village and beyond.',
      image: '/N.jpeg'
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

  const handleWatchNow = (animeTitle: string) => {
    // Navigate to anime page or show alert
    alert(`Starting to watch: ${animeTitle}`);
    router.push('/anime');
  };

  const handleAddToList = (animeTitle: string) => {
    if (watchlist.includes(animeTitle)) {
      setWatchlist(watchlist.filter(item => item !== animeTitle));
      alert(`Removed "${animeTitle}" from your watchlist`);
    } else {
      setWatchlist([...watchlist, animeTitle]);
      alert(`Added "${animeTitle}" to your watchlist!`);
    }
  };

  // Auto-play carousel
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds for smoother experience

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkGsap = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(checkGsap);
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Initialize all slides
        if (carouselRef.current) {
          const slides = carouselRef.current.querySelectorAll('.carousel-slide');
          
          // Reset all slides first
          slides.forEach((slide, index) => {
            if (index !== currentSlide) {
              gsap.set(slide, {
                rotationY: 90,
                opacity: 0,
                transformOrigin: 'left center',
                transformPerspective: 1500,
                z: -200,
              });
            } else {
              gsap.set(slide, {
                rotationY: 0,
                opacity: 1,
                z: 0,
                transformOrigin: 'left center',
                transformPerspective: 1500,
              });
            }
          });

          // Animate carousel slides with book flip effect
          slides.forEach((slide, index) => {
            if (index === currentSlide) {
              // Current slide - flip in from right
              gsap.fromTo(slide,
                {
                  rotationY: 90,
                  opacity: 0,
                  transformOrigin: 'left center',
                  transformPerspective: 1500,
                  z: -200,
                },
                {
                  rotationY: 0,
                  opacity: 1,
                  z: 0,
                  duration: 1.2,
                  ease: 'power3.inOut'
                }
              );
            } else if (index === (currentSlide - 1 + animeCards.length) % animeCards.length) {
              // Previous slide - flip out to left
              gsap.to(slide,
                {
                  rotationY: -90,
                  opacity: 0,
                  transformOrigin: 'right center',
                  transformPerspective: 1500,
                  z: -200,
                  duration: 1.2,
                  ease: 'power3.inOut'
                }
              );
            }
          });
        }

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
  }, [currentSlide]);

  return (
    <div className="relative min-h-screen">
      {/* Vanta Clouds Background */}
      <VantaClouds />

      {/* Content */}
      <div className="relative pointer-events-auto" style={{ zIndex: 10 }}>
        {/* Navigation */}
        <nav className="p-4 sm:p-6 absolute top-0 left-0 right-0" style={{ zIndex: 20 }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-black font-[Bungee]">ANIXYA</h1>
            <EveryButton onClick={() => router.push('/anime')}>
              <span className="hidden sm:inline">Browse Anime →</span>
              <span className="sm:hidden">Browse →</span>
            </EveryButton>
          </div>
        </nav>

        {/* Hero Section - Carousel */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-20 sm:py-24">
          <div className="relative w-full max-w-7xl">
            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="relative overflow-hidden rounded-3xl border-2 backdrop-blur-md bg-white/5" 
              style={{ 
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                borderImage: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.3)) 1'
              }}
            >
              {/* Slides */}
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]" style={{ perspective: '2000px' }}>
                {animeCards.map((anime, index) => (
                  <div
                    key={index}
                    className={`carousel-slide absolute inset-0 ${
                      index === currentSlide ? 'z-10' : 'z-0'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      willChange: 'transform, opacity'
                    }}
                  >
                    <div
                      className="relative h-full rounded-2xl overflow-hidden"
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
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-white leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>
                          {anime.title}
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-6 sm:mb-8 leading-relaxed max-w-2xl\" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '1px 1px 4px rgba(0,0,0,0.9)' }}>
                          {anime.description}
                        </p>
                        <div className="flex gap-3 sm:gap-4 flex-wrap">
                          <button 
                            onClick={() => handleWatchNow(anime.title)}
                            className="bg-blue-600 text-white px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg cursor-pointer touch-manipulation\"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="whitespace-nowrap">Watch Now</span>
                          </button>
                          <button 
                            onClick={() => handleAddToList(anime.title)}
                            className="bg-gray-700/90 text-white px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg cursor-pointer touch-manipulation\"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={watchlist.includes(anime.title) ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                            </svg>
                            <span className="whitespace-nowrap hidden sm:inline\">{watchlist.includes(anime.title) ? 'In Watchlist' : 'Add to List'}</span>
                            <span className="whitespace-nowrap sm:hidden\">{watchlist.includes(anime.title) ? 'Added' : 'Add'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows - Hidden, only for manual control if needed */}
              <button
                onClick={() => {
                  prevSlide();
                  // Reset auto-play timer
                  if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current);
                    autoPlayRef.current = setInterval(() => nextSlide(), 4000);
                  }
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-all opacity-0 hover:opacity-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  nextSlide();
                  // Reset auto-play timer
                  if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current);
                    autoPlayRef.current = setInterval(() => nextSlide(), 4000);
                  }
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-all opacity-0 hover:opacity-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {animeCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      // Reset auto-play timer
                      if (autoPlayRef.current) {
                        clearInterval(autoPlayRef.current);
                        autoPlayRef.current = setInterval(() => nextSlide(), 4000);
                      }
                    }}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer hover:scale-125 ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
