const SearchBar = ({ city, setCity, getWeather }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
  if (e.key === "Enter") {
    getWeather();
  }
}}
      />
      

      <button onClick={getWeather}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;