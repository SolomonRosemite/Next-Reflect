import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

export type Props = {
  children?: ReactNode;
  title?: string;
  props?: SSRProps;
};

export type SSRProps = {
  url: string;
  image: string;
  site_name: string;
  description: string;
};

const Layout = ({ children, title, props }: Props) => (
  <div>
    <Head>
      <title>{title ?? "Home | Reflect"}</title>
      <meta charSet="utf-8" />
      <meta property="og:title" content={title ?? "Home | Reflect"} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:url"
        content={props?.url ?? "https://reflect.vercel.app/"}
      />
      <meta property="og:site_name" content={props?.site_name ?? "Reflect"} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        property="og:description"
        content={
          props?.description ??
          "A Quick and Easy Url Shortener build with next.js"
        }
      />
      <meta
        property="og:image"
        content={
          props?.image ?? "https://reflect.vercel.app/static/images/preview.jpg"
        }
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
