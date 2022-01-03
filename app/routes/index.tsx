import { Link, LinksFunction, useLoaderData, LoaderFunction } from "remix";
import stylesUrl from "../styles/index.css";
import { indexImages } from "~/assets/indexImages";
import React, { useRef, useEffect } from "react";

export function useHorizontalScroll() {
  const elRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const el: any = elRef.current;
    if (el) {
      const onWheel = (e: { deltaY: number; preventDefault: () => void }) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return [1, 2, 3, 4];
};

export default function Index() {
  const data = useLoaderData<number[]>();
  const scrollRef = useHorizontalScroll();

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
        <div ref={scrollRef} id="photoCarrousel" className="photoCarrousel">
          {data.map((n) => (
            <img id={n.toString()} src={indexImages[n - 1]} alt="Old women" />
          ))}
        </div>
        <button type="button" className="button">
          {"<"}
        </button>
        <button type="button" className="button">
          {">"}
        </button>
      </div>
    </div>
  );
}
