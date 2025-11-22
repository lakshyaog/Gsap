'use client';

import VantaClouds from '../components/VantaClouds';

export default function Main() {
  return (
    <div className="relative min-h-screen">
      {/* Vanta Clouds Background */}
      <VantaClouds />

      {/* Content */}
      <div className="relative pointer-events-auto" style={{ zIndex: 10 }}>
        {/* Navigation */}
        <nav className="p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-black font-[Bungee]">ANIXYA</h1>
            <div className="flex gap-6">
              <a href="#" className="text-black hover:text-gray-700 transition-colors">Home</a>
              <a href="#" className="text-black hover:text-gray-700 transition-colors">Anime</a>
              <a href="#" className="text-black hover:text-gray-700 transition-colors">Community</a>
              <a href="#" className="text-black hover:text-gray-700 transition-colors">About</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h2 className="text-6xl font-bold mb-6 text-black font-[Bungee]">
              The place where otakus belong.
            </h2>
            <p className="text-xl text-black mb-8">
              Discover, watch, and discuss your favorite anime with fellow enthusiasts
            </p>
            <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105">
              Explore Now
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 p-8 rounded-xl border border-black/20 hover:border-black transition-all">
              <h3 className="text-2xl font-bold mb-4 text-black font-[Bungee]">Latest Releases</h3>
              <p className="text-black">Stay updated with the newest anime releases and episodes</p>
            </div>
            <div className="bg-white/80 p-8 rounded-xl border border-black/20 hover:border-black transition-all">
              <h3 className="text-2xl font-bold mb-4 text-black font-[Bungee]">Community</h3>
              <p className="text-black">Connect with fellow otakus and share your passion</p>
            </div>
            <div className="bg-white/80 p-8 rounded-xl border border-black/20 hover:border-black transition-all">
              <h3 className="text-2xl font-bold mb-4 text-black font-[Bungee]">Recommendations</h3>
              <p className="text-black">Get personalized anime suggestions based on your taste</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
