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

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          BoardGameFInder
        </Link>
        <Select>
          <SelectTrigger id="categories" className="space-x-2">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="strategy">Strategy</SelectItem>
            <SelectItem value="family">Family</SelectItem>
            <SelectItem value="party">Party</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="dice">Dice</SelectItem>
          </SelectContent>
        </Select>
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
