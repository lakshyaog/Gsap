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

        {/* About ANIXYA Section */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-linear-to-b from-transparent to-black/20 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Main Heading */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                ANIXYA – The best site to watch anime online for Free
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Do you know that according to Google, the monthly search volume for anime related topics is up to over 1 Billion times? Anime is famous worldwide and it is no wonder we&apos;ve seen a sharp rise in the number of free anime streaming sites.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Just like free online movie streaming sites, anime watching sites are not created equally, some are better than the rest, so we&apos;ve decided to build ANIXYA to be one of the best free anime streaming site for all anime fans on the world.
              </p>
            </div>

            {/* What is ANIXYA */}
            <div className="space-y-4 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">1/ What is ANIXYA?</h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                ANIXYA is a free site to watch anime and you can even download subbed or dubbed anime in ultra HD quality without any registration or payment. By having only one ads in all kinds, we are trying to make it the safest site for free anime.
              </p>
            </div>

            {/* Is ANIXYA Safe */}
            <div className="space-y-4 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">2/ Is ANIXYA safe?</h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Yes we are, we do have only one Ads to cover the server cost and we keep scanning the ads 24/7 to make sure all are clean. If you find any ads that is suspicious, please forward us the info and we will remove it.
              </p>
            </div>

            {/* What makes ANIXYA the best */}
            <div className="space-y-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                3/ So what make ANIXYA the best site to watch anime free online?
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Before building ANIXYA, we&apos;ve checked many other free anime sites, and learnt from them. We only keep the good things and remove all the bad things from all the competitors, to put it in our ANIXYA website. Let&apos;s see how we&apos;re so confident about being the best site for anime streaming:
              </p>
              
              <ul className="space-y-4 text-white/90">
                <li className="space-y-2">
                  <strong className="text-white text-lg">Safety:</strong>
                  <p className="text-base sm:text-lg leading-relaxed">We try our best to not having harmful ads on ANIXYA.</p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-white text-lg">Content library:</strong>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Our main focus is anime. You can find here popular, classic, as well as current titles from all genres such as action, drama, kids, fantasy, horror, mystery, police, romance, school, comedy, music, game and many more. All these titles come with English subtitles or are dubbed in many languages.
                  </p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-white text-lg">Quality/Resolution:</strong>
                  <p className="text-base sm:text-lg leading-relaxed">
                    All titles are in excellent resolution, the best quality possible. ANIXYA also has a quality setting function to make sure our users can enjoy streaming no matter how fast your Internet speed is. You can stream the anime at 360p if your Internet is being ridiculous, Or if it is good, you can go with 720p or even 1080p anime.
                  </p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-white text-lg">Streaming experience:</strong>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Compared to other anime streaming sites, the loading speed at ANIXYA is faster. Downloading is just as easy as streaming, you won&apos;t have any problem saving the videos to watch offline later.
                  </p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-white text-lg">Updates:</strong>
                  <p className="text-base sm:text-lg leading-relaxed">
                    We updates new titles as well as fulfill the requests on a daily basis so be warned, you will never run out of what to watch on ANIXYA.
                  </p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-white text-lg">User interface:</strong>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Our UI and UX makes it easy for anyone, no matter how old you are, how long have you been on the Internet. Literally, you can figure out how to navigate our site after a quick look. If you want to watch a specific title, search for it via the search box. If you want to look for suggestions, you can use the site&apos;s categories or simply scroll down for new releases.
                  </p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-white text-lg">Device compatibility:</strong>
                  <p className="text-base sm:text-lg leading-relaxed">
                    ANIXYA works alright on both your mobile and desktop. However, we&apos;d recommend you use your desktop for a smoother streaming experience.
                  </p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-white text-lg">Customer care:</strong>
                  <p className="text-base sm:text-lg leading-relaxed">
                    We are in active mode 24/7. You can always contact us for any help, query, or business-related inquiry. On our previous projects, we were known for our great customer service as we were quick to fix broken links or upload requested content.
                  </p>
                </li>
              </ul>
            </div>

            {/* Closing Statement */}
            <div className="text-center space-y-4 bg-linear-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20">
              <p className="text-base sm:text-lg text-white/95 leading-relaxed">
                So if you&apos;re looking for a trustworthy and safe site for your Anime streaming, let&apos;s give ANIXYA a try. And if you like us, please help us to spread the words and do not forget to bookmark our site.
              </p>
              <p className="text-sm text-white/70 mt-8">
                © ANIXYA. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
