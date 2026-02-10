export default function Features() {
  const features = [
    {
      title: "AI Cooking Assistant",
      description: "Chat or speak with My Chefsito instantly.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="#16a34a" strokeWidth="2">
          <path d="M6 10 C6 8 7 7 9 7 L27 7 C29 7 30 8 30 10 L30 22 C30 24 29 25 27 25 L14 25 L8 30 L8 25 C6.5 25 6 24 6 22 Z"/>
          <circle cx="13" cy="16" r="1.5" fill="#16a34a"/>
          <circle cx="18" cy="16" r="1.5" fill="#16a34a"/>
          <circle cx="23" cy="16" r="1.5" fill="#16a34a"/>
        </svg>
      )
    },
    {
      title: "Scan Your Ingredients",
      description: "Turn your fridge into recipes.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="#16a34a" strokeWidth="2">
          <rect x="6" y="10" width="24" height="18" rx="2"/>
          <circle cx="18" cy="19" r="5"/>
          <circle cx="18" cy="19" r="3"/>
          <rect x="26" y="13" width="2" height="2" rx="0.5" fill="#16a34a"/>
          <path d="M12 10 L12 7 L16 7"/>
        </svg>
      )
    },
    {
      title: "Cook From Any Video",
      description: "Paste a video, get the recipe.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="#16a34a" strokeWidth="2">
          <rect x="6" y="12" width="24" height="18" rx="2"/>
          <path d="M6 12 L30 12 L30 8 L6 8 Z"/>
          <path d="M10 8 L10 12"/>
          <path d="M14 8 L14 12"/>
          <path d="M18 8 L18 12"/>
          <path d="M22 8 L22 12"/>
          <path d="M26 8 L26 12"/>
          <path d="M16 18 L16 24 L22 21 Z" fill="#16a34a" stroke="none"/>
        </svg>
      )
    },
    {
      title: "Guided Cooking Mode",
      description: "Step-by-step help while you cook.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#16a34a" strokeWidth="2">
          <circle cx="24" cy="24" r="10"/>
          <path d="M24 14 L24 24 L30 24"/>
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900">
            Why My Chefsito?
          </h2>
          <p className="text-lg text-gray-500">
            Chat or speak with My Chefsito to find meals instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-9 rounded-2xl border border-gray-200 transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[#16a34a]"
            >
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
