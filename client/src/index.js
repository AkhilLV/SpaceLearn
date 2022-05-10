import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ModalProvider } from "./contexts/ModalContext";

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<React.StrictMode><ModalProvider><App /></ModalProvider></React.StrictMode>, document.getElementById("root"));
