/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { ModalProvider } from "./contexts/ModalContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<React.StrictMode><ModalProvider><App /></ModalProvider></React.StrictMode>);
