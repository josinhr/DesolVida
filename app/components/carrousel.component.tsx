import { useLoaderData, LoaderFunction } from "remix";

export let loader = async () => {
  return [1, 2, 3, 4];
};

export default function ImgageCarrousel() {
  const data = useLoaderData<number[]>();

  return (
    <div>
      {data.map((n) => (
        <img src={`~/assets/image ` + n + `.png`} alt="Old women" />
      ))}
    </div>
  );
}
