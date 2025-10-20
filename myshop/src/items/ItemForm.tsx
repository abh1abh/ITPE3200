import React, { useState } from "react";
import { Item } from "../types/items";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

interface ItemFormProps {
  onItemChanged: (item: Item) => void;
  itemId?: number;
  isUpdating?: boolean;
  initialData?: Item;
}

const ItemForm: React.FC<ItemFormProps> = ({ onItemChanged, itemId, isUpdating = false, initialData }) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [description, setDescription] = useState<string>(initialData?.description || "");
  const [price, setPrice] = useState<number>(initialData?.price || 0);
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl || "");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const item: Item = { itemId, name, description, price, imageUrl };
    onItemChanged(item);
    // Implementation for submitting the form data goes here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formItemName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          pattern="[0-9a-zA-ZæøåÆØÅ. \-]{2,20}" // Regular expression pattern
          title="The Name must be numbers or letters and between 2 to 20 characters."
        />
      </Form.Group>

      <Form.Group controlId="formItemPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter item price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          min="0.01"
          step="0.01"
        />
      </Form.Group>

      <Form.Group controlId="formItemDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formItemImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </Form.Group>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Button variant="primary" type="submit">
        {isUpdating ? "Update Item" : "Create Item"}
      </Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">
        Cancel
      </Button>
    </Form>
  );
};
export default ItemForm;
