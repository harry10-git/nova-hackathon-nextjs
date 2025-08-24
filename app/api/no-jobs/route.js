import { MongoClient } from "mongodb";

const uri = "mongodb+srv://ashik1234d:1234567812345678@cluster0.nyaadry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db("hirelink");
    const jobPostingsCollection = database.collection("job_postings");

    // Count all documents in the job_postings collection
    const jobCount = await jobPostingsCollection.countDocuments({});

    // Return the count as JSON
    return new Response(JSON.stringify({ job_count: jobCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching job count:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch job count" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
}
