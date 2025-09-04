"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
require("./ListPage.css");
function ListPage() {
    const { id } = (0, react_router_dom_1.useParams)();
    const [list, setList] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)("");
    const [showPasswordModal, setShowPasswordModal] = (0, react_1.useState)(false);
    const [passwordTitle, setPasswordTitle] = (0, react_1.useState)("");
    const [passwordValue, setPasswordValue] = (0, react_1.useState)("");
    const [passwordDesc, setPasswordDesc] = (0, react_1.useState)("");
    const [showEditModal, setShowEditModal] = (0, react_1.useState)(false);
    const [editPasswordId, setEditPasswordId] = (0, react_1.useState)(null);
    const token = localStorage.getItem("token");
    const fetchList = async () => {
        if (!token)
            return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`http://localhost:4000/list/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await res.json();
            if (!res.ok)
                throw new Error(result.msg || "Failed to fetch list");
            setList(result);
        }
        catch (err) {
            setError(err.message || "Server error");
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchList();
    }, [id]);
    const handleAddPassword = async () => {
        if (!passwordTitle || !passwordValue || !id)
            return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`http://localhost:4000/pass/addPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: passwordTitle,
                    password: passwordValue,
                    desc: passwordDesc || "No description",
                    listId: id,
                }),
            });
            const result = await res.json();
            if (!res.ok)
                throw new Error(result.msg || "Failed to add password");
            setPasswordTitle("");
            setPasswordValue("");
            setPasswordDesc("");
            setShowPasswordModal(false);
            fetchList();
        }
        catch (err) {
            setError(err.message || "Server error");
        }
        finally {
            setLoading(false);
        }
    };
    const handleEditPassword = (item) => {
        setEditPasswordId(item._id);
        setPasswordTitle(item.name);
        setPasswordValue(item.password);
        setPasswordDesc(item.desc);
        setShowEditModal(true);
    };
    const handleUpdatePassword = async () => {
        if (!editPasswordId)
            return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`http://localhost:4000/pass/updatePassword/${editPasswordId}`, {
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
        }
        catch (err) {
            setError(err.message || "Server error");
        }
        finally {
            setLoading(false);
        }
    };
    const handleDeletePassword = async (id) => {
        if (!window.confirm("Are you sure to delete this password?"))
            return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`http://localhost:4000/pass/deletePassword/${id}`, {
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
        }
        catch (err) {
            setError(err.message || "Server error");
        }
        finally {
            setLoading(false);
        }
    };
    if (loading)
        return (0, jsx_runtime_1.jsx)(react_bootstrap_1.Spinner, { animation: "border", className: "mt-5" });
    if (error)
        return (0, jsx_runtime_1.jsx)(react_bootstrap_1.Alert, { variant: "danger", children: error });
    return ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Container, { className: "mt-4 list-container", children: [(0, jsx_runtime_1.jsxs)("h2", { className: "list-header", children: ["\uD83D\uDCC2 ", list?.name, (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/dashboard", children: "\uD83D\uDD19 Back" })] }), list?.passwords?.length ? (list.passwords.map((item) => ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, { className: "password-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "password-content", children: [(0, jsx_runtime_1.jsxs)("h5", { children: ["\uD83D\uDD11 ", item.name] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDD12" }), " ", item.password] }), (0, jsx_runtime_1.jsxs)("p", { className: "password-desc", children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDCDD" }), " ", item.desc] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "password-actions", children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "outline-success", size: "sm", className: "btn-edit", onClick: () => handleEditPassword(item), children: "\u270F\uFE0F Edit" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "outline-danger", size: "sm", className: "btn-delete", onClick: () => handleDeletePassword(item._id), children: "\uD83D\uDDD1\uFE0F Delete" })] })] }, item._id)))) : ((0, jsx_runtime_1.jsx)("p", { style: { color: "#aaa" }, children: "No passwords yet" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { className: "btn-add-password", variant: "dark", onClick: () => setShowPasswordModal(true), children: "+ Add Password" }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal, { show: showPasswordModal, onHide: () => setShowPasswordModal(false), centered: true, children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Header, { closeButton: true, children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Title, { children: "Add Password" }) }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Name", value: passwordTitle, onChange: (e) => setPasswordTitle(e.target.value), className: "mb-3" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Password", value: passwordValue, onChange: (e) => setPasswordValue(e.target.value), className: "mb-3" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { as: "textarea", rows: 3, placeholder: "Description", value: passwordDesc, onChange: (e) => setPasswordDesc(e.target.value) })] }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal.Footer, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "secondary", onClick: () => setShowPasswordModal(false), children: "Cancel" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { className: "btn-add-password", onClick: handleAddPassword, children: "Save" })] })] }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal, { show: showEditModal, onHide: () => setShowEditModal(false), centered: true, children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Header, { closeButton: true, children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Title, { children: "Edit Password" }) }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Name", value: passwordTitle, onChange: (e) => setPasswordTitle(e.target.value), className: "mb-3" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Password", value: passwordValue, onChange: (e) => setPasswordValue(e.target.value), className: "mb-3" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { as: "textarea", rows: 3, placeholder: "Description", value: passwordDesc, onChange: (e) => setPasswordDesc(e.target.value) })] }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal.Footer, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "secondary", onClick: () => setShowEditModal(false), children: "Cancel" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { className: "btn-add-password", onClick: handleUpdatePassword, children: "Save Changes" })] })] })] }));
}
exports.default = ListPage;
//# sourceMappingURL=ListPage.js.map