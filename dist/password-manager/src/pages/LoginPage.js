"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const react_router_dom_1 = require("react-router-dom");
require("./Auth.css");
function LoginPage() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)("");
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.message || "Login failed");
            localStorage.setItem("token", data.access_token);
            navigate("/dashboard");
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    const togglePassword = () => setShowPassword(!showPassword);
    return ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Container, { className: "auth-page d-flex justify-content-center align-items-center", children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, { className: "auth-card p-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-center mb-4", children: "Login" }), error && (0, jsx_runtime_1.jsx)(react_bootstrap_1.Alert, { variant: "danger", children: error }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form, { onSubmit: handleLogin, children: [(0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form.Group, { className: "mb-3", children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, { children: "Email" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "email", placeholder: "Enter email", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form.Group, { className: "mb-3", children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, { children: "Password" }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.InputGroup, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: showPassword ? "text" : "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "outline-secondary", type: "button", onClick: togglePassword, children: showPassword ? "Hide" : "Show" })] })] }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { type: "submit", className: "w-100", variant: "warning", disabled: loading, children: loading ? (0, jsx_runtime_1.jsx)(react_bootstrap_1.Spinner, { animation: "border", size: "sm" }) : "Login" })] }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-3 text-center text-secondary", children: ["Don\u2019t have an account? ", (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/register", children: "Register" })] })] }) }));
}
exports.default = LoginPage;
//# sourceMappingURL=LoginPage.js.map