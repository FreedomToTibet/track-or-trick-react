import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = () =>{
  return (
    <Link to="/">
      <img src="./logo.png" alt="Track-Or-Trick logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
