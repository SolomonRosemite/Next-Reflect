import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import styles from "../styles/Home.module.scss";
import Button from "@material-ui/core/Button";

import React from "react";
import { TextField } from "@material-ui/core";

type Props = {};

const Home = ({}: Props) => {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1 className={styles.title}>
          Welcome to <span style={{ color: "#0070f3" }}>Reflect!</span>
        </h1>
        <p className={styles.note}>Easy create a Url Shortener with Reflect</p>
        <div
          style={{
            display: "inline",
            textAlign: "center",
            paddingBottom: "30px",
          }}
        >
          <TextField id="standard-basic" label="Slogan" />
          <ArrowForwardIcon
            style={{ margin: "0 100px 0 80px" }}
            fontSize="large"
          />
          <TextField id="standard-basic" label="Result" />
        </div>
        <Button variant="outlined" color="primary">
          Create Shortened Url
        </Button>
      </section>
    </main>
  );
};

export default Home;
