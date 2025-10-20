import { Item } from "../types/items";

const API_URL = import.meta.env.VITE_API_URL;

const headers = {
  "Content-Type": "application/json",
};
const handleResponse = async (response: Response) => {
  if (response.ok) {
    if (response.status === 204) {
      return null; // No content to return
    }
    return response.json();
  } else {
    const errorData = await response.json();
    const errorMessage = errorData?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const fetchItems = async () => {
  const response = await fetch(`${API_URL}/api/itemapi/itemlist`);
  return handleResponse(response);
};

export const fetchItemById = async (itemId: string) => {
  const response = await fetch(`${API_URL}/api/itemapi/${itemId}`);
  return handleResponse(response);
};

export const createItem = async (item: Item) => {
  const response = await fetch(`${API_URL}/api/itemapi/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  });
  return handleResponse(response);
};

export const updateItem = async (itemId: number, item: Item) => {
  const response = await fetch(`${API_URL}/api/itemapi/update/${itemId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(item),
  });
  return handleResponse(response);
};

export const deleteItem = async (itemId: number) => {
  const response = await fetch(`${API_URL}/api/itemapi/delete/${itemId}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
