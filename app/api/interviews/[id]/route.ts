import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

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

    return NextResponse.json({
      success: true,
      data: interview,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch interview";
    console.error("GET /api/interviews/[id] error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();

    const existing = await prisma.interview.findUnique({
      where: { id },
      include: { rounds: true },
    });

    if (!existing || existing.deletedAt) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }

    const { candidateName, position, phone, email, round, status, notes } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (candidateName !== undefined) updateData.candidateName = candidateName.trim();
    if (position !== undefined) updateData.position = position.trim();
    if (phone !== undefined) updateData.phone = phone.trim();
    if (email !== undefined) updateData.email = email.trim();
    if (round !== undefined) updateData.round = round.trim();
    if (status !== undefined) updateData.status = status.trim();
    if (notes !== undefined) updateData.notes = notes?.trim() || null;

    const updated = await prisma.interview.update({
      where: { id },
      data: updateData,
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
      data: updated,
      message: "Interview updated successfully",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update interview";
    console.error("PATCH /api/interviews/[id] error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    const existing = await prisma.interview.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }

    // Cascade delete rounds and interview
    await prisma.interview.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Interview deleted successfully",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete interview";
    console.error("DELETE /api/interviews/[id] error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
