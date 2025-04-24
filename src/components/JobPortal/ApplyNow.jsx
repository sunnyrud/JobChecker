import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import "./JobPortal.css";

const ApplyNow = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experienceYears: "",
    currentCompany: "",
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setShowForm(false);
  };

  return (
    <Container fluid className="py-4">
      <h1 className="text-center mb-4">Job Application</h1>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h2 className="mb-3">Company Details</h2>
          <Row className="mb-4">
            <Col md={6}>
              <p>
                <strong>Company Name:</strong> Tech Solutions Inc.
              </p>
              <p>
                <strong>Location:</strong> New York, NY
              </p>
              <p>
                <strong>Job Type:</strong> Full-Time
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Department:</strong> Information Security
              </p>
              <p>
                <strong>Position Level:</strong> Senior
              </p>
              <p>
                <strong>Salary:</strong> $150,000/year
              </p>
            </Col>
          </Row>

          <h2 className="mb-3">Job Description</h2>

          <div className="mb-4">
            <h4>Project Role</h4>
            <p>Security Architect</p>
          </div>

          <div className="mb-4">
            <h4>Project Role Description</h4>
            <p>
              Define the cloud security framework and architecture, ensuring it
              meets the business requirements and performance goals. Document
              the implementation of the cloud security controls and transition
              to cloud security-managed operations.
            </p>
          </div>

          <div className="mb-4">
            <h4>Required Skills</h4>
            <p>
              <strong>Must have skills:</strong> Okta Identity Management
            </p>
            <p>
              <strong>Good to have skills:</strong> NA
            </p>
          </div>

          <div className="mb-4">
            <h4>Experience Requirements</h4>
            <p>Minimum 5 year(s) of experience is required</p>
          </div>

          <div className="mb-4">
            <h4>Educational Qualification</h4>
            <p>15 years full time education</p>
          </div>

          <div className="mb-4">
            <h4>Summary</h4>
            <p>
              As a Security Architect, you will define the cloud security
              framework and architecture, ensuring it meets the business
              requirements and performance goals. You will document the
              implementation of the cloud security controls and transition to
              cloud security-managed operations. Your typical day will involve
              designing and implementing security solutions, collaborating with
              cross-functional teams, and ensuring the integrity and
              confidentiality of data in the cloud environment.
            </p>
          </div>

          <div className="mb-4">
            <h4>Roles & Responsibilities</h4>
            <ul>
              <li>Expected to be an SME in Okta Identity Management</li>
              <li>Collaborate and manage the team to perform effectively</li>
              <li>
                Responsible for team decisions and ensuring adherence to
                security best practices
              </li>
              <li>
                Engage with multiple teams and contribute to key decisions
              </li>
              <li>
                Expected to provide solutions to problems that apply across
                multiple teams
              </li>
              <li>
                Design and implement security solutions to protect cloud
                environments
              </li>
              <li>
                Collaborate with cross-functional teams to ensure the integrity
                and confidentiality of data
              </li>
              <li>
                Stay updated with the latest security trends and technologies
              </li>
              <li>
                Ensure compliance with regulatory requirements and industry
                standards
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h4>Professional & Technical Skills</h4>
            <ul>
              <li>
                Excellent working knowledge of current security standards and
                protocols, including SSO, MFA, SAML, OAuth, OIDC, LDAP, RADIUS,
                and Kerberos
              </li>
              <li>
                Good understanding of REST API's and JSON and should be able to
                help application team on integration
              </li>
              <li>
                Configuration of SSO for SaaS and on-premise applications using
                Okta "cloud based IAM Solution"
              </li>
              <li>
                Experience in Directory Integration such as Active Directory,
                LDAP with Okta
              </li>
              <li>
                Good hands on experience on Okta "Cloud based IAM solution"
              </li>
              <li>
                Good understanding of access management, federated identity,
                2-factor solutions and sign-on, application policy
              </li>
              <li>Strong Java and web-services development experience</li>
              <li>Development background in J2EE/Java/Java Script</li>
              <li>Good communication skills</li>
            </ul>
          </div>

          <div>
            <h4>Additional Qualifications</h4>
            <p>
              <strong>Educational Qualification:</strong> BE or MCA or MSc with
              Good Computer Science Background with good academic record
            </p>
          </div>

          {!showForm && !showSuccess && (
            <div className="text-center mt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowForm(true)}
              >
                Fill Application Form
              </Button>
            </div>
          )}

          {showForm && (
            <Form onSubmit={handleSubmit} className="mt-4">
              <h3 className="mb-4">Application Form</h3>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Years of Experience</Form.Label>
                    <Form.Control
                      type="number"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Current Company (if any)</Form.Label>
                <Form.Control
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Resume</Form.Label>
                <Form.Control
                  type="file"
                  name="resume"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      resume: e.target.files[0],
                    }))
                  }
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit Application
                </Button>
              </div>
            </Form>
          )}

          {showSuccess && (
            <div className="text-center mt-4">
              <Alert variant="success">
                <Alert.Heading>
                  Application Submitted Successfully!
                </Alert.Heading>
                <p>
                  Thank you for applying. We will review your application and
                  get back to you soon.
                </p>
              </Alert>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplyNow;
