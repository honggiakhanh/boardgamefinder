import React from "react";
import Link from "next/link";
import LanguagePicker from "./LanguagePicker";
import ThemeToggler from "./ThemeToggler";
import { auth, signOut } from "@/lib/auth/auth";
import { Button } from "./ui/button";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          BoardGameFInder
        </Link>
        <ThemeToggler />
      </div>
      <div className="flex items-center space-x-10">
        {user ? (
          <>
            <div>{user.name}</div>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button>Sign Out</Button>
            </form>
          </>
        ) : (
          <Link className="text-sm" href="/api/auth/">
            Login / Create account
          </Link>
        )}
        <LanguagePicker />
      </div>
    </header>
  );
};

export default Header;
