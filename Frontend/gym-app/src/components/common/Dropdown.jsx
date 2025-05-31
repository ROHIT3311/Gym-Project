import { useState, useRef, useEffect } from "react";
import Datepicker from "./Datepicker"; // adjust path if needed

export default function Dropdown({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
  error,
  isDate = false, // NEW
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getLabel = (opt) => (typeof opt === "object" ? opt.label : opt);
  const getValue = (opt) => (typeof opt === "object" ? opt.value : opt);

  const handleOptionClick = (option) => {
    const selectedValue = getValue(option);
    if (onChange) onChange({ target: { value: selectedValue } });
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const matchedOption = options.find((opt) => getValue(opt) === value);
  const selectedLabel = matchedOption ? getLabel(matchedOption) : placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <fieldset
        className={`w-full rounded-xl border-2 px-2 py-1 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {label && (
          <legend className="text-sm text-gray-600 px-2">{label}</legend>
        )}

        <div
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          className={`w-full px-3 py-1 rounded-md bg-white cursor-pointer flex justify-between items-center ${
            disabled ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => !disabled && setIsDropdownOpen((prev) => !prev)}
        >
          <span className={`text-gray-700 ${!value && "text-gray-400"}`}>
            {selectedLabel || placeholder}
          </span>
          <span className="text-gray-500 text-sm">
            {isDropdownOpen ? "▲" : "▼"}
          </span>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg">
            {isDate ? (
              <Datepicker />
            ) : (
              <ul role="listbox">
                {options.map((option, idx) => (
                  <li
                    key={idx}
                    role="option"
                    aria-selected={getValue(option) === value}
                    onClick={() => handleOptionClick(option)}
                    className={`px-4 py-2 hover:bg-[#f0fdf4] cursor-pointer ${
                      getValue(option) === value ? " font-semibold" : ""
                    }`}
                  >
                    {getLabel(option)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </fieldset>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
