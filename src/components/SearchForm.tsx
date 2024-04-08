"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const SearchForm = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText) return;

    router.push(`/results/${searchText}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <Input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        name="productName"
        className="w-1/2"
        placeholder="Search board games"
        required
      />
      <Button className="ml-2">search</Button>
    </form>
  );
};

export default SearchForm;
