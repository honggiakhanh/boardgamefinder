import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import LanguagePicker from "./LanguagePicker";
import ThemeSwitch from "./ThemeToggler";
import ThemeToggler from "./ThemeToggler";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          BoardGameFInder
        </Link>
        <ThemeToggler />
      </div>
      <div className="flex items-center space-x-10">
        <Link className="text-sm" href="#">
          Login / Create account
        </Link>
        <LanguagePicker />
      </div>
    </header>
  );
};

export default Header;
