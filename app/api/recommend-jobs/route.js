// app/api/recommend-jobs/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Replace with the actual URL of your running FastAPI application
    const fastApiUrl = "http://127.0.0.1:8000/recommend_jobs";

    const fastApiResponse = await fetch(fastApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });

    if (!fastApiResponse.ok) {
      const errorData = await fastApiResponse.json();
      return NextResponse.json(
        { error: errorData.detail || "Failed to fetch from FastAPI" },
        { status: fastApiResponse.status }
      );
    }

    const data = await fastApiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}