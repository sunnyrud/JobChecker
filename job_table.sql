
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    job_title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    location TEXT,
    role TEXT,
    job_type TEXT,
    experience TEXT,
    salary NUMERIC,
    required_skills TEXT[]
);

INSERT INTO jobs (job_title, company_name, location, role, job_type, experience, salary, required_skills)
VALUES
    ('Cloud Admin', 'Dell', 'Los Angeles, CA', 'Internship', 'Remote', 'Entry Level', 142838, ARRAY['Python', 'DevOps', 'Java']),
    ('Cloud Ops', 'Wipro', 'New York, NY', 'Internship', 'Hybrid', 'Entry Level', 192580, ARRAY['Python', 'Docker']),
    ('Cloud Dev', 'Salesforce', 'Atlanta, GA', 'Part-Time', 'On-Site', 'Entry Level', 115397, ARRAY['Docker', 'Java']),
    ('Cloud Con', 'Salesforce', 'New York, NY', 'Contract', 'Hybrid', 'Entry Level', 192088, ARRAY['Linux', 'Azure', 'Python', 'Terraform']),
    ('Cloud Sup', 'Cisco', 'Boston, MA', 'Part-Time', 'Hybrid', 'Mid Level', 160472, ARRAY['Kubernetes', 'AWS', 'Docker', 'Google Cloud']),
    ('Azure Dev', 'Intel', 'New York, NY', 'Part-Time', 'On-Site', 'Senior Level', 92882, ARRAY['Linux', 'Python', 'Kubernetes', 'AWS']),
    ('Cloud Ops', 'Dell', 'Denver, CO', 'Full-Time', 'Hybrid', 'Entry Level', 143685, ARRAY['Terraform', 'Docker', 'Linux', 'DevOps']);

