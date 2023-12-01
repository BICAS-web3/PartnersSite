import { Dashboard } from "@/widgets/dashboard/Dashboard";
import { Layout } from "@/widgets/layout/Layout";

export default function Home() {
  return (
    <Layout activePage="dashboard">
      <Dashboard />
    </Layout>
  );
}
