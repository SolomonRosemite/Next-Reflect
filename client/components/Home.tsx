import "bootstrap/dist/css/bootstrap.min.css";

import React, { ChangeEventHandler, useState } from "react";
import styles from "../styles/Home.module.scss";
import { Button, Form, Modal } from "react-bootstrap";

import fetch from "node-fetch";
import QRCode from "qrcode";

const apiUrl = "https://api.rosemite.cf:7001/url";
const repoUrl = "https://github.com/SolomonRosemite/Next-Reflect";
const hostname = "reflect.vercel.app";
const defaultRedirectUrl = repoUrl;
const defaultSlogan = "reflect";

interface IMessage {
  message: string;
  subTitle: string;
  title?: string;
}

const Home = () => {
  const [modalShow, setModalShow] = useState(false);

  const [successful, setSuccessful] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(defaultRedirectUrl);
  const [slogan, setSlogan] = useState(defaultSlogan);
  const [qrCodeValue, setQrCodeValue] = useState("");

  const [message, setMessage] = useState<IMessage>();

  getQRCode(`https://${hostname}/${slogan}`).then((res) => {
    setQrCodeValue(res);
  });

  async function handleApplyClick() {
    if (!isValidURL(redirectUrl)) {
      setMessage({
        subTitle: "Invalid Url",
        message: "The Specified url is not valid. Please try again.",
      });
      setModalShow(true);
      return;
    }

    const requestUrl = `${apiUrl}?slogan=${slogan}&originalUrl=${redirectUrl}`;

    // If url redirects back or to it self.
    if (requestUrl.includes(hostname)) {
      setMessage({
        subTitle: "Invalid Url",
        message: "The used redirect url can't be used. Please try again.",
      });
      setModalShow(true);
      return;
    }

    const result = await fetch(requestUrl, { method: "POST" });

    // (Conflict) If slogan is already in use.
    if (result.status == 409) {
      setMessage({
        subTitle: "Slogan taken",
        message: "Sorry this slogan is already in use. Please try again.",
      });
      setModalShow(true);
      return;
    }

    if (result.status == 200) {
      setSuccessful(true);
      return;
    }

    setMessage({
      subTitle: "Unexpected Error",
      message: "Something went very wrong here... Please try again.",
    });
    setModalShow(true);
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

  async function getQRCode(url: string) {
    return await QRCode.toDataURL(url);
  }

  function IssueModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {message?.title ?? "Sorry, something went wrong..."}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{message?.subTitle}</h4>
          <p>{message?.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <section>
          <h1 className={styles.title}>
            Welcome to <span style={{ color: "#0070f3" }}>Reflect!</span>
          </h1>
          <h3 className={styles.subTitle}>
            Easily create a shorten url with Reflect
          </h3>
          <hr color={"white"} />
          <div className={styles.center}>
            <p className={styles.subParagraph}>
              This application allows to shorten long website urls. These
              shorten urls can easily be accessed and even scan using the
              QR-Code.
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
            <Form.Text className="text-muted">
              View to resulting url here and when you feel ready hit the create
              button.
            </Form.Text>
          </Form.Group>
          <section className={styles.center}>
            <Button onClick={handleApplyClick} variant="success">
              Create
            </Button>
            {successful ? (
              <>
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
                <Button
                  onClick={() => {
                    navigator.share({
                      title: document.title,
                      url: `https://${hostname}/${slogan}`,
                    });
                  }}
                  variant="secondary"
                >
                  Share
                </Button>
              </>
            ) : (
              <></>
            )}
          </section>
          <section className={styles.qrCodeSection}>
            <div className={styles.left}>
              <h3>QR Code</h3>
              <div>
                <p>
                  Feel free to scan and share the QR-Code shown on the right, to
                  also access to the shortened url.
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
                // src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/QR_deWP.svg/1200px-QR_deWP.svg.png"
                src={qrCodeValue}
                style={{ color: "#232627" }}
              />
            </div>
          </section>
        </Form>
        <IssueModal show={modalShow} onHide={() => setModalShow(false)} />
      </section>
    </main>
  );
};

export default Home;
