import type { Metadata } from "next";
import Header from "@/components/Header";
import BackgroundPattern from "@/components/BackgroundPattern";
import Footer from "@/components/Footer";
import PetProvider from "@/providers/petProvider";

export const metadata: Metadata = {
  title: "PetSoft - Pet Daycare Store",
  description: "PetSoft is the best place to buy pet supplies online.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container max-w-5xl mx-auto px-4">
          <PetProvider>
            {children}
          </PetProvider>
        </main>
        <Footer />
      </div>
    </>
  );
}
