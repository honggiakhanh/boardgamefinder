"use client";

import React, { useCallback, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { BGG_SearchResult_BoardGame } from "@/lib/types";

type Props = {};

const SearchForm = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<BGG_SearchResult_BoardGame[]>(
    []
  );
  const router = useRouter();

  const fetchSuggestions = async (text: string) => {
    try {
      const response = await fetch(`/api/search?name=${text}`);
      console.log("DATA: " + response);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const debounceFetchSuggestions = useCallback(
    _.debounce((text: string) => {
      fetchSuggestions(text);
    }, 1000),
    []
  );

  useEffect(() => {
    if (searchText) {
      debounceFetchSuggestions(searchText);
    } else {
      setSuggestions([]);
    }
  }, [searchText, debounceFetchSuggestions]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText) return;

    router.push(`/results/${searchText}`);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto">
      <div className="flex justify-center">
        <Input
          type="text"
          value={searchText}
          onChange={handleOnChange}
          name="productName"
          className="w-full"
          placeholder="Find a board game"
          required
        />
        <Button className="ml-2">Search</Button>
      </div>
      <ul className="w-full text-left p-2">
        {suggestions
          ? suggestions.map((item) => (
              <li key={item.id} className="truncate">
                {item.name.value}
              </li>
            ))
          : null}
      </ul>
    </form>
  );
};

export default SearchForm;
