import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  required_skills: [
    {
      skill: { type: String, required: true },
      experience: { type: Number, required: true },
    },
  ],
  job_description: { type: String, required: true },
  posting_date: { type: String, required: true },
  expected_salary: { type: Number, required: true },
});

export default mongoose.models.job_postings ||
  mongoose.model("job_postings", jobPostingSchema);