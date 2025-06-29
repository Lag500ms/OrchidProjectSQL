import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Breadcrumb, Card, Badge, Image, Spinner } from "react-bootstrap";
import axios from "axios";

export default function DetailOrchid() {
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  console.log("🪻 Orchid ID từ URL:", id);
  const baseUrl = "http://localhost:8080/api/orchids/detail";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        setOrchid(response.data);
      } catch (err) {
        console.error("Error fetching orchid:", err);
        setError("Không thể tải dữ liệu hoa lan.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error || !orchid) {
    return (
      <div className="text-center text-danger mt-5">
        <h4>{error || "Không tìm thấy hoa lan!"}</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-md-5 p-3 d-flex align-items-start justify-content-center">
          <Image
            src={orchid.orchidUrl || orchid.imageUrl}
            alt={orchid.name}
            className="border rounded shadow-sm w-100"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>

        <div className="col-12 col-md-7 p-3">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>{orchid.name}</Breadcrumb.Item>
          </Breadcrumb>

          <h2 className="mb-3">{orchid.name}</h2>

          <Card>
            <Card.Header>
              <p className="fs-5 mb-0">{orchid.description}</p>
            </Card.Header>
            <Card.Body>
              {orchid.isNatural ? (
                <Badge bg="success">🌿 Natural Orchid</Badge>
              ) : (
                <Badge bg="warning" text="dark">🏭 Industrial Orchid</Badge>
              )}

              {orchid.categoryName && (
                <p className="mt-3"><strong>📂 Category:</strong> {orchid.categoryName}</p>
              )}

              {orchid.price && (
                <p><strong>💵 Price:</strong> ${orchid.price.toFixed(2)}</p>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>

  );
}
