import type { Metadata } from "next";
import ApiTesterClient from "./ApiTesterClient";

export const metadata: Metadata = {
  title: "Online API Tester - Advanced HTTP Request Client",
  description: "Send GET, POST, PUT, and DELETE requests online. Configure custom headers, body data, and analyze API responses with our free, powerful online API testing tool.",
  keywords: [
    "API tester",
    "online API client",
    "Postman alternative online",
    "free Postman alternative",
    "HTTP request tester",
    "REST API testing tool",
    "webhook tester",
    "developer tools",
    "API debugging",
    "JSON formatter",
    "send HTTP requests online",
    "test REST APIs",
    "GraphQL tester online",
    "API mock test",
    "online cURL alternative",
    "API client web"
  ],
  authors: [{ name: "Mukesh Murugaiyan", url: "https://themukesh.com" }],
  creator: "Mukesh Murugaiyan",
  publisher: "Mukesh Murugaiyan",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Online API Tester - Advanced HTTP Request Client",
    description: "Send GET, POST, PUT, and DELETE requests online. Configure custom headers, body data, and analyze API responses with our free, powerful online API testing tool.",
    url: "https://themukesh.com/tools/api-tester",
    type: "website",
    siteName: "Mukesh Murugaiyan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online API Tester - Advanced HTTP Request Client",
    description: "Send GET, POST, PUT, and DELETE requests online.",
  },
  alternates: {
    canonical: "https://themukesh.com/tools/api-tester",
  },
};

export default function ApiTesterServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Online API Tester",
    "url": "https://themukesh.com/tools/api-tester",
    "description": "Send GET, POST, PUT, and DELETE requests online. Configure custom headers, body data, and analyze API responses with our free, powerful online API testing tool.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Mukesh Murugaiyan",
      "url": "https://themukesh.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApiTesterClient />
    </>
  );
}
