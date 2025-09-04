"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
require("./Dashboard.css");
function DashboardPage() {
    const [lists, setLists] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)("");
    const [showListModal, setShowListModal] = (0, react_1.useState)(false);
    const [newListName, setNewListName] = (0, react_1.useState)("");
    const [showEditModal, setShowEditModal] = (0, react_1.useState)(false);
    const [editListName, setEditListName] = (0, react_1.useState)("");
    const [editListId, setEditListId] = (0, react_1.useState)(null);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [showAll, setShowAll] = (0, react_1.useState)(false);
    const token = localStorage.getItem("token");
    const fetchLists = async () => {
        if (!token)
            return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:4000/list/getAllList", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.msg || "Failed to fetch lists");
            }
            const result = await res.json();
            setLists(Array.isArray(result) ? result : result.data || []);
        }
        catch (err) {
            setError(err.message || "Server error");
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchLists();
    }, []);
    const handleAddList = async () => {
        if (!newListName)
            return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:4000/list/addList", {
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
        }
        catch (err) {
            setError(err.message || "Server error");
        }
        finally {
            setLoading(false);
        }
    };
    const handleOpenEditModal = (list) => {
        setEditListId(list._id);
        setEditListName(list.name);
        setShowEditModal(true);
    };
    const handleUpdateList = async () => {
        if (!editListId || !editListName)
            return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`http://localhost:4000/list/updateList/${editListId}`, {
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
        }
        catch (err) {
            setError(err.message || "Server error");
        }
        finally {
            setLoading(false);
        }
    };
    const handleDeleteList = async (id) => {
        if (!window.confirm("Are you sure to delete this list?"))
            return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`http://localhost:4000/list/deleteList/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.msg || "Failed to delete list");
            }
            fetchLists();
        }
        catch (err) {
            setError(err.message || "Server error");
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        if (searchTerm.trim()) {
            setLists((prev) => prev.filter((l) => l.name.toLowerCase().includes(searchTerm.toLowerCase())));
        }
        else {
            fetchLists();
        }
    }, [searchTerm]);
    const displayedLists = showAll ? [...lists].reverse() : [...lists].reverse().slice(0, 5);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_bootstrap_1.Navbar, { bg: "dark", variant: "dark", expand: "lg", className: "px-4", children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Navbar.Brand, { href: "#", children: "\uD83C\uDFE0 Home" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav, { className: "me-auto" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form, { className: "d-flex mx-auto", style: { width: "400px" }, children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.FormControl, { type: "search", placeholder: "\uD83D\uDD0D Search lists...", className: "me-2", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav.Link, { href: "#", children: "\u2699\uFE0F Preferences" }) })] }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Container, { className: "my-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "dashboard-header", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Your Lists" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { className: "btn-add-list", onClick: () => setShowListModal(true), children: "\u2795 Add New List" })] }), loading && (0, jsx_runtime_1.jsx)(react_bootstrap_1.Spinner, { animation: "border", variant: "light" }), error && (0, jsx_runtime_1.jsx)(react_bootstrap_1.Alert, { variant: "danger", children: error }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Row, { className: "g-4", children: displayedLists?.map((list) => ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { md: 4, children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card, { className: "card-list", children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Title, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/list/${list._id}`, style: { color: "#ffd700", textDecoration: "none" }, children: list.name }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 d-flex justify-content-between", children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "outline-success", size: "sm", onClick: () => handleOpenEditModal(list), children: "\u270F\uFE0F Edit" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "outline-danger", size: "sm", onClick: () => handleDeleteList(list._id), children: "\uD83D\uDDD1\uFE0F Delete" })] })] }) }) }, list._id))) }), lists.length > 5 && ((0, jsx_runtime_1.jsx)("div", { className: "text-center mt-4", children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "dark", className: "toggle-btn", onClick: () => setShowAll(!showAll), children: showAll ? "⬆️ Show Less" : "⬇️ Show All Lists" }) }))] }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal, { show: showListModal, onHide: () => setShowListModal(false), children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Header, { closeButton: true, children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Title, { children: "Add New List" }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Body, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "text", placeholder: "List name", value: newListName, onChange: (e) => setNewListName(e.target.value) }) }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal.Footer, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "secondary", onClick: () => setShowListModal(false), children: "Cancel" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "dark", onClick: handleAddList, children: "Save" })] })] }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal, { show: showEditModal, onHide: () => setShowEditModal(false), children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Header, { closeButton: true, children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Title, { children: "Edit List" }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Body, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "text", value: editListName, onChange: (e) => setEditListName(e.target.value) }) }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal.Footer, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "secondary", onClick: () => setShowEditModal(false), children: "Cancel" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "dark", onClick: handleUpdateList, children: "Save Changes" })] })] })] }));
}
exports.default = DashboardPage;
//# sourceMappingURL=DashboardPage.js.map