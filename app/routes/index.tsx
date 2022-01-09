import { Link, LinksFunction, useLoaderData, LoaderFunction } from "remix";
import stylesUrl from "../styles/index.css";
import { getIndexImage } from "~/assets/indexImages";
import React, { useRef, useEffect } from "react";
import { db } from "~/utils/db.server";
import { OldPerson } from "@prisma/client";

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
      document
        .getElementById("rightButton")
        ?.addEventListener("click", function () {
          el.scrollTo({
            left: el.scrollLeft + 20,
            behavior: "smooth",
          });
        });
      document
        .getElementById("leftButton")
        ?.addEventListener("click", function () {
          el.scrollTo({
            left: el.scrollLeft - 20,
            behavior: "smooth",
          });
        });
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export type OldWomenArray = {
  key: number;
  num: number;
};

export let loader: LoaderFunction = async () => {
  return db.oldPerson.findMany();
};

export default function Index() {
  const data = useLoaderData<OldPerson[]>();
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
      <div className="carrouselContainer">
        <div ref={scrollRef} id="photoCarrousel" className="photoCarrousel">
          {data.map((n) => (
            <Link to={"oldPerson" + n.id}>
              <img
                key={n.id}
                id={n.name.toString()}
                src={getIndexImage(n.photo - 1)}
                alt="Old women"
              />
            </Link>
          ))}
        </div>
        <div className="carrouselButtons">
          <button id="leftButton" type="button" className="button">
            {"<"}
          </button>
          <button id="rightButton" type="button" className="button">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
