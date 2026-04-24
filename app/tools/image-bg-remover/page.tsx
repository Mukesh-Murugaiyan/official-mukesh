import { Metadata } from "next";
import ImageBGRemover from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "AI Background Remover - Remove Image BG Instantly",
  description: "Instantly remove backgrounds from any image 100% locally in your browser. Our free AI background remover tool is fast, private, and requires no registration.",
  keywords: [
    ...SEO_KEYWORDS,
    "image background remover",
    "remove bg",
    "transparent background maker",
    "ai photo editor",
    "free background removal",
    "local AI background removal",
    "private image editor",
    "png cutout maker"
  ],
  authors: [{ name: "Mukesh" }],
  creator: "Mukesh",
  publisher: "Mukesh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://themukesh.com/tools/image-bg-remover",
  },
  openGraph: {
    title: "AI Background Remover - Remove Image BG Instantly",
    description: "Instantly remove backgrounds from any image 100% locally in your browser. Our free AI background remover tool is fast, private, and requires no registration.",
    url: "https://themukesh.com/tools/image-bg-remover",
    siteName: "TheMukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg2-optimized.webp",
        width: 1200,
        height: 630,
        alt: "AI Image Background Remover Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Background Remover - Remove Image BG Instantly",
    description: "Instantly remove backgrounds from any image 100% locally in your browser.",
    images: ["https://themukesh.com/mukesh-mg2-optimized.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Page = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Background Remover",
    "url": "https://themukesh.com/tools/image-bg-remover",
    "description": "Instantly remove backgrounds from any image 100% locally in your browser. Our free AI background remover tool is fast, private, and requires no registration.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Mukesh",
      "url": "https://themukesh.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImageBGRemover />

      <main className="max-w-5xl mx-auto px-4 py-20 text-gray-300 antialiased font-sans">
        
        {/* Author & E-E-A-T Signal */}
        <div className="flex items-center gap-4 mb-12 p-4 bg-[#111111] border border-gray-800 rounded-2xl w-fit">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-cyan-900 border border-cyan-500/30 flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-lg">M</span>
          </div>
          <div>
            <p className="text-white font-semibold">Written by Mukesh</p>
            <p className="text-gray-400 text-sm"> Full Stack Software Engineer & AI Engineer</p>
          </div>
        </div>

        <article className="prose prose-invert prose-cyan max-w-none space-y-8">
          <h2 className="text-3xl font-bold text-white mb-6">How Client-Side Image Background Removal Actually Works</h2>
          <p className="leading-relaxed text-lg">
            Removing backgrounds from images used to require heavy cloud servers and expensive APIs. You would upload your personal photo to a remote server, wait for a Python backend to process it via PyTorch, and then download the returning image. Not only is this method slow, but it also raises massive privacy concerns. When building this Background Remover, my primary goal was completely changing that workflow by shifting the heavy lifting directly to your device via Neural Networks running in the browser.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Total Privacy Through Edge Computing</h3>
          <p className="leading-relaxed">
            One of the biggest concerns with typical online image editors is data privacy. What happens to your photo once it is uploaded? With my tool, the answer is simple: your image never leaves your computer. 
          </p>
          <p className="leading-relaxed">
            By utilizing advanced WebAssembly (Wasm) and WebGL hooks, the machine learning models are downloaded to your browser's local cache. The entire segmentation process happens on your local CPU or GPU. This completely eliminates server communication latency and ensures that sensitive documents or personal photographs remain 100% confidential. It's an approach that modern web architecture perfectly enables.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Behind The Scenes: The Neural Architecture</h3>
          <p className="leading-relaxed">
            From a technical standpoint, this application uses a specialized segmentation model inspired by the U-Net architecture, optimized through ONNX runtime for the Web. 
          </p>
          <p className="leading-relaxed">
            The process undergoes three distinct phases when you drop an image here:
          </p>
          <ul className="list-disc pl-6 space-y-3 mt-4 text-gray-300">
            <li>
              <strong>Downsampling & Pre-processing:</strong> Before feeding the image to the neural network, the browser compresses and resizes the image tensor into a standardized tensor (often 320x320 or 1024x1024) to ensure rapid inference.
            </li>
            <li>
              <strong>Latent Space Inference:</strong> The WebAssembly-backed ONNX runner computes a deep spatial understanding of the image. The model is specifically fine-tuned for salient object detection (identifying the most prominent foreground figure) and accurately drawing a mask map.
            </li>
            <li>
              <strong>Alpha-Blending & Post-processing:</strong> The generated mask is often scaled back to the original high-resolution size. The edges are anti-aliased, and the mask is applied to the alpha channel of your original source image.
            </li>
          </ul>

          <p className="leading-relaxed mt-6">
            Even though the model executes locally, thanks to hardware acceleration options natively available in modern browsers, inference time sits incredibly low—often completing a 12-megapixel picture processing in under two seconds.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Practical Use Cases for Developers & Designers</h3>
          <p className="leading-relaxed">
            The need for instant background removal extends beyond just creating memes. As a developer, I regularly need transparent PNGs to quickly prototype user interfaces without firing up heavy software like Photoshop.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
              <h4 className="text-xl text-white font-medium mb-2">E-Commerce Listings</h4>
              <p className="text-gray-400 text-sm">Producing clean, white-labeled product photos with minimal distractions. Transparent backgrounds allow easy overlay over storefront brand colors.</p>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
              <h4 className="text-xl text-white font-medium mb-2">Profile Avatars</h4>
              <p className="text-gray-400 text-sm">Removing cluttered office backgrounds from headshots for Slack, LinkedIn, or personal portfolio avatars. Ensures uniform styling.</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Tips For Getting The Best Results</h3>
          <p className="leading-relaxed">
            Although the AI is highly robust, you can maximize accuracy by ensuring significant contrast between the foreground subject and the background. Uniform lighting without harsh shadows across the edge boundaries produces the cleanest alpha maps. Avoid images where the subject's clothing is the exact same color and texture as the background wall.
          </p>
          
          <p className="leading-relaxed mt-8 pb-10">
            Building specialized, frictionless web tools like this is an incredible exercise in bridging machine learning and frontend engineering. The web platform is extremely capable today, and edge-native AI is definitely the future of accessible software. Feel free to bookmark this page and use it whenever you need to strip away a background quickly offline!
          </p>
        </article>
      </main>
    </>
  );
};

export default Page;
