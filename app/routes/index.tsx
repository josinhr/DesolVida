import { Link, LinksFunction, useLoaderData, LoaderFunction } from "remix";
import stylesUrl from "../styles/index.css";
import { indexImages } from "~/assets/indexImages";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return [1, 2, 3, 4];
};

export default function Index() {
  const data = useLoaderData<number[]>();
  console.log("This is data" + data);

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
      <div>
        {data.map((n) => (
          <img id={n.toString()} src={indexImages[n - 1]} alt="Old women" />
        ))}
      </div>
    </div>
  );
}
