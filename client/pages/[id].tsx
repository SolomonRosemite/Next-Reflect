import Layout, { Props, SSRProps } from "../components/Layout";
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import fetch from "node-fetch";

const Index = ({ title, props }: Props) => {
  useEffect(() => {
    window.location.assign(props?.url ?? "https://reflect.vercel.app/");
  });
  return (
    <Layout title={title} props={props}>
      <></>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    "https://reflect.rosemite.dev/v1/url?slogan=" + context.query.id
  );

  if (res.status != 200) {
    return { props: {} };
  }

  const data = await res.json();
  console.log(data);
  return {
    props: { title: data.title, props: { ...data } },
  };
};

export default Index;
