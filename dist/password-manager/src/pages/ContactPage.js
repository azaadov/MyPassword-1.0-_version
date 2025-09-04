"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_bootstrap_1 = require("react-bootstrap");
const telegram_png_1 = __importDefault(require("../assets/telegram.png"));
const linkedinn_png_1 = __importDefault(require("../assets/linkedinn.png"));
const github_png_1 = __importDefault(require("../assets/github.png"));
const instagram_png_1 = __importDefault(require("../assets/instagram.png"));
require("./ContactPage.css");
function ContactPage() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "contact-page", children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Container, { className: "text-center py-5", children: [(0, jsx_runtime_1.jsx)("h1", { className: "mb-5 text-white", children: "Contact & Socials" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Row, { className: "g-4 justify-content-center", children: [
                        { logo: telegram_png_1.default, title: "Telegram", link: "https://t.me/azadovfx" },
                        { logo: linkedinn_png_1.default, title: "LinkedIn", link: "https://www.linkedin.com/in/kamron-azodov-8148a234b/" },
                        { logo: github_png_1.default, title: "GitHub", link: "https://github.com/azaadov" },
                        { logo: instagram_png_1.default, title: "Instagram", link: "https://www.instagram.com/_axi.y_/" }
                    ].map((item, idx) => ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { md: 3, children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, { className: "p-4 contact-card bg-dark text-center", children: [(0, jsx_runtime_1.jsx)("a", { href: item.link, target: "_blank", rel: "noreferrer", children: (0, jsx_runtime_1.jsx)("img", { src: item.logo, alt: item.title, width: 50 }) }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Title, { className: "text-white", children: item.title }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Text, { className: "text-secondary", children: ["Reach me on ", item.title] })] })] }) }, idx))) })] }) }));
}
exports.default = ContactPage;
//# sourceMappingURL=ContactPage.js.map