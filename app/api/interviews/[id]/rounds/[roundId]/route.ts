import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string; roundId: string }> }
) {
  try {
    const { id, roundId } = await props.params;
    const body = await request.json();

    const existingRound = await prisma.interviewRound.findUnique({
      where: { id: roundId },
    });

    if (!existingRound || existingRound.interviewId !== id) {
      return NextResponse.json(
        { success: false, error: "Round not found" },
        { status: 404 }
      );
    }

    const { status, notes, roundName } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (status !== undefined) updateData.status = status.trim();
    if (notes !== undefined) updateData.notes = notes?.trim() || null;
    if (roundName !== undefined) updateData.roundName = roundName.trim();

    const updatedRound = await prisma.interviewRound.update({
      where: { id: roundId },
      data: updateData,
    });

    // Optionally update the overall interview status based on round status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interviewUpdateData: any = {};
    if (status === "Rejected") {
      interviewUpdateData.status = "Rejected";
    } else if (status === "Passed") {
      // If this was the latest round or passed, can reflect In Progress or Passed
      interviewUpdateData.status = "In Progress";
    } else if (status === "Completed") {
      interviewUpdateData.status = "In Progress";
    }

    if (Object.keys(interviewUpdateData).length > 0) {
      await prisma.interview.update({
        where: { id },
        data: interviewUpdateData,
      });
    }

    const updatedInterview = await prisma.interview.findUnique({
      where: { id },
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
        round: updatedRound,
        interview: updatedInterview,
      },
      message: "Round updated successfully",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update round";
    console.error("PATCH /api/interviews/[id]/rounds/[roundId] error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string; roundId: string }> }
) {
  try {
    const { id, roundId } = await props.params;

    const existingRound = await prisma.interviewRound.findUnique({
      where: { id: roundId },
    });

    if (!existingRound || existingRound.interviewId !== id) {
      return NextResponse.json(
        { success: false, error: "Round not found" },
        { status: 404 }
      );
    }

    await prisma.interviewRound.delete({
      where: { id: roundId },
    });

    const updatedInterview = await prisma.interview.findUnique({
      where: { id },
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
      data: updatedInterview,
      message: "Round deleted successfully",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete round";
    console.error("DELETE /api/interviews/[id]/rounds/[roundId] error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
