import Link from "next/link";
import ContentBlock from "@/components/ContentBlock";
import Title from "@/components/Title";
import Logo from "@/components/Logo";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div>
      <Title className="my-8 text-white">Sign Up</Title>

      <ContentBlock className="h-[500px] flex">
        <div className="m-auto flex flex-col space-y-4 justify-center items-center">
          <Logo />
          <Title>Sign Up</Title>
          <SignUpForm />
          <p className="flex items-center gap-x-2">
            Have an account?
            <Link href="/login" className="text-blue-500">Login</Link>
          </p>
        </div>
      </ContentBlock>
    </div>
  )
}
