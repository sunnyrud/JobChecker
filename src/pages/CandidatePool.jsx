import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { supabase } from "../supabase/supabaseClient";

const CandidatePool = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      console.log("Starting to fetch candidates...");
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        console.log("Supabase response:", { data, error });

        if (error) throw error;

        console.log("Successfully fetched candidates:", data);
        setCandidates(data || []);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setError("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">Loading candidates...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <div className="text-center text-danger">{error}</div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Candidate Pool</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {candidates.map((candidate) => (
          <Col key={candidate.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="mb-3">
                  {candidate.full_name || "Anonymous"}
                </Card.Title>
                <Card.Text>
                  <div className="mb-2">
                    <strong>Email:</strong> {candidate.email}
                  </div>
                  <div className="mb-2">
                    <strong>Location:</strong>{" "}
                    {candidate.location || "Not specified"}
                  </div>
                  <div>
                    <strong>Experience:</strong>{" "}
                    {candidate.experience || "Not specified"}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CandidatePool;
