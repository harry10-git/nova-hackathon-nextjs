import mongoose from "mongoose";
import JobApplication from "../../../../models/jobApplications";

const uri = "mongodb+srv://ashik1234d:1234567812345678@cluster0.nyaadry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function POST(request) {
  try {
    const { userId, jobId } = await request.json();

    if (!userId || !jobId) {
      return new Response(
        JSON.stringify({ error: "userId and jobId are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, { dbName: "hirelink" });
    }

    // Create new job application
    const application = new JobApplication({
      userId,
      jobId,
      date: new Date(),
    });

    await application.save();

    return new Response(
      JSON.stringify({ success: true, application }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating job application:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create job application" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}