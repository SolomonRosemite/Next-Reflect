import React from "react";
import styles from "../styles/Home.module.scss";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

type Props = {};

const Home = ({}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <section className={styles.top}>
        <h1 className={styles.title}>Reflect</h1>
        <p>Easy create a Url Shortener with Reflect</p>
      </section>
      <section>
        <input type="text" />
        <Button variant="outlined">Create Shortened Url</Button>
      </section>
    </div>
  );
};

export default Home;
