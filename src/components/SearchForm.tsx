"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const fetchSuggestions = async (text: string) => {
    try {
      const response = await fetch(`/api/search?name=${text}`);
      console.log("DATA: " + response);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debounceFetchSuggestions = useCallback(
    _.debounce((text: string) => {
      fetchSuggestions(text);
    }, 500),
    []
  );

  useEffect(() => {
    if (searchText) {
      setLoading(true);
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

  const handleSuggestionClick = (name: string) => {
    setSearchText(name);

    router.push(`/results/${name}`);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto">
      <div className="flex justify-center">
        <div className="w-full">
          <Input
            type="text"
            value={searchText}
            onChange={handleOnChange}
            name="productName"
            className="w-full"
            placeholder="Find a board game"
            required
            autoComplete="off"
          />

          {loading && <li className="animate-spin mt-2"></li>}

          <ul className="w-full text-left">
            {!loading && suggestions.length === 0 && searchText.length > 1 && (
              <div className="mt-2 rounded-md shadow-lg overflow-hidden">
                <ul className="py-2">
                  <li className="truncate text-sm p-2">
                    No results found in BGG&#39;s database for {searchText}
                  </li>
                </ul>
              </div>
            )}
            {suggestions.length > 0 && (
              <div className="mt-2 rounded-md shadow-lg overflow-hidden">
                <ul className="py-2">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="truncate text-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleSuggestionClick(item.name.value)}
                    >
                      {item.name.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ul>
        </div>

        <Button className="ml-2">Search</Button>
      </div>
    </form>
  );
};

export default SearchForm;
