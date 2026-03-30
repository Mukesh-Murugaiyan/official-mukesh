import type { Metadata } from "next";
import ApiTesterClient from "./ApiTesterClient";

export const metadata: Metadata = {
  title: "Online API Tester | Send HTTP Requests & Test REST APIs",
  description: "A powerful, free online API testing tool. Easily send GET, POST, PUT, PATCH, and DELETE requests. Configure custom HTTP headers, query parameters, and request bodies (JSON, Form Data, URL Encoded). Analyze detailed responses and debugging logs in real-time directly from your browser.",
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
    "API client web",
    "Mukesh api tester",
    "Mukesh API tester",
    "mukesh api tester"
  ],
  authors: [{ name: "Mukesh Murugaiyan", url: "https://themukesh.com" }],
  creator: "Mukesh Murugaiyan",
  publisher: "Mukesh Murugaiyan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Online API Tester | Send HTTP Requests & Test REST APIs",
    description: "Easily send GET, POST, PUT, PATCH, and DELETE requests, configure custom HTTP headers, and analyze detailed JSON API responses in real-time.",
    url: "https://themukesh.com/tools/api-tester",
    type: "website",
    siteName: "Mukesh Murugaiyan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online API Tester | Advanced HTTP Request Client",
    description: "Easily send GET, POST, PUT, PATCH, and DELETE requests, configure custom HTTP headers, and analyze detailed JSON API responses in real-time.",
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
    "description": "A powerful, free online API testing tool. Easily send GET, POST, PUT, PATCH, and DELETE requests. Configure custom HTTP headers, query parameters, and request bodies (JSON, Form Data, URL Encoded). Analyze detailed responses and debugging logs in real-time directly from your browser.",
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
