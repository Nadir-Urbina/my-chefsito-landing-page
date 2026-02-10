'use client';

import Image from 'next/image';
import { useState } from 'react';
import RecipeDetail from './RecipeDetail';

interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredients: Array<{ name: string }>;
  missedIngredients: Array<{ name: string }>;
  readyInMinutes?: number;
  servings?: number;
  sourceUrl?: string;
}

interface RecipeResultsProps {
  recipes: Recipe[];
  searchType: 'recipe' | 'ingredients';
  onClose: () => void;
}

export default function RecipeResults({ recipes, searchType, onClose }: RecipeResultsProps) {
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  if (recipes.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">No recipes found</h3>
          <p className="text-gray-600 mb-6">
            Try different ingredients or download our app to scan your fridge and get personalized recipe suggestions!
          </p>
          <div className="flex flex-col gap-3">
            <a href="#" className="bg-[#16a34a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#15803d] transition-colors">
              Download App
            </a>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900 font-medium">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Found {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''}!
                </h2>
                <p className="text-gray-600">
                  Want more personalized recipes? Download our app to scan ingredients from pictures!
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="bg-gradient-to-r from-[#16a34a] to-[#15803d] rounded-2xl p-6 mb-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Get the Full Experience</h3>
                  <p className="text-white/90">
                    Scan your fridge, connect to Instacart, and discover thousands of recipes tailored to what you have!
                  </p>
                </div>
                <a
                  href="#download"
                  className="bg-white text-[#16a34a] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Download App
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-[#16a34a] transition-all hover:shadow-lg"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                      {recipe.title}
                    </h3>

                    {(recipe.readyInMinutes || recipe.servings) && (
                      <div className="flex gap-4 mb-3 text-sm text-gray-600">
                        {recipe.readyInMinutes && (
                          <span>⏱ {recipe.readyInMinutes} min</span>
                        )}
                        {recipe.servings && (
                          <span>🍽 {recipe.servings} servings</span>
                        )}
                      </div>
                    )}

                    {searchType === 'ingredients' && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">
                          ✓ Uses {recipe.usedIngredients.length} of your ingredients
                        </p>
                        {recipe.missedIngredients.length > 0 && (
                          <p className="text-sm text-orange-600">
                            Need {recipe.missedIngredients.length} more ingredient{recipe.missedIngredients.length !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedRecipeId(recipe.id)}
                      className="block w-full text-center bg-[#16a34a] text-white py-2 rounded-lg font-medium hover:bg-[#15803d] transition-colors"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipeId && (
        <RecipeDetail
          recipeId={selectedRecipeId}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </div>
  );
}
