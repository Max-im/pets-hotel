import Logo from "../Logo";
// import { usePathname } from "next/navigation";

export default function AuthHeader() {
  // const activePathname = usePathname();

  return (
    <header className="border-b p-2 border-white/20">
      <div className="container max-w-5xl mx-auto flex justify-between items-center px-4">
        <Logo />
        
      </div>
    </header>
  )
}
