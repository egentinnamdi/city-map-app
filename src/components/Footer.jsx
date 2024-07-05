import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
    </footer>
  );
}

export default Footer;
