// app/pdf-download/page.tsx
import Image from 'next/image';
import { FaDownload, FaGithub, FaHeart, FaInstagram, FaLinkedin, FaStar, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const PdfDownloadPage = () => {
  const userProfile = {
    name: "<Mukesh Murugaiyan>",
    title: " Full Stack Software Engineer",
    bio: "I build Web, Android, iOS & Desktop applications with modern tech stacks.",
    email: "contact@themukesh.com",
    location: "San Francisco, CA"
  };

  const socialLinks = [
    { icon: <FaGithub />, label: "GitHub", url: "https://github.com/Mukesh-Murugaiyan", color: "text-gray-800" },
    { icon: <FaInstagram />, label: "Instagram", url: "https://www.instagram.com/rtr_mukesh_/", color: "text-pink-600" },
    { icon: <FaLinkedin />, label: "LinkedIn", url: "https://www.linkedin.com/in/mukesh-murugaiyan", color: "text-blue-700" },
    { icon: <FaTwitter />, label: "Twitter", url: "https://twitter.com/username", color: "text-blue-400" },
  ];

  const pdfDetails = {
    title: "Complete Guide to Modern Web Development",
    description: "A comprehensive guide covering React, Next.js, Tailwind CSS, and best practices for 2024.",
    size: "4.2 MB",
    pages: 42,  
    downloads: 1247,
    rating: 4.8
  };

  const moreLinks = [
    { title: "My Portfolio Website", url: "https://themukesh.com", desc: "Check out my other projects" },
    { title: "Technical Blog", url: "#", desc: "Read my latest articles" },
    { title: "YouTube Channel", url: "#", desc: "Watch coding tutorials" },
    { title: "Free Resources", url: "#", desc: "Download more free content" },
    { title: "Contact Me", url: "https://themukesh.com", desc: "For collaborations and queries" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Mukesh Murugaiyan
            </h1>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition">
              Upload PDF
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Image
                        src="/icon1.png"
                        alt="Profile"
                        width={128}
                        height={128}
                        className="rounded-full"
                        loading='lazy'
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{userProfile.name}</h2>
                <p className="text-gray-600 mt-1">{userProfile.title}</p>
                <p className="text-gray-500 text-sm mt-3">{userProfile.bio}</p>
                
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <MdEmail />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <MdLocationOn />
                    <span>{userProfile.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className={`flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg ${link.color} transition-all hover:scale-105`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{pdfDetails.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{pdfDetails.downloads}</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{pdfDetails.pages}</div>
                  <div className="text-sm text-gray-600">Pages</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:w-2/3">
            {/* PDF Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{pdfDetails.title}</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-gray-500">{pdfDetails.size}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{pdfDetails.pages} pages</span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      {pdfDetails.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-red-500">
                  <FaHeart />
                  <span className="font-medium">324</span>
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                {pdfDetails.description} This guide includes practical examples, code snippets, and real-world applications to help you master modern web development.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Next.js', 'React', 'Tailwind CSS', 'Web Development', 'TypeScript', 'Best Practices'].map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Preview Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-dashed border-gray-300">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6 text-gray-500">
                    This is a preview of the PDF content
                  </div>
                </div>
              </div>

              {/* Ad Space */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-6 text-center">
                  <div className="text-white font-bold text-xl mb-2">Upgrade to Premium</div>
                  <p className="text-white/90 mb-4">Get access to all premium content without ads!</p>
                  <button className="px-6 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                    Learn More
                  </button>
                </div>
              </div>

              {/* More Links Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">More from {userProfile.name}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {moreLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="group p-4 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all hover:scale-[1.02]"
                    >
                      <div className="font-semibold text-gray-800 group-hover:text-blue-600 mb-1">
                        {link.title}
                      </div>
                      <div className="text-sm text-gray-600">{link.desc}</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Download Button */}
              <div className="text-center">
                <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-green-200 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-center gap-3">
                    <FaDownload className="group-hover:animate-bounce" />
                    <span>Download PDF ({pdfDetails.size})</span>
                  </div>
                  <div className="text-sm font-normal mt-1 opacity-90">
                    Free • No registration required
                  </div>
                </button>
                <p className="text-gray-500 text-sm mt-3">
                  Downloaded by {pdfDetails.downloads.toLocaleString()} users worldwide
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm">
              <p>© 2024 WonderFull. All rights reserved.</p>
              <p className="mt-1">
                This content is shared under{' '}
                <a href="#" className="text-blue-600 hover:underline">Creative Commons License</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PdfDownloadPage;