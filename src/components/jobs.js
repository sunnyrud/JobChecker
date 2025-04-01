// src/data/jobs.js

export const sampleJobs = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Tech Solutions Inc.",
    city: "Bengaluru",
    location: "Koramangala",
    jobType: "Full-time",
    description: "Develop user interfaces using React.",
  },
  {
    id: 2,
    role: "Backend Developer",
    company: "Data Systems Ltd.",
    city: "Mumbai",
    location: "BKC",
    jobType: "Full-time",
    description: "Build scalable backend services.",
  },
  {
    id: 3,
    role: "UI/UX Designer",
    company: "Creative Minds",
    city: "Bengaluru",
    location: "Indiranagar",
    jobType: "Contract",
    description: "Design intuitive user experiences.",
  },
  {
    id: 4,
    role: "DevOps Engineer",
    company: "CloudNet",
    city: "Pune",
    location: "Hinjewadi",
    jobType: "Full-time",
    description: "Manage cloud infrastructure and CI/CD pipelines.",
  },
  {
    id: 5,
    role: "React Developer Intern",
    company: "Startup Hub",
    city: "Bengaluru",
    location: "HSR Layout",
    jobType: "Internship",
    description: "Learn and contribute to frontend projects.",
  },
  {
    id: 6,
    role: "Marketing Assistant",
    company: "AdWorks",
    city: "Delhi",
    location: "Connaught Place",
    jobType: "Part-time",
    description: "Support marketing campaigns.",
  },
  {
    id: 7,
    role: "Node.js Developer",
    company: "Tech Solutions Inc.",
    city: "Bengaluru",
    location: "Koramangala",
    jobType: "Full-time",
    description: "Develop server-side logic.",
  },
  {
    id: 8,
    role: "Data Analyst",
    company: "Data Systems Ltd.",
    city: "Mumbai",
    location: "BKC",
    jobType: "Full-time",
    description: "Analyze data and generate reports.",
  },
  {
    id: 9,
    role: "Graphic Designer",
    company: "Creative Minds",
    city: "Bengaluru",
    location: "Indiranagar",
    jobType: "Part-time",
    description: "Create visual content.",
  },
  {
    id: 10,
    role: "Cloud Support Engineer",
    company: "CloudNet",
    city: "Pune",
    location: "Hinjewadi",
    jobType: "Full-time",
    description: "Provide technical support for cloud services.",
  },
];

// Helper function (can also go in a utils file)
export const getUniqueValues = (jobs, key) => {
  const values = jobs.map((job) => job[key]);
  const uniqueValues = [...new Set(values.filter(Boolean))].sort();
  return ["All", ...uniqueValues];
};
