import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Form, Pagination, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrchidsPage() {
  const [orchids, setOrchids] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 6;

  useEffect(() => {
    fetchOrchids();
  }, [page]);

  const fetchOrchids = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orchids", {
        params: {
          page,
          size,
          keywords: keywords || undefined,
        },
      });
      setOrchids(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Lỗi gọi API:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchOrchids();
  };

  const handleAddToCart = (orchid) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = currentCart.findIndex(item => item.id === orchid.id);

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({
        id: orchid.id,
        name: orchid.name,
        imageUrl: orchid.imageUrl,
        price: orchid.price,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert("Added to cart!");
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSearch} className="d-flex mb-4">
        <Form.Control
          type="text"
          placeholder="Search orchids..."
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <button
          type="submit"
          className="ms-2 bg-gray-100 text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-200"
        > Search
        </button>
      </Form>

      <Row className="g-4">
        {orchids.map((orchid) => (
          <Col md={4} key={orchid.id}>
            <Card>
              <Card.Img variant="top" src={orchid.imageUrl} height={300} style={{ objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{orchid.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{orchid.categoryName}</Card.Subtitle>
                <Card.Text>{orchid.description?.slice(0, 100)}...</Card.Text>
                <div className="d-flex gap-2">
                  <Link to={`/detail/${orchid.id}`}>
                    <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded shadow transition">
                      Detail
                    </span>
                  </Link>
                  <Button
                    variant="success"
                    onClick={() => handleAddToCart(orchid)}
                    className="text-white text-sm font-medium"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages).keys()].map((p) => (
          <Pagination.Item key={p} active={p === page} onClick={() => setPage(p)}>
            {p + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}
