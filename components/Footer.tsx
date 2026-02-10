export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-10 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-[#16a34a] mb-3">My Chefsito</h3>
            <p className="text-gray-400 leading-relaxed">
              Your Smart cooking assistant for everyday meals.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#16a34a]">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#16a34a]">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#16a34a]">
                  Download
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#16a34a]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#16a34a]">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#16a34a]">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4">Connect</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#16a34a]">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#16a34a]">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#16a34a]">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2026 My Chefsito. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
