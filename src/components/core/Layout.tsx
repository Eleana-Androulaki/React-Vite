import { Outlet } from "react-router-dom";
import { useGeneralStore } from "~/stores";
import Header from "./Header";
import Loader from "./Loader";
import Modal from "./Modal";
import Toast from "./Toast";

const Layout = () => {
  const { loading } = useGeneralStore();
  return (
    <>
      <Loader loading={loading} />
      <Modal />
      <Toast />
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
