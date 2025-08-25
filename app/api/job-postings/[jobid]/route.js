import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://ashik1234d:1234567812345678@cluster0.nyaadry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function GET(request, context) {
  const { jobid } = await context.params; // <-- await params

  try {
    await client.connect();
    const database = client.db("hirelink");
    const jobPostingsCollection = database.collection("job_postings");

    // Find job by ObjectId
    const job = await jobPostingsCollection.findOne({ _id: new ObjectId(jobid) });

    if (!job) {
      return new Response(
        JSON.stringify({ error: "Job not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(job), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching job details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch job details" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
}