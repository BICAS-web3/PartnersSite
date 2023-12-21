import { Dashboard } from "@/widgets/dashboard/Dashboard";
import { Layout } from "@/widgets/layout/Layout";
import * as SidebarM from "@/widgets/sidebar/model";
import { useUnit } from "effector-react";
import { useEffect } from "react";
export default function Home() {
  const [isOpened, close, open] = useUnit([
    SidebarM.$isSidebarOpened,
    SidebarM.Close,
    SidebarM.Open,
  ]);

  // useEffect(() => {
  //   window.addEventListener("load", () => {
  //     console.log("asddddd");
  //   });
  // }, []);

  return (
    <Layout activePage="dashboard">
      <Dashboard />
    </Layout>
  );
}
