import { useEffect, useState } from "react";
import { getCategories, createCategory, deleteCategory } from "../api/categoryApi";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => { loadCategories(); }, []);

  const handleAdd = async () => {
    if (!name) return;
    await createCategory(name);
    setName("");
    loadCategories();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    loadCategories();
  };

  const styles = {
    container: { padding: "40px", backgroundColor: "#FFFBEB", minHeight: "100vh", fontFamily: "sans-serif" },
    card: { backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", maxWidth: "800px", margin: "0 auto" },
    title: { color: "#78350F", fontSize: "28px", fontWeight: "800", marginBottom: "24px", textAlign: "center" },
    inputGroup: { display: "flex", gap: "12px", marginBottom: "30px" },
    input: { flex: 1, padding: "14px", borderRadius: "8px", border: "2px solid #FDE68A", fontSize: "16px", color: "#111827", backgroundColor: "#FFFFFF", outline: "none" },
    buttonAdd: { backgroundColor: "#D97706", color: "#ffffff", border: "none", padding: "14px 28px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" },
    
    // TABLE ALIGNMENT FIXES
    table: { width: "100%", borderCollapse: "collapse" },
    th: { 
      textAlign: "left",       // Forced Left Align
      padding: "16px 20px",    // Added horizontal padding for breathing room
      color: "#78350F", 
      backgroundColor: "#FEF3C7", 
      fontSize: "13px", 
      fontWeight: "bold",
      textTransform: "uppercase" 
    },
    td: { 
      textAlign: "left",       // Forced Left Align to match headers
      padding: "16px 20px", 
      borderBottom: "1px solid #FEF3C7", 
      color: "#1F2937", 
      fontSize: "15px"
    },
    btnDelete: { color: "#DC2626", background: "none", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Category Master</h2>
        
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            placeholder="Type category name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button style={styles.buttonAdd} onClick={handleAdd}>Add Category</button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {/* Added consistent padding and explicit left alignment */}
              <th style={{...styles.th, borderRadius: "8px 0 0 0", width: "80px"}}>S.No</th>
              <th style={{...styles.th, width: "100px"}}>ID</th>
              <th style={styles.th}>Category Name</th>
              <th style={{...styles.th, textAlign: 'right', borderRadius: "0 8px 0 0"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c, index) => (
              <tr key={c.id}>
                <td style={{...styles.td, fontWeight: "bold"}}>{index + 1}</td>
                <td style={styles.td}>{c.id}</td>
                <td style={{...styles.td, color: "#111827", fontWeight: "500"}}>{c.name}</td>
                <td style={{...styles.td, textAlign: 'right'}}>
                  <button style={styles.btnDelete} onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}