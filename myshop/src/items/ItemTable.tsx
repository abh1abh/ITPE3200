import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Item } from "../types/items";
import { Link } from "react-router-dom";

interface ItemTableProps {
  items: Item[];
  apiUrl: string;
  onItemDeleted: (itemId: number) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, apiUrl, onItemDeleted }) => {
  const [showImage, setShowImage] = useState<boolean>(true);
  const [showDescription, setShowDescription] = useState<boolean>(true);

  const toggleImage = () => setShowImage((prevShowImage) => !prevShowImage);
  const toggleDescription = () => setShowDescription((prevShowDescription) => !prevShowDescription);

  return (
    <div>
      <Button onClick={toggleImage} className="btn btn-secondary mb-3 me-2">
        {showImage ? "Hide Image" : "Show Image"}
      </Button>
      <Button onClick={toggleDescription} className="btn btn-secondary mb-3 me-2">
        {showDescription ? "Hide Description" : "Show Description"}
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ItemId</th>
            <th>Name</th>
            <th>Price</th>
            {showDescription && <th>Description</th>}
            {showImage && <th>Image</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.name}</td>
              <td>{item.price} NOK</td>
              {showDescription && <td>{item.description}</td>}
              {showImage && (
                <td>
                  {item.imageUrl ? (
                    <img
                      src={`${apiUrl}${item.imageUrl}`}
                      alt={item.name}
                      width="120"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
              )}
              <td className="text-center">
                <Link to={`/items/update/${item.itemId}`}>Update</Link>
                <Link to="#" onClick={(event) => onItemDeleted(item.itemId!)}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemTable;
