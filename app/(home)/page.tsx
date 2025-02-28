import { Button } from "@heroui/button";
import Image from "next/image";
import PreviewImg from '@/public/petsoft-preview.png';
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-400">
      <div className="container mx-auto max-w-5xl flex justify-center items-center min-h-screen gap-10 flex-col xl:flex-row">
        <Image src={PreviewImg} alt="preview" />

        <div>
          <Logo />
          <h1 className="text-5xl font-semibold my-6 max-w-[500px]">Manage your <b>pet daycare</b> with ease</h1>
          <p className="text-2xl text-gray-700 max-w-[600px] mb-4">Petsoft is a pet daycare management software that helps you manage your pet daycare business with ease.</p>
          <div className="flex gap-4">
            <Button color="secondary">Get Access for $299</Button>
            <Button color="secondary" variant="bordered">Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
