import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import SidebarLayout from "../Layout/SidebarLayout";

const Profile = () => {
  const [formData, setFormData] = useState({
    college: "",
    experienceLevel: "",
    location: "",
  });

  // Hardcoded email for prototype
  const userEmail = "user@example.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    // For prototype, just log the form data
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <SidebarLayout>
      <Container fluid className="py-4">
        <h1 className="text-center mb-2">Profile</h1>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
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
      </Container>
    </SidebarLayout>
  );
};

export default Profile;