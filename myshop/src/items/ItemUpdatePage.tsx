import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from "../types/items";
import ItemForm from "./ItemForm";
const API_URL = import.meta.env.VITE_API_URL;
import * as ItemService from "./ItemService";

const ItemUpdatePage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const data = await ItemService.fetchItemById(itemId!);
        setItem(data);
      } catch (error) {
        setError("Failed to fetch item. Please try again later.");
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleItemUpdate = async (updatedItem: Item) => {
    try {
      const data = await ItemService.updateItem(Number(itemId), updatedItem);
      console.log("Item updated:", data);
      navigate("/items"); // Navigate back to the item list page after update
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>No item found.</div>;

  return (
    <div>
      <h2>Update Item</h2>
      <ItemForm itemId={item.itemId} isUpdating={true} onItemChanged={handleItemUpdate} initialData={item} />
    </div>
  );
};

export default ItemUpdatePage;
