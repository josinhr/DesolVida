import type { LoaderFunction } from "remix";
import { Link, useLoaderData } from "remix";
import type { OldPerson } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { oldPerson: OldPerson };

export const loader: LoaderFunction = async ({ params }) => {
  const oldPerson = await db.oldPerson.findUnique({
    where: { id: params.oldPersonId },
  });
  if (!oldPerson) throw new Error("oldPerson not found");
  const data: LoaderData = { oldPerson: oldPerson };
  return data;
};

export default function oldPersonRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious oldPerson:</p>
      <p>{data.oldPerson.id}</p>
      <Link to=".">{data.oldPerson.name} Permalink</Link>
    </div>
  );
}
