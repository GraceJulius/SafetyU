import { NextResponse } from "next/server";

export async function POST(request) {
  const { type } = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json({
    id: Math.random().toString(36).substring(2),
    timestamp: new Date().toISOString(),
    type,
    status: "sent",
  });
}