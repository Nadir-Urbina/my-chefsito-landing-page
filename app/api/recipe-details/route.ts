import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const recipeId = searchParams.get('id');

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    // Fetch full recipe details from Spoonacular
    const spoonacularUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=false`;

    const response = await fetch(spoonacularUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch recipe details from Spoonacular');
    }

    const recipeData = await response.json();

    return NextResponse.json({
      id: recipeData.id,
      title: recipeData.title,
      image: recipeData.image,
      readyInMinutes: recipeData.readyInMinutes,
      servings: recipeData.servings,
      summary: recipeData.summary,
      sourceUrl: recipeData.sourceUrl,
      sourceName: recipeData.sourceName,
      extendedIngredients: recipeData.extendedIngredients,
      analyzedInstructions: recipeData.analyzedInstructions,
    });

  } catch (error) {
    console.error('Recipe details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipe details' },
      { status: 500 }
    );
  }
}
