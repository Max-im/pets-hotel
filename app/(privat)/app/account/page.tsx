import ContentBlock from "@/components/ContentBlock";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";

export default function DashbordPage() {
  return (
    <>
      <div>
        <Title className="my-8 text-white">Your Account</Title>

        <ContentBlock className="h-[500px]">
          <p>Logged in as ...</p>
          <Button>Log out</Button>
        </ContentBlock>
      </div>
    </>
  )
}
