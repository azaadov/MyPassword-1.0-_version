"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const RegisterPage_1 = __importDefault(require("./pages/RegisterPage"));
const LoginPage_1 = __importDefault(require("./pages/LoginPage"));
const ListPage_1 = __importDefault(require("./pages/ListPage"));
const Homepage_1 = __importDefault(require("./pages/Homepage"));
const ContactPage_1 = __importDefault(require("./pages/ContactPage"));
const DashboardPage_1 = __importDefault(require("./DashboardPage"));
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard", element: (0, jsx_runtime_1.jsx)(DashboardPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Homepage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: (0, jsx_runtime_1.jsx)(RegisterPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(LoginPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/list/:id", element: (0, jsx_runtime_1.jsx)(ListPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/contact", element: (0, jsx_runtime_1.jsx)(ContactPage_1.default, {}) })] }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map