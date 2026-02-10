import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients || typeof ingredients !== 'string') {
      return NextResponse.json(
        { error: 'Invalid search query provided' },
        { status: 400 }
      );
    }

    // Step 1: Use OpenAI to determine search type and parse query
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a cooking assistant that determines search intent. Analyze the user's query and respond with ONLY a JSON object in this format:
{
  "searchType": "recipe" or "ingredients",
  "parsed": "cleaned query or comma-separated ingredients"
}

If the user is searching for a specific dish name (like "pasta carbonara", "chocolate cake", "pad thai"), set searchType to "recipe" and parsed to the cleaned recipe name.
If the user lists ingredients (like "chicken, rice, garlic" or "tomatoes basil"), set searchType to "ingredients" and parsed to comma-separated clean ingredient names.`,
          },
          {
            role: 'user',
            content: `Analyze this search query: ${ingredients}`,
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API request failed');
    }

    const openaiData = await openaiResponse.json();
    const aiResponse = JSON.parse(openaiData.choices[0].message.content.trim());
    const { searchType, parsed } = aiResponse;

    let recipes;

    // Step 2: Search using appropriate Spoonacular endpoint
    if (searchType === 'recipe') {
      // Search by recipe name
      const spoonacularUrl = new URL('https://api.spoonacular.com/recipes/complexSearch');
      spoonacularUrl.searchParams.append('apiKey', process.env.SPOONACULAR_API_KEY || '');
      spoonacularUrl.searchParams.append('query', parsed);
      spoonacularUrl.searchParams.append('number', '6');
      spoonacularUrl.searchParams.append('addRecipeInformation', 'true');
      spoonacularUrl.searchParams.append('fillIngredients', 'true');

      const spoonacularResponse = await fetch(spoonacularUrl.toString());

      if (!spoonacularResponse.ok) {
        throw new Error('Spoonacular API request failed');
      }

      const data = await spoonacularResponse.json();
      recipes = data.results.map((recipe: any) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        sourceUrl: recipe.sourceUrl,
        usedIngredients: recipe.extendedIngredients?.slice(0, 5).map((ing: any) => ({ name: ing.name })) || [],
        missedIngredients: [],
      }));
    } else {
      // Search by ingredients
      const spoonacularUrl = new URL('https://api.spoonacular.com/recipes/findByIngredients');
      spoonacularUrl.searchParams.append('apiKey', process.env.SPOONACULAR_API_KEY || '');
      spoonacularUrl.searchParams.append('ingredients', parsed);
      spoonacularUrl.searchParams.append('number', '6');
      spoonacularUrl.searchParams.append('ranking', '2'); // Maximize used ingredients
      spoonacularUrl.searchParams.append('ignorePantry', 'true');

      const spoonacularResponse = await fetch(spoonacularUrl.toString());

      if (!spoonacularResponse.ok) {
        throw new Error('Spoonacular API request failed');
      }

      const recipeResults = await spoonacularResponse.json();

      // Step 3: Get detailed recipe information for ingredient-based search
      recipes = await Promise.all(
        recipeResults.slice(0, 6).map(async (recipe: any) => {
          const detailUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;
          const detailResponse = await fetch(detailUrl);

          if (detailResponse.ok) {
            const details = await detailResponse.json();
            return {
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
              usedIngredients: recipe.usedIngredients,
              missedIngredients: recipe.missedIngredients,
              readyInMinutes: details.readyInMinutes,
              servings: details.servings,
              sourceUrl: details.sourceUrl,
            };
          }

          return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            usedIngredients: recipe.usedIngredients,
            missedIngredients: recipe.missedIngredients,
          };
        })
      );
    }

    return NextResponse.json({
      success: true,
      searchType,
      parsed,
      recipes,
    });

  } catch (error) {
    console.error('Recipe search error:', error);
    return NextResponse.json(
      { error: 'Failed to search recipes' },
      { status: 500 }
    );
  }
}
