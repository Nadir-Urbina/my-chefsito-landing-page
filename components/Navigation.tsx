import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-[#16a34a] px-10 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/images/My Chefsito App logo.png"
            alt="My Chefsito Logo"
            width={200}
            height={60}
            className="h-14 w-auto"
            priority
          />
        </Link>
      </div>

      <ul className="hidden md:flex gap-8 list-none">
        <li>
          <a href="/#features" className="text-white font-medium transition-colors hover:text-gray-200">
            Features
          </a>
        </li>
        <li>
          <a href="/#recipes" className="text-white font-medium transition-colors hover:text-gray-200">
            Recipes
          </a>
        </li>
        <li>
          <a href="/#about" className="text-white font-medium transition-colors hover:text-gray-200">
            About
          </a>
        </li>
        <li>
          <Link href="/docs" className="text-white font-medium transition-colors hover:text-gray-200">
            Docs
          </Link>
        </li>
      </ul>

      <a
        href="#download"
        className="bg-white text-[#16a34a] px-6 py-3 rounded-xl font-semibold transition-colors hover:bg-gray-100"
      >
        Download App
      </a>
    </nav>
  );
}
