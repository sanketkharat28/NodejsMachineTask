const BASE_URL = "http://localhost:3000";

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};

export const createCategory = async (name) => {
  await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
};

export const deleteCategory = async (id) => {
  await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });
};
