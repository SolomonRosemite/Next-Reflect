import "bootstrap/dist/css/bootstrap.min.css";

import React, { ChangeEventHandler, useState } from "react";
import styles from "../styles/Home.module.scss";
import { Button, Form } from "react-bootstrap";

import Image from "next/image";

import fetch from "node-fetch";

const apiUrl = "https://api.rosemite.cf:7001/url";

type Props = {};

const Home = ({}: Props) => {
  const repoUrl = "https://github.com/SolomonRosemite/Next-Reflect";
  const hostname = "reflect.vercel.app";
  const defaultRedirectUrl = repoUrl;
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

  function openSourceCodeClick() {
    if (window && window.open != null) {
      // window.location.
      // window.open(a"repoUrl", "_blank").focus();
    }
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
          <div className={styles.center}>
            <p className={styles.subParagraph}>
              This is a Url Shortener made with next.js that helps you shorten
              long website urls.
            </p>
          </div>
        </section>
        <Form className={styles.form}>
          <Form.Group>
            <Form.Label>Slogan</Form.Label>
            <Form.Control
              onChange={(event) => {
                setSuccessful(false);
                setSlogan(event.target.value);
              }}
              type="text"
              placeholder="Reflect"
            />
            <Form.Text className="text-muted">
              Choose a preferred slogan for your shorten link.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Redirect Url</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setSuccessful(false);
                setRedirectUrl(event.target.value);
              }}
              placeholder="https://github.com/SolomonRosemite/Next-Reflect"
            />
            <Form.Text className="text-muted">
              Enter the url you want to shorten here.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Result</Form.Label>
            <Form.Control
              type="text"
              value={`https://${hostname}/${slogan}`}
              readOnly
            />
          </Form.Group>
          <section className={styles.center}>
            <Button onClick={handleApplyClick} variant="success">
              Apply
            </Button>
            {successful ? (
              <Button
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
          </section>
          <section className={styles.qrCodeSection}>
            <div className={styles.left}>
              <h3>QR Code</h3>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt blanditiis officia itaque sequi natus aut impedit
                  quae debitis illo deserunt nisi voluptates consequatur qui,
                  rerum autem assumenda eligendi iure voluptatem.
                </p>

                <a href={repoUrl} target="_blank">
                  <Button className={styles.btn} variant="primary">
                    <img
                      src="https://res.cloudinary.com/rosemite/image/upload/v1618673889/GitHub-Mark-Light-32px_eykcyw.png"
                      alt="github logo"
                    />
                    View the source code
                  </Button>
                </a>
              </div>
            </div>
            <div className={styles.qrCodeDiv}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/QR_deWP.svg/1200px-QR_deWP.svg.png"
                alt="qr code"
              />
            </div>
          </section>
        </Form>
        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                This is a success message!
              </Alert>
            </Snackbar> */}
      </section>
    </main>
  );
};

export default Home;
