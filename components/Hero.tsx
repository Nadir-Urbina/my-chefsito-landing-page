'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import RecipeResults from './RecipeResults';

export default function Hero() {
  const [placeholder, setPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchType, setSearchType] = useState<'recipe' | 'ingredients'>('ingredients');
  const [showHint, setShowHint] = useState(false);

  const phrases = [
    "chicken, rice, garlic...",
    "pasta carbonara",
    "tomatoes, basil, mozzarella...",
    "chocolate cake",
    "salmon, lemon, asparagus...",
    "pad thai",
    "eggs, cheese, spinach..."
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        setPlaceholder(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setPlaceholder(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/search-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: searchInput }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setRecipes(data.recipes);
      setSearchType(data.searchType);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowHint(e.target.value.length > 0);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/my chefsito Hero img.png"
          alt="My Chefsito Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 py-20 w-full">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            Cook with <span className="text-[#16a34a]">confidence</span>, starting with what you have.
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Your Smart cooking assistant for everyday meals.
          </p>

          {/* Hint message */}
          <div className={`transition-all duration-300 ${showHint ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 h-0 overflow-hidden'}`}>
            <div className="bg-[#16a34a]/10 border-2 border-[#16a34a]/30 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-[#16a34a] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"/>
              </svg>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-[#16a34a]">Pro tip:</strong> Search by recipe name or ingredients! In our app, you can also scan ingredients from pictures, automatically connect to Instacart to buy missing items, and get personalized recipes. Give it a try!
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch}>
            <div className="bg-white/90 backdrop-blur-md border-2 border-gray-300 rounded-2xl p-2 flex items-center gap-3 focus-within:border-[#16a34a] transition-colors shadow-lg">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#9ca3af" strokeWidth="2" className="ml-3">
                <circle cx="9" cy="9" r="6"/>
                <path d="M14 14 L18 18"/>
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none text-base py-3 text-gray-900 placeholder:text-gray-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !searchInput.trim()}
                className="bg-[#16a34a] text-white px-7 py-3.5 rounded-xl font-semibold transition-colors hover:bg-[#15803d] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#" className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl transition-transform hover:-translate-y-1 shadow-lg">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-xs opacity-80">Download on the</span>
                <span className="text-base font-semibold">App Store</span>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl transition-transform hover:-translate-y-1 shadow-lg">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-xs opacity-80">GET IT ON</span>
                <span className="text-base font-semibold">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Recipe Results Modal */}
      {showResults && (
        <RecipeResults
          recipes={recipes}
          searchType={searchType}
          onClose={() => {
            setShowResults(false);
            setSearchInput('');
            setShowHint(false);
          }}
        />
      )}
    </section>
  );
}
