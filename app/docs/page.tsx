import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Written Proposal - My Chefsito',
  description: 'Technical documentation and written proposal for My Chefsito, your AI-powered cooking companion.',
};

export default function DocsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            My Chefsito — Written Proposal
          </h1>
          <div className="h-1 w-20 bg-[#16a34a] rounded mb-12"></div>

          {/* The Problem */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Cooking at home should be simple, but the reality is fragmented and frustrating. Home
              cooks face a daily cycle of disconnected steps: figuring out what to make with what they
              have, finding trustworthy recipes, following complex instructions while their hands are
              covered in food, and then scrambling to buy missing ingredients. Existing recipe apps
              solve one piece but not the whole journey. They don&apos;t know what&apos;s in your kitchen, they
              can&apos;t guide you hands-free, and they leave you on your own when it comes to shopping.
              The result? People default to takeout, wasting both the food in their fridge and money
              in their wallet.
            </p>
          </section>

          {/* Target Audience */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Target Audience</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              My Chefsito targets three overlapping groups:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Everyday home cooks</strong> who want to reduce
                  food waste by cooking with what they already have, rather than buying new ingredients
                  for every recipe.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Beginner and intermediate cooks</strong> who feel
                  intimidated by complex recipes and want step-by-step guidance that feels like having
                  a friend in the kitchen.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Busy professionals and parents</strong> who need a
                  fast, hands-free cooking experience — from deciding what to cook to getting groceries
                  delivered in one tap.
                </p>
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              The common thread is people who <em>want</em> to cook more but face friction at every
              stage. My Chefsito removes that friction end-to-end.
            </p>
          </section>

          {/* The Solution */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Solution</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              My Chefsito is an AI-powered cooking companion that covers the full cooking journey —
              from ingredient discovery to plating.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Start with what you have.</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Users snap a photo of their fridge or pantry, and GPT-4o Vision identifies their
                  ingredients. The app then matches those ingredients against Spoonacular&apos;s verified
                  recipe database, showing match percentages and highlighting what&apos;s missing. No more
                  guessing what to cook.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Or start from anywhere.</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Users can also search recipes by keyword, browse popular dishes by category, paste a
                  YouTube cooking video URL to extract a full recipe, or simply chat about what they
                  have and get suggestions conversationally.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cook with confidence.</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Cooking Mode provides a full-screen, step-by-step experience with large text,
                  progress tracking, and built-in timers. Conversational Mode takes it further — the
                  app reads each step aloud using OpenAI&apos;s natural TTS voice, then listens for voice
                  commands like &ldquo;next,&rdquo; &ldquo;back,&rdquo; or &ldquo;repeat.&rdquo; The cook never needs to touch their
                  phone.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Shop what you&apos;re missing.</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  For any recipe, one tap sends the missing ingredients directly to Instacart with a
                  nearby retailer pre-selected, closing the loop from &ldquo;what should I cook?&rdquo; to
                  &ldquo;ingredients on the way.&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* Monetization Strategy */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Monetization Strategy</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              My Chefsito uses a <strong className="text-gray-900">freemium subscription model</strong> powered
              by RevenueCat.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Free tier</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Recipe search, browsing, and chat-based ingredient suggestions are free with no caps.
              This lets users experience the app&apos;s core value and build a habit before hitting any
              paywall.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Chefsito Pro</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              All AI-powered and premium features are gated behind a subscription:
            </p>

            {/* Pricing Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#16a34a] text-white">
                    <th className="px-6 py-3 font-semibold rounded-tl-lg">Plan</th>
                    <th className="px-6 py-3 font-semibold">Price</th>
                    <th className="px-6 py-3 font-semibold rounded-tr-lg">Trial</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">Monthly</td>
                    <td className="px-6 py-4">$5.99/month</td>
                    <td className="px-6 py-4">7-day free trial</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Yearly</td>
                    <td className="px-6 py-4">$39.99/year ($3.33/mo)</td>
                    <td className="px-6 py-4">7-day free trial</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Premium features include: AI ingredient scanning, video recipe extraction, cooking mode
              with voice control, conversational mode, AI-generated instructions, and Instacart
              shopping integration.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Why this pricing works.</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Comparable cooking apps (Mealime, SideChef, Paprika) charge $4.99–$9.99/month. At
              $5.99/month, My Chefsito is competitively positioned while covering estimated per-user
              API costs of $0.30–$1.50/month (OpenAI Vision, TTS, and Spoonacular). The yearly plan
              at $39.99 (44% savings) incentivizes long-term retention. The 7-day free trial lets
              users experience the full premium flow — especially cooking mode — before committing.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Revenue pathway.</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              The free tier drives organic acquisition and App Store discovery. The paywall is
              presented contextually (when users try a premium feature) rather than aggressively,
              creating a natural upgrade moment tied to intent. RevenueCat handles subscription
              lifecycle, entitlement checks, and cross-device sync through Firebase user identity
              integration.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
