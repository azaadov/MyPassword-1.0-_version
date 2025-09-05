import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert, Modal, Form } from "react-bootstrap";
import "./ListPage.css";
import { API_URL } from "../config";

interface PasswordItem {
  _id: string;
  name: string;
  password: string;
  desc: string;
}

interface List {
  passwords: PasswordItem[];
  _id: string;
  name: string;
}

function ListPage() {
  const { id } = useParams<{ id: string }>();
  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordTitle, setPasswordTitle] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordDesc, setPasswordDesc] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPasswordId, setEditPasswordId] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchList = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/list/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.msg || "Failed to fetch list");
      setList(result);
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  // 🔹 Parol qo‘shish
  const handleAddPassword = async () => {
    if (!passwordTitle || !passwordValue || !id) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/pass/addPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: passwordTitle,
          password: passwordValue,
          desc: passwordDesc || "No description",
          listId: id,   // 🔹 list id ni body orqali yuboryapmiz
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.msg || "Failed to add password");
      setPasswordTitle("");
      setPasswordValue("");
      setPasswordDesc("");
      setShowPasswordModal(false);
      fetchList();
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };


  // 🔹 Edit tugmasi bosilganda
  const handleEditPassword = (item: PasswordItem) => {
    setEditPasswordId(item._id);
    setPasswordTitle(item.name);
    setPasswordValue(item.password);
    setPasswordDesc(item.desc);
    setShowEditModal(true);
  };

  // 🔹 Yangilash
  const handleUpdatePassword = async () => {
    if (!editPasswordId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/pass/updatePassword/${editPasswordId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: passwordTitle,
          password: passwordValue,
          desc: passwordDesc,
        }),
      });

      if (!res.ok) {
        let errMsg = "Failed to update password";
        if (res.headers.get("Content-Type")?.includes("application/json")) {
          const err = await res.json();
          errMsg = err.msg || errMsg;
        }
        throw new Error(errMsg);
      }

      setShowEditModal(false);
      fetchList();
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };


  // 🔹 O‘chirish
  const handleDeletePassword = async (id: string) => {
    if (!window.confirm("Are you sure to delete this password?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/pass/deletePassword/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        let errMsg = "Failed to delete password";
        if (res.headers.get("Content-Type")?.includes("application/json")) {
          const err = await res.json();
          errMsg = err.msg || errMsg;
        }
        throw new Error(errMsg);
      }

      fetchList();
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4 list-container">
      <h2 className="list-header">
        📂 {list?.name}
        <Link to="/dashboard">🔙 Back</Link>
      </h2>
      {list?.passwords?.length ? (
        list.passwords.map((item) => (
          <Card key={item._id} className="password-card">
            <div className="password-content">
              <h5>🔑 {item.name}</h5>
              <p><span>🔒</span> {item.password}</p>
              <p className="password-desc"><span>📝</span> {item.desc}</p>
            </div>

            {/* Tugmalar */}
            <div className="password-actions">
              <Button
                variant="outline-success"
                size="sm"
                className="btn-edit"
                onClick={() => handleEditPassword(item)}
              >
                ✏️ Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="btn-delete"
                onClick={() => handleDeletePassword(item._id)}
              >
                🗑️ Delete
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p style={{ color: "#aaa" }}>No passwords yet</p>
      )}

      {/* Add Password */}
      <Button className="btn-add-password" variant="dark" onClick={() => setShowPasswordModal(true)}>
        + Add Password
      </Button>

      {/* Add Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Name"
            value={passwordTitle}
            onChange={(e) => setPasswordTitle(e.target.value)}
            className="mb-3"
          />
          <Form.Control
            type="text"
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            className="mb-3"
          />
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            value={passwordDesc}
            onChange={(e) => setPasswordDesc(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
          <Button className="btn-add-password" onClick={handleAddPassword}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Password Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Name"
            value={passwordTitle}
            onChange={(e) => setPasswordTitle(e.target.value)}
            className="mb-3"
          />
          <Form.Control
            type="text"
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            className="mb-3"
          />
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            value={passwordDesc}
            onChange={(e) => setPasswordDesc(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button className="btn-add-password" onClick={handleUpdatePassword}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListPage;
