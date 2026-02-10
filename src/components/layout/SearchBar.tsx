// File: src/components/layout/SearchBar.tsx
// Search input UI for site-wide search.
export default function SearchBar({
  placeholder,
  buttonText,
}: {
  placeholder: string;
  buttonText: string;
}) {
  return (
    <form role="search" aria-label={placeholder} className="search">
      <input type="search" name="q" aria-label={placeholder} placeholder={placeholder} />
      <button type="submit">{buttonText}</button>
    </form>
  );
}
