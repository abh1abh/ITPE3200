import { useNavigate } from "react-router-dom";
import { Item } from "../types/items";
import ItemForm from "./ItemForm";
import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ItemCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleItemCreated = async (item: Item) => {
    try {
      const response = await fetch(`${API_URL}/api/itemapi/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Item created:", data);
      navigate("/items"); // Navigate back to the item list page after creation
    } catch (error) {
      console.error("Error creating item:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h2>Create New Item</h2>
      <ItemForm onItemChanged={handleItemCreated} />
    </div>
  );
};

export default ItemCreatePage;
