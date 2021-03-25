import Layout from "../components/Layout";
import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children?: ReactNode;
  name: string;
};

const Index = ({ name }: Props) => {
  return (
    <Layout title="Home | Next.js + TypeScript">
      <h1>Hello {name} 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export async function getServerSideProps(): Promise<{ props: Props }> {
  return { props: { name: "next.js" } };
}

export default Index;
