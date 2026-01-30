const BASE_URL = "http://localhost:3000";

export const getProducts = async (page = 1, limit = 10) => {
  const res = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`);
  return res.json();
};

export const createProduct = async (product) => {
  await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id) => {
  await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
};
