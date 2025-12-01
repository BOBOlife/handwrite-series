
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Hello } from "./Hello.jsx";

hydrateRoot(document.getElementById("app"), <Hello />);

