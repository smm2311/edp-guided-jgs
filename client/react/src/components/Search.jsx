import { useState } from "react";

export function Search({ dataNames, setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filter = () => {
    const re = new RegExp(searchTerm, "i");
    return dataNames.filter((name) => re.test(name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = filter();
    setSearchResults(results);
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}
