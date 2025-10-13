import { useState } from "react";
import { Button, Table } from "react-bootstrap";

const ItemTable = ({ items, apiUrl }) => {
  const [showImage, setShowImage] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

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
                  <img src={`${item.imageUrl}`} alt={item.name} width="120" />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemTable;
