import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { getProducts, createProduct, deleteProduct } from "../api/productApi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const loadProducts = async () => {
    const data = await getProducts(page, limit);
    setProducts(data);
  };

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => { loadProducts(); loadCategories(); }, [page]);

  const handleAdd = async () => {
    if (!name || !categoryId) return;
    await createProduct({ name, categoryId });
    setName(""); setCategoryId("");
    loadProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  const styles = {
    container: { padding: "40px", backgroundColor: "#FFFBEB", minHeight: "100vh", fontFamily: "sans-serif" },
    card: { backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", maxWidth: "1000px", margin: "0 auto" },
    title: { color: "#78350F", fontSize: "28px", fontWeight: "800", marginBottom: "24px", textAlign: "center" },
    formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "12px", marginBottom: "30px", padding: "20px", backgroundColor: "#FEF3C7", borderRadius: "12px" },
    
    // UPDATED INPUT & SELECT STYLES FOR VISIBILITY
    input: { 
      padding: "12px", 
      borderRadius: "8px", 
      border: "2px solid #FDE68A", 
      fontSize: "16px", 
      color: "#111827",           // Deep black/charcoal text for typing
      backgroundColor: "#FFFFFF", // Solid white background
      outline: "none",
      fontWeight: "500"
    },
    select: {
      padding: "12px", 
      borderRadius: "8px", 
      border: "2px solid #FDE68A", 
      fontSize: "16px", 
      color: "#111827",           // Deep black text for selected option
      backgroundColor: "#FFFFFF",
      outline: "none",
      fontWeight: "500",
      cursor: "pointer"
    },
    option: {
      color: "#111827",           // Black text for dropdown items
      backgroundColor: "#FFFFFF"
    },

    buttonAdd: { backgroundColor: "#D97706", color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { textAlign: "left", padding: "15px", color: "#78350F", backgroundColor: "#FDE68A", fontSize: "13px", fontWeight: "bold", textTransform: "uppercase" },
    td: { padding: "15px", borderBottom: "1px solid #FEF3C7", color: "#1F2937", fontSize: "15px" },
    
    pagination: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px", gap: "20px" },
    pageBtn: { padding: "10px 20px", borderRadius: "8px", border: "2px solid #D97706", backgroundColor: "#FFFFFF", color: "#78350F", cursor: "pointer", fontWeight: "bold" },
    disabledBtn: { padding: "10px 20px", borderRadius: "8px", border: "2px solid #E5E7EB", backgroundColor: "#F3F4F6", color: "#9CA3AF", cursor: "not-allowed" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Product Inventory</h2>

        <div style={styles.formGrid}>
          {/* Input field with dark text */}
          <input
            style={styles.input}
            placeholder="Enter Product Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Select field with dark text */}
          <select
            style={styles.select}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" style={styles.option}>Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id} style={styles.option}>
                {c.name}
              </option>
            ))}
          </select>

          <button style={styles.buttonAdd} onClick={handleAdd}>Add Product</button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{...styles.th, borderRadius: "8px 0 0 0"}}>S.No</th>
              <th style={styles.th}>Product ID</th>
              <th style={styles.th}>Product Name</th>
              <th style={styles.th}>Category ID</th>
              <th style={styles.th}>Category Name</th>
              <th style={{...styles.th, borderRadius: "0 8px 0 0"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.productId}>
                <td style={{...styles.td, fontWeight: "bold"}}>{(page - 1) * limit + (index + 1)}</td>
                <td style={styles.td}>{p.productId}</td>
                <td style={{...styles.td, color: "#111827", fontWeight: "500"}}>{p.productName}</td>
                <td style={styles.td}>{p.categoryId}</td>
                <td style={styles.td}>
                  <span style={{backgroundColor: "#FEF3C7", color: "#92400E", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold"}}>
                    {p.categoryName}
                  </span>
                </td>
                <td style={styles.td}>
                  <button onClick={() => handleDelete(p.productId)} style={{color: "#DC2626", border: "none", background: "none", cursor: "pointer", fontWeight: "bold"}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
            style={page === 1 ? styles.disabledBtn : styles.pageBtn}
          >
            ← Previous
          </button>
          
          <span style={{fontWeight: "bold", color: "#78350F"}}>Page {page}</span>

          <button 
            style={styles.pageBtn} 
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}