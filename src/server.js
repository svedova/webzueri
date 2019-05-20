import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import * as actions from "./App.actions";
import sk from "@stormkit/api";

export default async (req, res) => {
  global.__STATE__ = {};

  await actions.fetchTalks({
    setTalks: talks => {
      global.__STATE__.talks = talks;
    }
  });

  sk.log("debug", "Populated state:", global.__STATE__);
  sk.log("request", req);

  return res.send({
    body: {
      content: renderToString(<App />),
      state: `<script>window.__STATE__ = ${JSON.stringify(
        global.__STATE__
      )}</script>`
    }
  });
};
