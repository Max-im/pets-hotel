import Link from "next/link";
import ContentBlock from "@/components/ContentBlock";
import Title from "@/components/Title";
import Logo from "@/components/Logo";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <Title className="my-8 text-white">Login</Title>

      <ContentBlock className="h-[500px] flex">
        <div className="m-auto flex flex-col space-y-4 justify-center items-center">
          <Logo />
          <Title>Login</Title>
          <LoginForm />
          <p className="flex items-center gap-x-2">
            Dont have an account?
            <Link href="/signup" className="text-blue-500">Sign Up</Link>
          </p>
        </div>
      </ContentBlock>
    </div>
  )
}
