import Image from 'next/image';
import { useState, useEffect } from 'react';

interface RecipeDetailProps {
  recipeId: number;
  onClose: () => void;
}

interface RecipeData {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  sourceUrl?: string;
  sourceName?: string;
  extendedIngredients: Array<{
    id: number;
    original: string;
  }>;
  analyzedInstructions: Array<{
    steps: Array<{
      number: number;
      step: string;
    }>;
  }>;
}

export default function RecipeDetail({ recipeId, onClose }: RecipeDetailProps) {
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const response = await fetch(`/api/recipe-details?id=${recipeId}`);
        if (!response.ok) throw new Error('Failed to fetch recipe');
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecipeDetails();
  }, [recipeId]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#16a34a]"></div>
            <p className="text-gray-700 font-medium">Loading recipe...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Failed to load recipe</h3>
          <p className="text-gray-600 mb-6">
            Download our app to access full recipes with offline support!
          </p>
          <div className="flex flex-col gap-3">
            <a href="#download" className="bg-[#16a34a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#15803d] transition-colors">
              Download App
            </a>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900 font-medium">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="relative h-64 md:h-80 bg-gray-100">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏱</span>
                <span>{recipe.readyInMinutes} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🍽</span>
                <span>{recipe.servings} servings</span>
              </div>
            </div>

            {/* Source Attribution */}
            {recipe.sourceUrl && (
              <p className="text-sm text-gray-500 mb-6">
                Recipe from{' '}
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#16a34a] underline hover:text-[#15803d]"
                >
                  {recipe.sourceName || 'original source'}
                </a>
              </p>
            )}

            {/* App Download Banner */}
            <div className="bg-gradient-to-r from-[#16a34a] to-[#15803d] rounded-2xl p-6 mb-8 text-white">
              <h3 className="text-lg font-bold mb-2">Want the full experience?</h3>
              <p className="text-white/90 mb-4 text-sm">
                Download our app to save recipes, create shopping lists with Instacart integration, and get step-by-step cooking guidance!
              </p>
              <a
                href="#download"
                className="inline-block bg-white text-[#16a34a] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Download App
              </a>
            </div>

            {/* Summary */}
            {recipe.summary && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">About this recipe</h2>
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                />
              </div>
            )}

            {/* Ingredients */}
            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id} className="flex items-start gap-3">
                      <span className="text-[#16a34a] mt-1.5">•</span>
                      <span className="text-gray-700">{ingredient.original}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructions */}
            {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                <div className="space-y-4">
                  {recipe.analyzedInstructions[0].steps.map((step) => (
                    <div key={step.number} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#16a34a] text-white rounded-full flex items-center justify-center font-semibold">
                        {step.number}
                      </div>
                      <p className="text-gray-700 pt-1">{step.step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer CTA */}
            <div className="border-t pt-6 text-center">
              <p className="text-gray-600 mb-4">
                Enjoying this recipe? Get thousands more in our app!
              </p>
              <a
                href="#download"
                className="inline-block bg-[#16a34a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#15803d] transition-colors"
              >
                Download My Chefsito
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
