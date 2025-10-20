import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import ItemTable from "./ItemTable";
import ItemGrid from "./ItemGrid";
import { Item } from "../types/items";
import * as ItemService from "./ItemService";
const API_URL = import.meta.env.VITE_API_URL;

const ItemListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showTable, setShowTable] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleTableOrGrid = () => setShowTable((prevShowTable) => !prevShowTable);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ItemService.fetchItems();
      setItems(data);
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching items:", error.message);
      } else {
        console.error("Unknown error ", error);
      }
      setError("Failed to fetch items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saveViewMode = localStorage.getItem("itemViewMode");
    console.log("Saved view mode:", saveViewMode);
    if (saveViewMode) {
      if (saveViewMode === "grid") setShowTable(false);
      console.log("Show table:", showTable);
    }
    fetchItems();
  }, []);

  useEffect(() => {
    const viewMode = showTable ? "table" : "grid";
    localStorage.setItem("itemViewMode", viewMode);
    console.log("View mode saved:", viewMode);
  }, [showTable]);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemDeleted = async (itemId: number) => {
    try {
      await ItemService.deleteItem(itemId);
      setItems((prevItems) => prevItems.filter((item) => item.itemId !== itemId));
      console.log(`Item with ID ${itemId} deleted.`);
      // Refresh the item list after deletion
      // fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <Button onClick={fetchItems} disabled={loading} className="btn btn-primary mb-3 me-2">
        {loading ? "Loading..." : "Refresh"}
      </Button>
      <Button onClick={toggleTableOrGrid} className="btn btn-primary mb-3 me-2">
        {showTable ? "Switch to Grid" : "Switch to Table"}
      </Button>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showTable ? (
        <ItemTable items={filteredItems} apiUrl={API_URL} onItemDeleted={handleItemDeleted} />
      ) : (
        <ItemGrid items={filteredItems} apiUrl={API_URL} onItemDeleted={handleItemDeleted} />
      )}
      <Button href="/itemcreate" className="btn btn-secondary mb-3">
        Add new Item
      </Button>
    </div>
  );
};

export default ItemListPage;
