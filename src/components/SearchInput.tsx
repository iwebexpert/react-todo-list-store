interface SearchInputProps {
  searchData: string;
  setSearchData: (text: string) => void;
}

export default function SearchInput({
  searchData,
  setSearchData,
}: SearchInputProps) {
  return (
    <div style={{ marginTop: "30px" }}>
      <input
        type="text"
        value={searchData}
        onChange={(event) => setSearchData(event.target.value)}
        placeholder="Поиск"
      />
    </div>
  );
}
