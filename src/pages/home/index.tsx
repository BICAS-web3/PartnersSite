import { Dashboard } from "@/widgets/dashboard/Dashboard";
import { Layout } from "@/widgets/layout/Layout";
import { useUnit } from "effector-react";

export default function Home() {
  // const [] = useUnit([])

  return (
    <Layout activePage="dashboard">
      <Dashboard />
    </Layout>
  );
}
