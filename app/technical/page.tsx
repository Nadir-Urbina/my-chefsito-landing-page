import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Technical Documentation - My Chefsito',
  description: 'Technical implementation details for My Chefsito, including architecture, API integrations, and platform support.',
};

export default function TechnicalPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            My Chefsito — Technical Documentation
          </h1>
          <div className="h-1 w-20 bg-[#16a34a] rounded mb-12"></div>

          {/* Tech Stack Overview */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tech Stack Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#16a34a] text-white">
                    <th className="px-6 py-3 font-semibold rounded-tl-lg">Layer</th>
                    <th className="px-6 py-3 font-semibold rounded-tr-lg">Technology</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    ['Framework', 'Flutter 3.7.2 / Dart'],
                    ['Authentication', 'Firebase Auth (Email, Google, Apple Sign-In)'],
                    ['Database', 'Cloud Firestore'],
                    ['File Storage', 'Firebase Storage'],
                    ['AI/ML', 'OpenAI GPT-4o, GPT-4o Vision, OpenAI TTS'],
                    ['Recipe Data', 'Spoonacular API'],
                    ['Shopping', 'Instacart Developer Platform API'],
                    ['Video Processing', 'YouTube Explode Dart'],
                    ['Voice', 'speech_to_text (STT), just_audio (TTS playback)'],
                    ['Subscriptions', 'RevenueCat (purchases_flutter)'],
                    ['Email', 'Resend API'],
                    ['State Management', 'Provider + StatefulWidget'],
                  ].map(([layer, tech], i) => (
                    <tr key={layer} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-3 font-medium text-gray-900">{layer}</td>
                      <td className="px-6 py-3">{tech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Architecture */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Architecture</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              My Chefsito follows a <strong className="text-gray-900">service-oriented architecture</strong> with
              feature-based folder organization:
            </p>
            <div className="bg-gray-900 text-gray-100 rounded-2xl p-6 overflow-x-auto font-mono text-sm leading-relaxed mb-6">
              <pre>{`lib/
├── core/
│   ├── models/          # Data models (Recipe, UserPreferences, etc.)
│   ├── services/        # Singleton service classes
│   │   ├── ai_service.dart              # OpenAI GPT-4o & Vision
│   │   ├── voice_service.dart           # TTS + STT orchestration
│   │   ├── spoonacular_service.dart     # Recipe search & discovery
│   │   ├── subscription_service.dart    # RevenueCat integration
│   │   ├── instacart_service.dart       # Shopping integration
│   │   ├── auth_service.dart            # Firebase Authentication
│   │   ├── preferences_service.dart     # Firestore user preferences
│   │   ├── recipe_history_service.dart  # Cooking history tracking
│   │   └── support_service.dart         # Resend email support
│   └── theme/           # Colors, typography
├── features/
│   ├── home/            # Home screen, popular recipes, action cards
│   ├── recipes/         # Search, browse, filter recipes
│   ├── scan/            # Ingredient scanning, recipe results, detail
│   ├── video/           # YouTube URL input, video recipe extraction
│   ├── chat/            # Conversational ingredient input
│   ├── cooking/         # Cooking mode, voice control, timers
│   ├── subscription/    # Paywall screen
│   ├── meal_planning/   # Calendar-based meal scheduling
│   ├── instacart/       # Retailer selection, shopping flow
│   ├── profile/         # Settings, edit profile, help & support
│   └── auth/            # Login, registration, onboarding
└── main.dart            # App entry, Firebase & RevenueCat init`}</pre>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each service is a <strong className="text-gray-900">singleton</strong> initialized at app startup.
              Services communicate through direct method calls — no event bus or complex state management layer.
              This keeps the codebase lean and debuggable for a single-developer project.
            </p>
          </section>

          {/* API Integration Details */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">API Integration Details</h2>

            {/* OpenAI */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">OpenAI (GPT-4o &amp; Vision)</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Used for three distinct features:
              </p>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Ingredient Scanning</strong> — Up to 3 user photos are sent
                  to GPT-4o Vision. The model identifies ingredients and returns structured JSON. These
                  ingredients are then matched against Spoonacular&apos;s recipe database for verified results
                  (hybrid AI approach: AI detection + verified recipes).
                </li>
                <li className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Video Recipe Extraction</strong> — YouTube video transcripts
                  (via youtube_explode_dart) are sent to GPT-4o to extract structured recipe data (name,
                  ingredients, instructions, difficulty, times). When transcripts aren&apos;t available, video
                  thumbnails are analyzed via Vision as a fallback.
                </li>
                <li className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Text-to-Speech</strong> — OpenAI&apos;s <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">tts-1</code> model
                  with the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">nova</code> voice generates audio for cooking step narration.
                  Audio files are cached locally and played through <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">just_audio</code>.
                  A <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">Completer</code>-based approach ensures playback fully completes before
                  speech recognition restarts, preventing audio cutoff.
                </li>
              </ol>
            </div>

            {/* Spoonacular */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Spoonacular</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The verified recipe backbone:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  ['/recipes/findByIngredients', 'Matches recipes based on scanned ingredients'],
                  ['/recipes/complexSearch', 'Keyword and category-based search'],
                  ['/recipes/random', 'Popular recipe discovery by tag'],
                  ['/recipes/informationBulk', 'Full recipe details with nutrition'],
                ].map(([endpoint, desc]) => (
                  <li key={endpoint} className="flex items-start gap-3">
                    <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                    <p className="text-lg text-gray-700">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{endpoint}</code> — {desc}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">
                Results are cached for 55 minutes using <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">shared_preferences</code> to
                minimize API point consumption. Caching is category-aware — each tag/filter combination has its
                own cache entry.
              </p>
            </div>

            {/* Instacart */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Instacart Developer Platform</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Enables one-tap grocery shopping:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  ['/idp/v1/products/products_link', 'Creates a shopping list from recipe ingredients, with option to filter to only missing ingredients'],
                  ['/idp/v1/retailers', 'Finds nearby retailers using device geolocation'],
                ].map(([endpoint, desc]) => (
                  <li key={endpoint} className="flex items-start gap-3">
                    <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                    <p className="text-lg text-gray-700">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{endpoint}</code> — {desc}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">
                The integration uses recipe-page-style links that open directly in the Instacart app or web.
              </p>
            </div>

            {/* Firebase */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Firebase</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Authentication</strong> — Supports email/password, Google
                    Sign-In, and Sign in with Apple. User identity is synced with RevenueCat on login for
                    cross-device entitlement tracking.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Cloud Firestore</strong> — Stores user preferences (dietary
                    restrictions, skill level, household size), meal plans with scheduled reminders, recipe
                    history with ratings, and cooking frequency data. Real-time sync via Firestore streams
                    powers the meal planning calendar.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Firebase Storage</strong> — Handles profile photo uploads.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* RevenueCat Implementation */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">RevenueCat Implementation</h2>

            {/* Initialization */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Initialization</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                RevenueCat is initialized in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">main.dart</code> before
                the app widget tree is built:
              </p>
              <div className="bg-gray-900 text-gray-100 rounded-2xl p-6 overflow-x-auto font-mono text-sm mb-4">
                <pre>{`await SubscriptionService().initialize();`}</pre>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                The <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">SubscriptionService</code> is a singleton that
                wraps the RevenueCat SDK. On initialization, it: (1) Configures RevenueCat with the production
                Apple API key, (2) Fetches initial customer info and checks
                the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">My Chefsito Pro</code> entitlement, and
                (3) Registers a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">CustomerInfoUpdateListener</code> for
                real-time entitlement changes.
              </p>
            </div>

            {/* User Identity Sync */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">User Identity Sync</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                When a Firebase user is detected in
                the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">AuthWrapper</code> stream,
                their Firebase UID is passed to RevenueCat
                via <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">Purchases.logIn()</code>. This ensures
                subscription state follows the user across devices and app reinstalls.
              </p>
            </div>

            {/* Entitlement Model */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Entitlement Model</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#16a34a] text-white">
                      <th className="px-6 py-3 font-semibold rounded-tl-lg">Entitlement</th>
                      <th className="px-6 py-3 font-semibold">Products</th>
                      <th className="px-6 py-3 font-semibold rounded-tr-lg">Trial</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-medium">My Chefsito Pro</td>
                      <td className="px-6 py-4">my_chefsito_pro_monthly ($5.99/mo)</td>
                      <td className="px-6 py-4">7-day free</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">My Chefsito Pro</td>
                      <td className="px-6 py-4">my_chefsito_pro_yearly ($39.99/yr)</td>
                      <td className="px-6 py-4">7-day free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                A single entitlement (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">My Chefsito Pro</code>) gates
                all premium features. Both products grant the same entitlement, so the user experience is
                identical regardless of billing period.
              </p>
            </div>

            {/* Premium Check Flow */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Check Flow</h3>
              <div className="bg-gray-900 text-gray-100 rounded-2xl p-6 overflow-x-auto font-mono text-sm">
                <pre>{`User taps premium feature
  → SubscriptionService().isPremium checked
    → true: navigate to feature
    → false: PaywallScreen.show() presented
      → User subscribes → Purchases.purchasePackage()
        → Success: entitlement granted, navigate to feature
        → Cancel/Fail: return to previous screen`}</pre>
              </div>
            </div>

            {/* Paywall UI */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Paywall UI</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The paywall is a full-screen route (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">PaywallScreen</code>) that:
              </p>
              <ul className="space-y-2">
                {[
                  'Loads offerings dynamically via Purchases.getOfferings()',
                  'Displays the "default" offering\'s Monthly and Annual packages',
                  'Shows real prices from App Store Connect (storeProduct.priceString)',
                  'Highlights yearly savings (44%) with a badge',
                  'Provides a context-aware banner (e.g., "Cooking Mode is a Pro feature")',
                  'Includes Restore Purchases and legal disclaimer',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                    <p className="text-lg text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature Gating Points */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Feature Gating Points</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#16a34a] text-white">
                      <th className="px-6 py-3 font-semibold rounded-tl-lg">Entry Point</th>
                      <th className="px-6 py-3 font-semibold">Screen</th>
                      <th className="px-6 py-3 font-semibold rounded-tr-lg">Gate</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {[
                      ['Home → "Scan Your Ingredients"', 'ScanIngredientsScreen', 'Premium'],
                      ['Home → "Paste a Cooking Video"', 'VideoRecipeScreen', 'Premium'],
                      ['Home → "Chat What You Have"', 'ChatIngredientsScreen', 'Free'],
                      ['Recipe detail → "Start Cooking"', 'CookingModeScreen', 'Premium'],
                      ['Search → browse recipes', 'RecipesScreen', 'Free'],
                    ].map(([entry, screen, gate], i) => (
                      <tr key={entry} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-3">{entry}</td>
                        <td className="px-6 py-3 font-mono text-sm">{screen}</td>
                        <td className="px-6 py-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${gate === 'Premium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                            {gate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Gating is applied at navigation boundaries — when a user taps a premium action, the paywall is
                shown before navigation proceeds. If the user subscribes or already has an active entitlement,
                navigation continues immediately.
              </p>
            </div>
          </section>

          {/* Voice & Conversational Mode */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Voice &amp; Conversational Mode</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">VoiceService</code> orchestrates
              both TTS and STT through a single service:
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">TTS</strong>: OpenAI API generates audio → saved to temp
                  file → played via <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">just_audio</code>.
                  A <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">Completer</code> subscribes to the
                  player&apos;s <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">playerStateStream</code> to block
                  until <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">ProcessingState.completed</code>,
                  preventing the common issue of <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">play()</code> returning
                  before audio finishes.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">STT</strong>: The <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">speech_to_text</code> plugin
                  handles voice recognition. In Conversational Mode, it
                  uses <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">ListenMode.confirmation</code> with a
                  2-second pause timeout for fast command detection.
                </p>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Conversational Mode cycle</h3>
            <div className="bg-gray-900 text-gray-100 rounded-2xl p-6 overflow-x-auto font-mono text-sm mb-4">
              <pre>{`Read step aloud (TTS)
  → Wait 400ms (echo prevention)
    → Start listening (STT)
      → Match partial result against commands
        → "next" / "back" / "repeat" / "stop" / "finish"
          → Execute command → Read next step (loop)`}</pre>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Quick commands are matched against partial speech results (not final results) for near-instant
              response. The STT auto-restarts after each command or
              on <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">error_no_match</code> timeout,
              creating a persistent listening experience.
            </p>
          </section>

          {/* Caching & Performance */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Caching &amp; Performance</h2>
            <ul className="space-y-3">
              {[
                ['Recipe caching', 'Popular and search results cached in shared_preferences with 55-minute TTL, category-aware keys'],
                ['TTS audio', 'Generated audio files cached in the app\'s temp directory'],
                ['Firestore', 'Real-time streams for meal plans; one-time reads with local state for recipe history'],
                ['Image caching', 'Network images use Flutter\'s built-in cache via Image.network'],
              ].map(([label, desc]) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">{label}</strong>: {desc}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Platform Support */}
          <section className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Support</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The app is built for iOS as the primary target (App Store + TestFlight). The Flutter framework
              enables future expansion to Android and web with the same codebase. Platform-specific
              configurations include:
            </p>
            <ul className="space-y-2">
              {[
                'iOS: CocoaPods for native dependencies (Firebase, RevenueCat, speech_to_text)',
                'Microphone and speech recognition permissions (NSMicrophoneUsageDescription, NSSpeechRecognitionUsageDescription)',
                'Camera permissions for ingredient scanning (NSCameraUsageDescription)',
                'Location permissions for Instacart retailer lookup',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#16a34a] mt-1.5 text-lg font-bold">•</span>
                  <p className="text-lg text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
