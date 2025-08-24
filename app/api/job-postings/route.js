import { MongoClient } from "mongodb";

const uri = "mongodb+srv://ashik1234d:1234567812345678@cluster0.nyaadry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    await client.connect();
    const database = client.db("hirelink");
    const jobPostingsCollection = database.collection("job_postings");

    // Simply fetch all job postings
    const jobPostings = await jobPostingsCollection.find({}).toArray();

    return new Response(JSON.stringify(jobPostings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching job postings:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch job postings" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
}
