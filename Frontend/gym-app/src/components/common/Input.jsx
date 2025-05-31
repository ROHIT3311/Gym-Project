export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  required,
  disabled,
  className,
}) {
  return (
    <div>
      <fieldset className="border-2 border-gray-300 px-2 rounded-xl pb-1">
        <legend className="px-2">{label}</legend>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full px-2 py-1 outline-none ${className}`}
        />
      </fieldset>
    </div>
  );
}
