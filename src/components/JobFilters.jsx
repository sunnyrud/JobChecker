// src/components/JobFilters.jsx
import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

const JobFilters = ({
  filters,
  uniqueCities,
  uniqueJobTypes,
  handleFilterChange,
  resetFilters,
}) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>Filter Jobs</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3 align-items-end">
            {" "}
            {/* Use align-items-end */}
            <Col xs={12} md>
              {" "}
              {/* Allow role to take more space */}
              <Form.Group controlId="filterRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Developer, Designer"
                  name="role"
                  value={filters.role}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6} md={3}>
              {" "}
              {/* Explicit sizes */}
              <Form.Group controlId="filterCity">
                <Form.Label>City</Form.Label>
                <Form.Select
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                >
                  {uniqueCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={6} md={3}>
              {" "}
              {/* Explicit sizes */}
              <Form.Group controlId="filterJobType">
                <Form.Label>Job Type</Form.Label>
                <Form.Select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                >
                  {uniqueJobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md="auto">
              {" "}
              {/* Auto width for button column */}
              <Button
                variant="outline-secondary"
                onClick={resetFilters}
                className="w-100" // Make button full width of its column
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default JobFilters;
