import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for themukesh.com regarding content and use of professional tools.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-white">
      <section className="bg-[#111111] p-6 md:p-10 border border-white/10 rounded-3xl shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-400">Disclaimer</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at <strong>contact@themukesh.com</strong>.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Disclaimers for themukesh.com</h2>
          <p>
            All the information on this website - https://themukesh.com - is published in good faith and for general information purpose only. themukesh.com does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (themukesh.com), is strictly at your own risk.
          </p>

          <p>
            From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Professional Tools & Software</h2>
          <p>
            The software utilities and tools (such as API testing clients, image processors, and calculators) provided on themukesh.com are designed for developer convenience. We do not store or monitor the data processed through these tools (unless explicitly stated). However, we are not liable for any security breaches or data leaks that may occur while using third-party APIs through our testers.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Consent</h2>
          <p>
            By using our website, you hereby consent to our disclaimer and agree to its terms.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">Update</h2>
          <p>
            Should we update, amend, or make any changes to this document, those changes will be prominently posted here.
          </p>

          <p className="pt-6 text-xs text-gray-500 italic text-center border-t border-white/5 mt-10">
            Last updated: April 4, 2026
          </p>
        </div>
      </section>
    </main>
  );
}
