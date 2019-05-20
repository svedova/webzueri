import React from "react";
import { renderToString } from "react-dom";
import App from "./App";
import { fetchTalks } from "./App.actions";

export default async (req, res) => {
  const state = {};

  await fetchTalks({
    setTalks: talks => {
      state.talks = talks;
    }
  });

  return res.send({
    body: {
      content: renderToString(<App />),
      state: `<script>window.__STATE__ = ${JSON.stringify(state)}</script>`
    }
  });
};
