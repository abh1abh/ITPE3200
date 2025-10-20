import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import ItemTable from "./ItemTable";
import ItemGrid from "./ItemGrid";
import { Item } from "../types/items";

// const API_URL = "http://localhost:5217";
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
      const response = await fetch(`${API_URL}/api/itemapi/itemlist`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Item[] = await response.json();
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
    fetchItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <ItemTable items={filteredItems} apiUrl={API_URL} />
      ) : (
        <ItemGrid items={filteredItems} apiUrl={API_URL} />
      )}
      <Button href="/itemcreate" className="btn btn-secondary mb-3">
        Add new Item
      </Button>
    </div>
  );
};

export default ItemListPage;
