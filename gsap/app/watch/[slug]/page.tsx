'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function WatchPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const animeId = searchParams.get('id');
  
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [selectedServer, setSelectedServer] = useState('Server 1');

  // Anime data based on ID
  const animeData: Record<string, any> = {
    '1': { title: 'Attack on Titan', totalEpisodes: 75, image: '/attackontitan.jpeg' },
    '2': { title: 'Naruto / Naruto Shippuden', totalEpisodes: 720, image: '/N.jpeg' },
    '3': { title: 'One Piece', totalEpisodes: 1000, image: '' },
    '4': { title: 'Demon Slayer (Kimetsu no Yaiba)', totalEpisodes: 55, image: '' },
    '5': { title: 'Jujutsu Kaisen', totalEpisodes: 47, image: '' },
    '6': { title: 'Death Note', totalEpisodes: 37, image: '' },
    '7': { title: 'Dragon Ball Z / Super', totalEpisodes: 420, image: '' },
    '8': { title: 'My Hero Academia', totalEpisodes: 138, image: '' },
    '9': { title: 'Hunter x Hunter', totalEpisodes: 148, image: '' },
    '10': { title: 'Tokyo Ghoul', totalEpisodes: 48, image: '' },
    '11': { title: 'Fullmetal Alchemist: Brotherhood', totalEpisodes: 64, image: '' },
    '12': { title: 'Sword Art Online', totalEpisodes: 96, image: '' },
    '13': { title: 'One Punch Man', totalEpisodes: 24, image: '' },
    '14': { title: 'Bleach', totalEpisodes: 366, image: '' },
    '15': { title: 'Chainsaw Man', totalEpisodes: 12, image: '' },
    '16': { title: 'Black Clover', totalEpisodes: 170, image: '' },
    '17': { title: 'Haikyuu!!', totalEpisodes: 85, image: '' },
    '18': { title: 'Fairy Tail', totalEpisodes: 328, image: '' },
    '19': { title: 'Code Geass', totalEpisodes: 50, image: '' },
    '20': { title: 'Steins;Gate', totalEpisodes: 24, image: '' },
    '21': { title: 'Re:Zero', totalEpisodes: 50, image: '' },
    '22': { title: 'Mob Psycho 100', totalEpisodes: 37, image: '' },
    '23': { title: 'Vinland Saga', totalEpisodes: 48, image: '' },
    '24': { title: 'Ao Haru Ride', totalEpisodes: 12, image: '' },
    '25': { title: 'Blue Lock', totalEpisodes: 24, image: '' },
    '26': { title: 'Spy x Family', totalEpisodes: 25, image: '' },
    '27': { title: 'Kaguya-Sama: Love is War', totalEpisodes: 37, image: '' },
    '28': { title: 'Your Lie in April', totalEpisodes: 22, image: '' },
    '29': { title: 'Erased', totalEpisodes: 12, image: '' },
    '30': { title: 'The Seven Deadly Sins', totalEpisodes: 96, image: '' },
  };

  const anime = animeData[animeId || '1'];

  if (!anime) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Anime not found</div>
      </div>
    );
  }

  const totalEpisodes = anime.totalEpisodes;
  const episodeNumbers = Array.from({ length: totalEpisodes }, (_, i) => i + 1);

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      {anime.image && (
        <>
          <div className="fixed inset-0" style={{ zIndex: 0 }}>
            <Image 
              src={anime.image}
              alt={anime.title}
              fill
              className="object-cover"
              style={{
                filter: 'blur(15px)',
                transform: 'scale(1.1)'
              }}
              quality={100}
              priority
            />
          </div>
          <div 
            className="fixed inset-0 bg-black/40"
            style={{ zIndex: 1 }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-lg">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/anime')}
              className="text-white hover:text-gray-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Home
            </button>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">TV</span>
            <span className="text-gray-500">/</span>
            <span className="text-white font-semibold">{anime.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          {/* Main Video Section */}
          <div className="space-y-4">
            {/* Video Player */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">▶️</div>
                  <div className="text-xl text-gray-400">Video Player Placeholder</div>
                  <div className="text-sm text-gray-500">Episode {currentEpisode}</div>
                </div>
              </div>
            </div>

            {/* Episode Info */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-2">You are watching Episode {currentEpisode}</h2>
              <p className="text-gray-400 text-sm mb-4">
                If current server doesn't work please switch to other servers.
              </p>

              {/* Server Selection */}
              <div className="flex gap-2 mb-4">
                {['Server 1', 'Server 2', 'AutoNext'].map((server) => (
                  <button
                    key={server}
                    onClick={() => setSelectedServer(server)}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      selectedServer === server
                        ? 'bg-blue-500/80 backdrop-blur-xl text-white border border-white/30 shadow-lg'
                        : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {server}
                  </button>
                ))}
              </div>

              {/* Additional Options */}
              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded text-sm hover:bg-black/60 transition-colors text-white">
                  🔄 AutoPlay
                </button>
                <button className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded text-sm hover:bg-black/60 transition-colors text-white">
                  ⏭️ AutoSkip
                </button>
                <button className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded text-sm hover:bg-black/60 transition-colors text-white">
                  ⏩ Prev
                </button>
                <button className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded text-sm hover:bg-black/60 transition-colors text-white">
                  ⏩ Next
                </button>
                <button className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded text-sm hover:bg-black/60 transition-colors text-white">
                  🔖 Bookmark
                </button>
                <button className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded text-sm hover:bg-black/60 transition-colors text-white">
                  📱 W2G
                </button>
                <button className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded text-sm hover:bg-black/60 transition-colors text-white">
                  ⚙️ Report
                </button>
              </div>
            </div>

            {/* Anime Info Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-lg">
              <div className="flex gap-4">
                {anime.image && (
                  <img 
                    src={anime.image} 
                    alt={anime.title}
                    className="w-32 h-48 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
                  <div className="flex gap-4 text-sm text-gray-400 mb-4">
                    <span>⭐ 8.7/10</span>
                    <span>•</span>
                    <span>Episodes: {totalEpisodes}</span>
                    <span>•</span>
                    <span>Status: Completed</span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Twelve years ago, a colossal demon fox terrorized the world. During the monster's attack on the Hidden Leaf Village, the fourth Hokage sacrificed his life to seal it within a newborn named Naruto Uzumaki.
                  </p>
                  <div className="flex gap-2 text-sm">
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-xl border border-white/25 rounded text-white shadow-sm">Adventure</span>
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-xl border border-white/25 rounded text-white shadow-sm">Action</span>
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-xl border border-white/25 rounded text-white shadow-sm">Shounen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes Sidebar */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 h-fit lg:sticky lg:top-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Episodes</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded hover:bg-black/60 transition-colors text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="p-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded hover:bg-black/60 transition-colors text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Episode Range Selector */}
            <div className="mb-4">
              <select className="w-full bg-white/10 backdrop-blur-xl border border-white/25 rounded px-3 py-2 text-sm text-white shadow-md">
                <option>001-100</option>
                {totalEpisodes > 100 && <option>101-200</option>}
                {totalEpisodes > 200 && <option>201-300</option>}
                {totalEpisodes > 300 && <option>301-400</option>}
                {totalEpisodes > 400 && <option>401-500</option>}
                {totalEpisodes > 500 && <option>501-600</option>}
                {totalEpisodes > 600 && <option>601-700</option>}
                {totalEpisodes > 700 && <option>701-800</option>}
              </select>
            </div>

            {/* Episode Grid */}
            <div className="grid grid-cols-6 gap-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {episodeNumbers.slice(0, 100).map((ep) => (
                <button
                  key={ep}
                  onClick={() => setCurrentEpisode(ep)}
                  className={`aspect-square rounded flex items-center justify-center text-sm font-medium transition-all ${
                    currentEpisode === ep
                      ? 'bg-red-500/80 backdrop-blur-xl text-white ring-2 ring-white/50 shadow-lg'
                      : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 shadow-sm'
                  }`}
                >
                  {ep}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
