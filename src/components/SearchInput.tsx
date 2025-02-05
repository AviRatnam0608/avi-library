"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
type SearchInputProps = {
  placeholder?: string;
  value: string;
};

export const SearchInput = ({
  placeholder = "Search...",
  value,
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState(value);

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button>Search</Button>
    </div>
  );
};
