import { useNavigate } from "react-router-dom";
import { Item } from "../types/items";
import ItemForm from "./ItemForm";
import React from "react";
import * as ItemService from "./ItemService";

const ItemCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleItemCreated = async (item: Item) => {
    try {
      const data = await ItemService.createItem(item);
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
