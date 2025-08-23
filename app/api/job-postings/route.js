import { MongoClient } from "mongodb";

const uri = "mongodb+srv://ashik1234d:1234567812345678@cluster0.nyaadry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();
    const database = client.db("hirelink");
    const jobPostingsCollection = database.collection("job_postings");
    const skillsCollection = database.collection("skills");

    // Use aggregation to join job_postings with skills
    const jobPostings = await jobPostingsCollection
      .aggregate([
        {
          $unwind: "$required_skills", // Unwind the required_skills array
        },
        {
          $lookup: {
            from: "skills", // The skills collection
            localField: "required_skills.skill_id", // Field in job_postings
            foreignField: "_id", // Field in skills
            as: "skill_details", // Output field
          },
        },
        {
          $unwind: "$skill_details", // Unwind the skill_details array
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            location: { $first: "$location" },
            job_description: { $first: "$job_description" },
            posting_date: { $first: "$posting_date" },
            expected_salary: { $first: "$expected_salary" },
            required_skills: {
              $push: {
                skill_id: "$required_skills.skill_id",
                experience: "$required_skills.experience",
                skill_name: "$skill_details.name",
                skill_category: "$skill_details.category",
              },
            },
          },
        },
      ])
      .toArray();

    // Return the job postings as JSON
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
    // Ensure the client is closed
    await client.close();
  }
}