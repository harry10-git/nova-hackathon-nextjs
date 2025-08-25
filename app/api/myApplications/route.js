import mongoose from "mongoose";
import JobApplication from "../../../models/jobApplications";
import JobPosting from "../../../models/job_postings"; // <-- Import the model

const uri = "mongodb+srv://ashik1234d:1234567812345678@cluster0.nyaadry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "userId is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, { dbName: "hirelink" });
    }

    // Find all applications for the user and populate job info
    const applications = await JobApplication.find({ userId })
      .populate("jobId")
      .exec();

    // Use a Map to keep only unique jobs by jobId
    const uniqueJobsMap = new Map();
    applications.forEach(app => {
      if (app.jobId && !uniqueJobsMap.has(app.jobId._id.toString())) {
        uniqueJobsMap.set(app.jobId._id.toString(), {
          applicationId: app._id,
          date: app.date,
          job: app.jobId,
        });
      }
    });

    const result = Array.from(uniqueJobsMap.values());

    return new Response(
      JSON.stringify({ applications: result }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch applications" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}