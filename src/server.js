import React from "react";
import { renderToString } from "react-dom/server";
import { SheetsRegistry } from "jss";
import { MuiThemeProvider, createGenerateClassName } from "@material-ui/core/styles"; //prettier-ignore
import JssProvider from "react-jss/lib/JssProvider";
import App from "./App";
import * as actions from "./App.actions";
import sk from "@stormkit/api";

global.__STATE__ = {};

export default async (req, res) => {
  const state = global.__STATE__;

  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  await actions.fetchTalks({
    setTalks: talks => {
      state.talks = talks;
    }
  });

  sk.log("request", req);

  const content = renderToString(
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider sheetsManager={sheetsManager}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
  );

  const styles = `<style id="jss-server-side">${sheetsRegistry.toString()}</style>`;
  const script = `<script>window.__STATE__ = ${JSON.stringify(global.__STATE__)}</script>`; // prettier-ignore

  return res.send({
    body: { content, styles, state: script }
  });
};
