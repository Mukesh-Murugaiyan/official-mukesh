import { resources } from "@/data/resources";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ResourceDetail({ params }: Props) {
    const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);

  if (!resource) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>

      <p className="text-gray-700 mb-6">{resource.description}</p>

      {/* --- AD PLACE (optional) --- */}
      <div className="my-8 border rounded-lg p-4 text-center text-gray-500">
        🔶 Ad Space
      </div>

      {/* --- PROFILE INFO --- */}
      <div className="border rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-lg">👤 About Me</h3>
        <p className="text-gray-600">
          Mukesh Murugaiyan – Full Stack Developer
        </p>
        <a
          href="https://themukesh.com"
          className="text-blue-600 underline"
        >
          Visit Profile
        </a>
      </div>

      {/* --- DOWNLOAD SECTION --- */}
      <div className="border-t pt-6">
        <a
          href={resource.downloadUrl}
          download
          className="block text-center bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          ⬇️ Download Resource
        </a>
      </div>
    </div>
  );
}
