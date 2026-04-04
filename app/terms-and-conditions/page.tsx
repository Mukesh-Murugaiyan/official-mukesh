import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using the services and tools provided by themukesh.com.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-white">
      <section className="bg-[#111111] p-6 md:p-10 border border-white/10 rounded-3xl shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-400">Terms and Conditions</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            Welcome to <strong>themukesh.com</strong>. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use themukesh.com if you do not accept all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">License</h2>
          <p>
            Unless otherwise stated, Mukesh Murugaiyan and/or its licensors own the intellectual property rights for all material on themukesh.com. All intellectual property rights are reserved. You may view and/or print pages from https://themukesh.com for your own personal use subject to restrictions set in these terms and conditions.
          </p>

          <h3 className="text-lg font-medium text-white mb-2">You must not:</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Republish material from https://themukesh.com</li>
            <li>Sell, rent, or sub-license material from https://themukesh.com</li>
            <li>Reproduce, duplicate, or copy material from https://themukesh.com</li>
            <li>Redistribute content from themukesh.com (unless content is specifically made for redistribution).</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">User Comments</h2>
          <p>
            This Agreement shall begin on the date hereof. Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material, and data. themukesh.com does not screen, edit, publish, or review Comments prior to their appearance on the website.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Tools and Applications</h2>
          <p>
            The tools provided on this website (including but not limited to API Tester, Image Background Remover, and Password Generator) are provided "as is" without any warranties. We are not responsible for any data loss, system failure, or security issues that may arise from using these tools.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>

          <p className="pt-6 text-xs text-gray-500 italic">
            Last updated: April 4, 2026
          </p>
        </div>
      </section>
    </main>
  );
}
