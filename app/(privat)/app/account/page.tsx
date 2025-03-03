import ContentBlock from "@/components/ContentBlock";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";

export default function DashbordPage() {
  return (
    <>
      <div className="flex justify-between items-center text-white py-8">
        <section>
          <Title>Your Account</Title>
        </section>

        <ContentBlock>
          <p>Logged in as ...</p>
          <Button>Log out</Button>
        </ContentBlock>
      </div>
    </>
  )
}
