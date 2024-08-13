import { Outlet } from "react-router-dom";
import AppNav from "../../components/AppNav/AppNav";
import Logo from "../../ui/Logo/Logo";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright 2023 - {new Date().getFullYear()} by Track-Or-Trick Ltd.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;