import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Navbar,
  Nav,
  FormControl,
} from "react-bootstrap";
import "./Dashboard.css";
import { API_URL } from "./config";

interface List {
  _id: string;
  name: string;
}

function DashboardPage() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showListModal, setShowListModal] = useState(false);
  const [newListName, setNewListName] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editListName, setEditListName] = useState("");
  const [editListId, setEditListId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Fetch lists
  const fetchLists = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/list/getAllList`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || "Failed to fetch lists");
      }
      const result = await res.json();
      setLists(Array.isArray(result) ? result : result.data || []);
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // 🔹 Add list
  const handleAddList = async () => {
    if (!newListName) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/list/addList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newListName }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || "Failed to add list");
      }
      setNewListName("");
      setShowListModal(false);
      fetchLists();
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Edit modalni ochish
  const handleOpenEditModal = (list: List) => {
    setEditListId(list._id);
    setEditListName(list.name);
    setShowEditModal(true);
  };

  // 🔹 Update list
  const handleUpdateList = async () => {
    if (!editListId || !editListName) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/list/updateList/${editListId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editListName }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || "Failed to update list");
      }
      setShowEditModal(false);
      fetchLists();
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete list
  const handleDeleteList = async (id: string) => {
    if (!window.confirm("Are you sure to delete this list?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/list/deleteList/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || "Failed to delete list");
      }
      fetchLists();
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Search
  useEffect(() => {
    if (searchTerm.trim()) {
      setLists((prev) => prev.filter((l) => l.name.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      fetchLists();
    }
  }, [searchTerm]);

  const displayedLists = showAll ? [...lists].reverse() : [...lists].reverse().slice(0, 5);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand href="#">🏠 Home</Navbar.Brand>
        <Nav className="me-auto"></Nav>
        <Form className="d-flex mx-auto" style={{ width: "400px" }}>
          <FormControl
            type="search"
            placeholder="🔍 Search lists..."
            className="me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
        <Nav>
          <Nav.Link href="#">⚙️ Preferences</Nav.Link>
        </Nav>
      </Navbar>

      <Container className="my-4">
        <div className="dashboard-header">
          <h2>Your Lists</h2>
          <Button className="btn-add-list" onClick={() => setShowListModal(true)}>
            ➕ Add New List
          </Button>
        </div>

        {loading && <Spinner animation="border" variant="light" />}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="g-4">
          {displayedLists?.map((list) => (
            <Col md={4} key={list._id}>
              <Card className="card-list">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/list/${list._id}`} style={{ color: "#ffd700", textDecoration: "none" }}>
                      {list.name}
                    </Link>
                  </Card.Title>
                  <div className="mt-3 d-flex justify-content-between">
                    <Button variant="outline-success" size="sm" onClick={() => handleOpenEditModal(list)}>
                      ✏️ Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteList(list._id)}>
                      🗑️ Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {lists.length > 5 && (
          <div className="text-center mt-4">
            <Button variant="dark" className="toggle-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? "⬆️ Show Less" : "⬇️ Show All Lists"}
            </Button>
          </div>
        )}
      </Container>

      {/* Add List Modal */}
      <Modal show={showListModal} onHide={() => setShowListModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="List name" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowListModal(false)}>Cancel</Button>
          <Button variant="dark" onClick={handleAddList}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit List Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" value={editListName} onChange={(e) => setEditListName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="dark" onClick={handleUpdateList}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DashboardPage;
