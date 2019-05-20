import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import { fetchTalks } from "./App.actions";

function App({ classes } = {}) {
  const [talks, setTalks] = useState((global.__STATE__ || {}).talks || []);

  useEffect(() => {
    if (talks.length === 0) {
      fetchTalks({ setTalks });
    }
  }, [setTalks, talks]);

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <svg id="keyboard" viewBox="0 0 20 20" className={classes.logoSvg}>
            <path d="M0 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2 0v2h2V6H2zm1 3v2h2V9H3zm-1 3v2h2v-2H2zm3 0v2h10v-2H5zm11 0v2h2v-2h-2zM6 9v2h2V9H6zm3 0v2h2V9H9zm3 0v2h2V9h-2zm3 0v2h2V9h-2zM5 6v2h2V6H5zm3 0v2h2V6H8zm3 0v2h2V6h-2zm3 0v2h4V6h-4z" />
          </svg>
        </div>
        <h2>Web Zürich</h2>
      </header>
      <div className={classes.row}>
        {talks.map(talk => (
          <div className={classes.talk} key={talk.id}>
            <div className={classes.authors}>
              {(talk.image || []).map((img, i) => (
                <div className={classes.author} key={`${talk.id}-${i}`}>
                  <Avatar
                    alt={talk.authors[i]}
                    src={img}
                    className={classes.avatar}
                  />
                  {talk.authors[i]}
                </div>
              ))}
            </div>
            <Card className={classes.card}>
              <CardHeader title={talk.title} subheader={talk.speechStatus} />
              <CardContent>{talk.description}</CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withStyles({
  header: {
    maxWidth: 1024,
    margin: "1rem auto",
    display: "flex",
    alignItems: "center",
    color: "white"
  },
  logo: {
    background: "#007ad1",
    borderRadius: "50%",
    width: "3rem",
    height: "3rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "1rem"
  },
  logoSvg: {
    fill: "hsla(0,0%,100%,.8)",
    width: "1.5rem",
    height: "1.5rem"
  },
  row: {
    display: "flex",
    maxWidth: 1024,
    margin: "0 auto",
    marginBottom: "1rem",
    flexDirection: "column"
  },
  talk: {
    marginTop: "2rem",
    marginRight: "1rem"
  },
  authors: {
    display: "flex",
    paddingBottom: "1rem",
    alignItems: "center",
    color: "white"
  },
  author: {
    marginRight: "1rem",
    display: "inline-flex",
    alignItems: "center"
  },
  avatar: {
    marginRight: "0.5rem"
  },
  card: {
    flex: "1 1 auto",
    minWidth: 320,
    minHeight: 150
  }
})(App);
