import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Item } from "../types/items";

interface ItemGridProps {
  items: Item[];
  apiUrl: string;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, apiUrl }) => {
  return (
    <div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {items.map((item) => (
          <Col key={item.itemId}>
            <Card className="h-100">
              {item.imageUrl ? (
                <Card.Img
                  variant="top"
                  src={`${apiUrl}${item.imageUrl}`}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: "1rem" }}>No Image</div>
              )}
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>Price: {item.price} NOK</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ItemGrid;
