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

type MetaTag = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>;

const Layout = ({ children, title, props }: Props) => {
  let currentKey = 0;

  function getMetaTag(
    props: SSRProps | undefined,
    propertyValue: any | undefined,
    propertyName: string,
    fallbackValue: string
  ): MetaTag | undefined {
    if (!props) {
      return (
        <meta
          key={currentKey++}
          property={propertyName}
          content={fallbackValue}
        />
      );
    } else if (!propertyValue) {
      return undefined;
    }

    return (
      <meta
        key={currentKey++}
        property={propertyName}
        content={propertyValue}
      />
    );
  }

  function getTags(
    props: SSRProps | undefined,
    title: string | undefined
  ): (MetaTag | undefined)[] {
    let tags: (MetaTag | undefined)[] = [];

    tags.push(getMetaTag(props, title, "og:title", "Home | Reflect"));
    tags.push(
      getMetaTag(props, props?.url, "og:url", "https://reflect.vercel.app/")
    );
    tags.push(getMetaTag(props, props?.site_name, "site_name", "Reflect"));
    tags.push(
      getMetaTag(
        props,
        props?.description,
        "og:description",
        "A Quick and Easy Url Shortener build with next.js"
      )
    );
    tags.push(
      getMetaTag(
        props,
        props?.image,
        "og:image",
        "https://reflect.vercel.app/static/images/preview.jpg"
      )
    );

    return tags;
  }

  return (
    <div>
      <Head>
        <title>{title ?? "Home | Reflect"}</title>
        <meta charSet="utf-8" />
        {getTags(props, title).map((item) => item ?? <></>)}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        {/* <link rel="shortcut icon" href="/static/favicon.ico" /> */}
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
};

export default Layout;
