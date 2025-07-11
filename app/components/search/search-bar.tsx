"use client";

import React, { useState, forwardRef } from "react";

export type Field = {
  key: string;
  label: string;
};

type SearchBarProps = {
  fields: Field[];
  setDataAction: (data: any[]) => void;
  apiPath: string;
};

const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  ({ fields, setDataAction, apiPath }, ref) => {
    const [values, setValues] = useState<Record<string, string>>(
      Object.fromEntries(fields.map((f) => [f.key, ""])),
    );
    const [loading, setLoading] = useState(false);
    const [sortField, setSortField] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleChange = (key: string, value: string) => {
      setValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    const handleSearch = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        Object.entries(values).forEach(([key, value]) => {
          if (value !== "" && value !== undefined) params.append(key, value);
        });
        if (sortField) {
          params.append(
            "sort",
            sortOrder === "desc" ? `-${sortField}` : sortField,
          );
        }
        const res = await fetch(`/api/${apiPath}/search?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setDataAction(data);
        }
      } finally {
        setLoading(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <div
        ref={ref}
        className="flex flex-wrap gap-[0.25rem] items-end bg-white p-[0.5rem] rounded-lg"
      >
        {fields.map((field) => (
          <input
            key={field.key}
            type="text"
            placeholder={field.label}
            value={values[field.key]}
            onChange={(e) => handleChange(field.key, e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-[8rem] p-[0.5rem] rounded-lg bg-gray"
          />
        ))}
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="appearance-none w-[8rem] p-[0.5rem] rounded-lg bg-gray"
        >
          <option value="">정렬 기준</option>
          {fields.map((field) => (
            <option key={field.key} value={field.key}>
              {field.label}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="appearance-none w-[8rem] p-[0.5rem] rounded-lg bg-gray"
        >
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="p-[0.5rem] bg-blue rounded-lg"
        >
          검색
        </button>
      </div>
    );
  },
);

export default SearchBar;
