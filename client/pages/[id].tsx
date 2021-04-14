import Layout, { Props, SSRProps } from "../components/Layout";
import React, { ReactNode } from "react";
import { Router, useRouter } from "next/router";
import Home from "../components/Home";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";

// type Props = {
//   children?: ReactNode;
//   name: string;
// };

const Index = ({ title, props }: Props) => {
  return (
    <Layout title={title} props={props}>
      <h1>Test</h1>
    </Layout>
  );
};

// export async function getServerSideProps(context): Promise<{ props: Props }> {
// const { pid } = router.query;
// const router = useRouter();
//   console.log(pid);

//   // const result = await fetch(pid);
//   return { props: { title: "Reflect" } };
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    "https://api.rosemite.cf:7001/url?slogan=" + context.query.id
  );

  if (res.status != 200) {
    return { props: {} };
  }

  const data = await res.json();
  console.log(data);
  return {
    props: { title: data.title, props: { ...data, site_name: "Test!!" } },
  };
  // try {
  //   if (condition) {

  //   }
  //   const data = await res.json();
  //   console.log(data);

  //   // const data: Props = await res.json();
  //   return { props: { ...data } };
  // } catch {
  //   console.log("hi");

  //   return { props: { title: "Home | Reflect" } };
  // }
};

export default Index;
