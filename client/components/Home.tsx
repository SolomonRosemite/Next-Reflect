import "bootstrap/dist/css/bootstrap.min.css";

import React, { ChangeEventHandler, useState } from "react";
import styles from "../styles/Home.module.scss";
import { Button, Form } from "react-bootstrap";

import fetch from "node-fetch";

const apiUrl = "https://api.rosemite.cf:7001/url";

type Props = {};

const Home = ({}: Props) => {
  const [successful, setSuccessful] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(
    "https://github.com/SolomonRosemite/Next-Reflect"
  );
  const [slogan, setSlogan] = useState("reflect");

  async function handleApplyClick() {
    console.log(redirectUrl);

    if (!isValidURL(redirectUrl)) {
      // Todo: Handle
      return;
    }

    const requestUrl = `${apiUrl}?slogan=${slogan}&originalUrl=${redirectUrl}`;
    console.log(requestUrl);

    const result = await fetch(requestUrl, { method: "POST" });

    // Conflict
    if (result.status == 409) {
      // Todo: Handle
      return;
    }

    if (result.status == 200) {
      setSuccessful(true);
      return;
    }

    // Todo: Handle unexpected
    console.log(result);
    console.log(result.status);
  }

  function isValidURL(url: string) {
    try {
      new URL(url);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

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
          <div className={styles.input}>
            <Form.Control
              type="text"
              style={{ width: "100%" }}
              placeholder={slogan}
              onChange={(event) => {
                setSuccessful(false);
                setSlogan(event.target.value);
              }}
            />
          </div>
          <div className={styles.input}>
            <Form.Control
              type="text"
              style={{ width: "100%" }}
              placeholder={
                redirectUrl ?? "https://github.com/SolomonRosemite/Next-Reflect"
              }
              onChange={(event) => {
                setSuccessful(false);
                setRedirectUrl(event.target.value);
              }}
            />
          </div>

          <div className={styles.input}>
            <Form.Control
              type="text"
              style={{ width: "100%" }}
              value={"https://reflect.vercel.app/" + slogan}
              readOnly
            />
          </div>

          <div className={styles.submitButton}>
            <Button onClick={handleApplyClick} variant="success">
              Apply
            </Button>
            {successful ? (
              <Button
                style={{ marginLeft: "4em" }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://reflect.vercel.app/" + slogan
                  );
                }}
                variant="primary"
              >
                Copy to Clipboard
              </Button>
            ) : (
              <></>
            )}
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
