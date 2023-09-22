import { authOptions } from "@/lib/prisma/auth";
import { getServerSession } from "next-auth";

export default async function Settings() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <p>Hello, ${user?.global_name} ! </p>
      <p> We're still constructing this part of the website</p>
      <p> If you want to delete your account, you can contact us on discord</p>
      <a href='https://discord.gg/chronodao'>Discord ChronoDAO</a>
    </>
  );
}
