"use client";

import { logout } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";

export function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-end px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <ModeToggle />
          <Button variant="outline" onClick={handleLogout} className="hidden md:flex">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
