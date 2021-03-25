import Layout from "../components/Layout";
import React, { ReactNode } from "react";
import Link from "next/link";
import Home from "../components/Home";

type Props = {
  children?: ReactNode;
  name: string;
};

const Index = ({ name }: Props) => {
  return (
    <Layout title={`Home | ${name}`}>
      {/* <h1>Hello {name} 👋</h1> */}
      <Home />
    </Layout>
  );
};

export async function getServerSideProps(): Promise<{ props: Props }> {
  return { props: { name: "Reflect" } };
}

export default Index;
