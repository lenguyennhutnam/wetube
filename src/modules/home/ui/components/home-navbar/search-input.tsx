"use client";
import { SearchIcon, X } from "lucide-react";
import { useState } from "react";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  return (
    <form className="flex w-full max-w-[600px]">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500"
        />
        {/* Nút xoá */}
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
