import "bootstrap/dist/css/bootstrap.min.css";

import React, { ChangeEventHandler, useState } from "react";
import styles from "../styles/Home.module.scss";
import { Button, Form } from "react-bootstrap";

import fetch from "node-fetch";

const apiUrl = "https://api.rosemite.cf:7001/url";

type Props = {};

const Home = ({}: Props) => {
  const hostname = "reflect.vercel.app";
  const defaultRedirectUrl = "https://github.com/SolomonRosemite/Next-Reflect";
  const defaultSlogan = "reflect";

  const [successful, setSuccessful] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(defaultRedirectUrl);
  const [slogan, setSlogan] = useState(defaultSlogan);

  async function handleApplyClick() {
    console.log(redirectUrl);

    if (!isValidURL(redirectUrl)) {
      // Todo: Handle
      return;
    }

    const requestUrl = `${apiUrl}?slogan=${slogan}&originalUrl=${redirectUrl}`;
    console.log(requestUrl);

    // If url redirects back or to it self.
    if (requestUrl.includes(hostname)) {
      // Todo: Handle
      return;
    }

    const result = await fetch(requestUrl, { method: "POST" });

    // (Conflict) If slogan is already in use.
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
          <hr color={"white"} />
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
              value={`https://${hostname}/${slogan}`}
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
                    `https://${hostname}/${slogan}`
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
