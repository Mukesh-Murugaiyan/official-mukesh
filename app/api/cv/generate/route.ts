import { NextRequest, NextResponse } from "next/server";
import { generateCvDocx } from "@/lib/cv/docGenerator";
import { CV } from "@/lib/cv/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cvData: CV = body.cvData || body;

    if (!cvData || !cvData.personal) {
      return NextResponse.json(
        { error: "Invalid CV data payload" },
        { status: 400 }
      );
    }

    const docxBuffer = await generateCvDocx(cvData);

    const safeName = (cvData.personal.fullName || "Resume")
      .trim()
      .replace(/[^a-zA-Z0-9_\-\s]/g, "")
      .replace(/\s+/g, "_");

    const filename = `${safeName}_CV.docx`;

    // Convert Buffer to Uint8Array for NextResponse compatibility
    const uint8Array = new Uint8Array(docxBuffer);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Error generating CV docx:", error);
    return NextResponse.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}
