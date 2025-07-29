import { getUser } from "@/lib/server";

export default async function Page() {
  const user = await getUser();

  if (!user) console.log(user);

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
