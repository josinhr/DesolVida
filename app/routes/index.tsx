import { Link, LinksFunction } from "remix";
import stylesUrl from "../styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <div>
      <header>
        <Link className="headerButton" to="/login">
          Login
        </Link>
        <div className="mainTitle">
          <h1>DesolVida</h1>
          <img
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/brain_1f9e0.png"
            alt="brain image"
          />
        </div>
        <Link className="headerButton" to="/signin">
          Sign In
        </Link>
      </header>
      <div></div>
    </div>
  );
}
