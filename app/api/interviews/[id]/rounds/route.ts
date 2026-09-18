import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();

    const interview = await prisma.interview.findUnique({
      where: { id },
      include: {
        rounds: {
          orderBy: {
            roundNumber: "asc",
          },
        },
      },
    });

    if (!interview || interview.deletedAt) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }

    const highestRoundNum = interview.rounds.reduce(
      (max, r) => Math.max(max, r.roundNumber),
      0
    );
    const nextRoundNumber = body.roundNumber || highestRoundNum + 1;
    const roundName = body.roundName?.trim() || `Round ${nextRoundNumber}`;
    const status = body.status?.trim() || "Pending";
    const notes = body.notes?.trim() || null;

    const newRound = await prisma.interviewRound.create({
      data: {
        interviewId: id,
        roundNumber: nextRoundNumber,
        roundName,
        status,
        notes,
      },
    });

    // Also update interview current round and status if needed
    const updatedInterview = await prisma.interview.update({
      where: { id },
      data: {
        round: roundName,
        status: status === "Rejected" ? "Rejected" : "In Progress",
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
      data: {
        round: newRound,
        interview: updatedInterview,
      },
      message: "Round added successfully",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to add round";
    console.error("POST /api/interviews/[id]/rounds error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
