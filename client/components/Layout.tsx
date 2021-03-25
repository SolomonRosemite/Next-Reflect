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
      <meta property="og:url" content="https://reflect.vercel.app/" />
      <meta property="og:site_name" content="Reflect" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        property="og:description"
        content="A Quick and Easy Url Shortener build with next.js"
      />
      <meta
        property="og:image"
        content="https://reflect.vercel.app/static/images/preview.jpg"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
    <div>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </div>
    {children}
  </div>
);

export default Layout;
