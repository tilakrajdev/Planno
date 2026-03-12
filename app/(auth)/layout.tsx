"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <div className="flex justify-baseline">
            <Image src="/logo.svg" alt="Logo" width={42} height={8} />
            <span className="font-semibold from-neutral-600 text-4xl">
              Planno
            </span>
          </div>
          <Button asChild variant="secondary">
            <Link href={isSignIn ? "/sign-up":"/sign-in"}>{isSignIn ? "Sign UP" : "Login"}</Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
