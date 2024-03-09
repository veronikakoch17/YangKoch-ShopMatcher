import "../global.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { PopupFrame } from "./screens/PopupFrame";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<PopupFrame />);
