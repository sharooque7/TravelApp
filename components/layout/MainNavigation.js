import classes from "./MainNavigation.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { style } from "dom-helpers";

function MainNavigation() {
  const router = useRouter();
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    router.push("/login");
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Travel Destination</div>
      <nav>
        <ul>
          <li>
            <Link href="/homepage">All Destination</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Destination</Link>
          </li>
          <li>
            <a className={classes.tag} onClick={handleClick}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
