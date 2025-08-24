import { MongoClient } from "mongodb";

const uri = "mongodb+srv://ashik1234d:1234567812345678@cluster0.nyaadry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    await client.connect();
    const database = client.db("hirelink");
    const jobPostingsCollection = database.collection("job_postings");

    // Fetch all job postings
    const jobPostings = await jobPostingsCollection.find({}).toArray();

    // Combine all skills arrays and calculate occurrences
    const skillCounts = jobPostings.reduce((skills, job) => {
      if (job.required_skills) {
        job.required_skills.forEach((skillObj) => {
          if (skillObj.skill) {
            skills[skillObj.skill] = (skills[skillObj.skill] || 0) + 1;
          }
        });
      }
      return skills;
    }, {});

    // Convert skillCounts object to an array of separate objects
    const skillObjects = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
      .map(([skill, count]) => ({ [skill]: count }));

    // Return response directly as JSON
    return new Response(JSON.stringify(skillObjects), {
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