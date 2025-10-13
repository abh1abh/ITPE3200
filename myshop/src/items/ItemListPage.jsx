import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const API_URL = "http://localhost:5217";

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>Items</h1>
      <Button onClick={fetchItems} disabled={loading}>
        {loading ? "Loading..." : "Refresh"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ItemId</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.name}</td>
              <td>{item.price} NOK</td>
              <td>{item.description}</td>
              <td>
                <img src={`${item.imageUrl}`} alt={item.name} width="120" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemListPage;
