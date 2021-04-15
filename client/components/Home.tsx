import "bootstrap/dist/css/bootstrap.min.css";

import styles from "../styles/Home.module.scss";
import { Button, Form } from "react-bootstrap";
import React from "react";

type Props = {};

const Home = ({}: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <section>
          <h1 className={styles.title}>
            Welcome to <span style={{ color: "#0070f3" }}>Reflect!</span>
          </h1>
          <h3 className={styles.subTitle}>
            Create easy a Url Shortener with Reflect
          </h3>
          <hr />
          <p className={styles.subParagraph}>
            This is a Url Shortener made with next.js that helps you shorten
            long website urls
          </p>
        </section>
        <section className={styles.inputs}>
          <div>
            {/* <TextField color="primary" placeholder="Slogan - Github" /> */}
          </div>
          <div>
            {/* <TextField placeholder="Original Url - https://github.com/YourUsername" /> */}
          </div>

          <div>
            <Form.Control
              type="text"
              placeholder="Readonly input here..."
              readOnly
            />
            {/* <TextField placeholder="Final Url here" /> */}
          </div>

          <div className={styles.submitButtons}>
            <Button color="primary" onClick={handleClick}>
              Save
            </Button>
            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                This is a success message!
              </Alert>
            </Snackbar> */}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;
