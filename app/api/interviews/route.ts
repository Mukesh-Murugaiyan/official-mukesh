import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const position = searchParams.get("position")?.trim() || "";
    const round = searchParams.get("round")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";

    // Build Prisma where conditions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      deletedAt: null,
    };

    if (position && position !== "all") {
      where.position = { equals: position, mode: "insensitive" };
    }

    if (round && round !== "all") {
      where.round = { equals: round, mode: "insensitive" };
    }

    if (status && status !== "all") {
      where.status = { equals: status, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { candidateName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { position: { contains: search, mode: "insensitive" } },
      ];
    }

    const interviews = await prisma.interview.findMany({
      where,
      include: {
        rounds: {
          orderBy: {
            roundNumber: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: interviews,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch interviews";
    console.error("GET /api/interviews error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { candidateName, position, phone, email, round, status, notes } = body;

    if (!candidateName?.trim() || !position?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Candidate name, position, phone number, and email are required" },
        { status: 400 }
      );
    }

    const currentRound = round?.trim() || "Round 1";
    const currentStatus = status?.trim() || "Pending";

    // Determine round number from round name, e.g. "Round 1" -> 1
    const match = currentRound.match(/\d+/);
    const roundNumber = match ? parseInt(match[0], 10) : 1;

    // Create interview with initial Round 1 record
    const interview = await prisma.interview.create({
      data: {
        candidateName: candidateName.trim(),
        position: position.trim(),
        phone: phone.trim(),
        email: email.trim(),
        round: currentRound,
        status: currentStatus,
        notes: notes?.trim() || null,
        rounds: {
          create: [
            {
              roundNumber: roundNumber,
              roundName: currentRound,
              status: currentStatus === "Passed" || currentStatus === "Rejected" ? currentStatus : "Pending",
              notes: notes?.trim() || null,
            },
          ],
        },
      },
      include: {
        rounds: {
          orderBy: {
            roundNumber: "asc",
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: interview,
      message: "Interview created successfully",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create interview";
    console.error("POST /api/interviews error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
