import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title: string;
};

const Layout = ({ children, title }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta property="og:title" content={title} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:url" content="next-js-url-shortener.vercel.app" />
      <meta property="og:site_name" content="Url Shortener" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        property="og:description"
        content="A Quick and Easy Url Shortener build with next.js"
      />
      <meta property="og:image" content={"/static/images/preview.jpg"} />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/about">
          <a>About</a>
        </Link>{" "}
        |{" "}
        <Link href="/users">
          <a>Users List</a>
        </Link>{" "}
        | <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
