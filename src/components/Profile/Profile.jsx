import { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { supabase } from "../../supabase/supabaseClient";

const Profile = () => {
  const [formData, setFormData] = useState({
    college: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    technologies: [],
  });

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For prototype, just log the form data
    console.log("Form submitted:", formData);
    // TODO: Implement Supabase integration
    // const { data, error } = await supabase
    //   .from('user_profiles')
    //   .upsert({
    //     user_id: user.id,
    //     ...formData,
    //     updated_at: new Date()
    //   });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechnologiesChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      technologies: value,
    }));
  };

  return (
    <Container className="py-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-center">
        <Card className="shadow-sm w-100">
          <Card.Body className="p-5">
            <h1 className="text-center mb-4">Profile</h1>

            <div className="text-center mb-4">
              <h5 className="text-muted">Registered Email</h5>
              <p className="lead">{userEmail}</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>College/University</Form.Label>
                <Form.Control
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Experience Level</Form.Label>
                <Form.Select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6+ years)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Job Type Preference</Form.Label>
                <Form.Select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select job type</option>
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Technologies</Form.Label>
                <Form.Select
                  multiple
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleTechnologiesChange}
                  style={{ height: "150px" }}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="react">React</option>
                  <option value="node">Node.js</option>
                  <option value="sql">SQL</option>
                  <option value="aws">AWS</option>
                  <option value="docker">Docker</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" className="px-4">
                  Save Profile
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Profile;
