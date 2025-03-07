import { logOut } from "@/actions";
import { auth } from "@/auth";
import ContentBlock from "@/components/ContentBlock";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function DashbordPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div>
      <Title className="my-8 text-white">Your Account</Title>

      <ContentBlock className="h-[500px] flex">
        <div className="m-auto flex flex-col space-y-4 justify-center items-center">
          <p className="text-lg">Logged in as <b>{session.user.email}</b></p>
          <form action={logOut}>
            <Button>Log out</Button>
          </form>
        </div>
      </ContentBlock>
    </div>
  )
}
