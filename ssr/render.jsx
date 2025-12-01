import React from "react";
import { renderToString } from "react-dom/server";
import { Hello } from "./Hello.jsx";

export const render = () => {
  const appHtml = renderToString(<Hello/>)
  return appHtml
}