'use client';

import Link from "next/link";
import Logo from "../Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    path: '/app/dashboard'
  },
  {
    label: "Account",
    path: '/app/account'
  }
];

export default function Header() {
  const activePathname = usePathname();

  return (
    <header className="border-b p-2 border-white/20">
      <div className="container max-w-5xl mx-auto flex justify-between items-center px-4">
        <Logo />
        <nav >
          <ul className="flex gap-2 text-xs">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  className={cn(`text-white/70 hover:text-white focus:text-white transition px-2 py-1 rounded-sm`, {'bg-light text-white': activePathname === route.path})}
                  href={route.path}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
