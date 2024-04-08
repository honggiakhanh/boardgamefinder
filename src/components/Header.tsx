import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex items-center space-x-4">
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
      <div className="flex items-center space-x-4">
        <Link className="text-sm" href="#">
          Login / Create account
        </Link>
        <div className="size-8 bg-gray-300"></div>
      </div>
    </header>
  );
};

export default Header;
