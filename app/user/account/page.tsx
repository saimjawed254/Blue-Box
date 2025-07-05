import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/users";
import { eq } from "drizzle-orm";
import AccountPage from "@/components/UI/Pages/Account";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="p-6 text-red-500">
        You must be signed in to view this page.
      </div>
    );
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.clerk_id, userId))
    .limit(1);

  const user = result[0];

  if (!user) {
    return <div className="p-6 text-red-500">User not found in database.</div>;
  }

  return(
    <AccountPage userData={user} />
  ) 
}
