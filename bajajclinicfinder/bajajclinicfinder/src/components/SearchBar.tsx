
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { searchDoctorsByName } from "@/lib/api";
import { Doctor } from "@/lib/types";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [isShowingSuggestions, setIsShowingSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.trim().length > 1) {
        const results = await searchDoctorsByName(inputValue);
        setSuggestions(results);
        setIsShowingSuggestions(true);
      } else {
        setSuggestions([]);
        setIsShowingSuggestions(false);
      }
    };
    
    fetchSuggestions();
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setIsShowingSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
    setIsShowingSuggestions(false);
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    onSearch(name);
    setIsShowingSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
      setIsShowingSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue.trim().length > 1 && setIsShowingSuggestions(true)}
            placeholder="Search doctors by name..."
            className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      {isShowingSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200"
        >
          <ul>
            {suggestions.map((doctor) => (
              <li
                key={doctor.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                onClick={() => handleSuggestionClick(doctor.name)}
              >
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{doctor.name}</p>
                  <p className="text-xs text-gray-500">
                    {doctor.specialty.join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
