import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import ItemTable from "./ItemTable";
import ItemGrid from "./ItemGrid";

const API_URL = "http://localhost:5217";

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTableOrGrid = () => setShowTable((prevShowTable) => !prevShowTable);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/itemapi/itemlist`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching items:", error.message);
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
    </div>
  );
};

export default ItemListPage;
