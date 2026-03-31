import {
  MdPassword,
  MdGridOn,
  MdPublic,
  MdPhotoCamera,
  MdImage,
  MdPhoneIphone,
  MdCrop,
  MdHttp,
  MdExtension,
  MdCode,
} from "react-icons/md";
import { BiBook } from "react-icons/bi";

export const tools = [
  // Web Tools
  {
    title: "Online API Tester",
    description:
      "A powerful tool to send HTTP requests, build custom headers/body payload, and inspect detailed JSON responses in real-time.",
    url: "/tools/api-tester",
    icon: MdHttp,
    gradient: "from-blue-500 to-teal-400",
    category: "web",
  },
  {
    title: "Grid Generator",
    description:
      "Generate responsive CSS grid layouts visually for modern web designs.",
    url: "/tools/grid-generator",
    icon: MdGridOn,
    gradient: "from-blue-400 to-indigo-500",
    category: "web",
  },
  {
    title: "App Icon Generator",
    description:
      "Create Xcode-ready iOS AppIcon.appiconset, Android adaptive icons, and Web manifests instantly.",
    url: "/tools/app-icon-generator",
    icon: MdPhoneIphone,
    gradient: "from-indigo-400 to-purple-500",
    category: "web",
  },
  {
    title: "Image Cropper",
    description:
      "Easily crop and resize your images with custom aspect ratios, perfect for social media or specific project requirements.",
    url: "/tools/image-cropper",
    icon: MdCrop,
    gradient: "from-cyan-400 to-blue-500",
    category: "web",
  },
  {
    title: "AI Image Background Remover",
    description:
      "Instantly remove backgrounds from your images for free using our client-side AI tool. Processing is 100% private.",
    url: "/tools/image-bg-remover",
    icon: MdImage,
    gradient: "from-purple-400 to-indigo-500",
    category: "web",
  },
  {
    title: "Password Generator",
    description:
      "Create strong, secure passwords with custom length and character rules.",
    url: "/tools/password-generator",
    icon: MdPassword,
    gradient: "from-green-400 to-emerald-500",
    category: "web",
  },
  {
    title: "World Gallery",
    description:
      "Discover a curated collection of stunning global photography and cultural stories.",
    url: "https://photos.themukesh.com/",
    icon: MdPublic,
    gradient: "from-pink-400 to-purple-500",
    category: "web",
  },
  {
    title: "Free Online Book Library",
    description:
      "Explore a massive online library with 77,786+ books across multiple categories. Read, search, and access books instantly from anywhere.",
    url: "https://books.themukesh.com/",
    icon: BiBook,
    gradient: "from-orange-400 to-red-500",
    category: "web",
  },
  {
    title: "Instagram Downloader",
    description:
      "Fast and easy way to download Instagram Reels, Stories, and Posts in high quality. No login required.",
    url: "/tools/instagram-downloader",
    icon: MdPhotoCamera,
    gradient: "from-pink-500 to-orange-400",
    category: "web",
  },
  {
    title: "Pinterest Downloader",
    description:
      "Instantly download Pinterest Videos and Images in high quality for free. Fast, secure, and no login required.",
    url: "/tools/pinterest-downloader",
    icon: MdImage,
    gradient: "from-red-500 to-pink-500",
    category: "web",
  },
  {
    title: "Kotlin Formatter (Mark Place)",
    description:
      "A highly professional and clean code formatter for Kotlin developers. Format on save with customized styles.",
    url: "https://marketplace.visualstudio.com/", // Placeholder
    icon: MdCode,
    gradient: "from-blue-600 to-cyan-500",
    category: "vscode",
  },
  {
    title: "Kotlin Formatter (OpenVSX)",
    description:
      "A highly professional and clean code formatter for Kotlin developers. Format on save with customized styles.",
    url: "https://open-vsx.org/extension/Mukeshm/mukesh-kotlin-formatter",
    icon: MdCode,
    gradient: "from-blue-600 to-cyan-500",
    category: "vscode",
  },
  {
    title: "Mukesh SEO Assistant",
    description:
      "Analyze SEO metrics, check headers, and validate meta tags of any web page with one click right from your browser.",
    url: "https://chrome.google.com/webstore", 
    icon: MdExtension,
    gradient: "from-yellow-400 to-orange-500",
    category: "chrome",
  },
];
