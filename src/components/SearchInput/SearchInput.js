import { Input } from "antd";
import { useState } from "react";
import { debounce } from "lodash";

const SearchInput = ({ allFetchMovies }) => {
  const [value, setValue] = useState("");

  const handleInput = (text) => {
    setValue(text);
    allFetchMovies(text);
  };

  const handleInputDebounce = debounce(handleInput, 500);

  return (
    <>
      <Input
        maxLength={50}
        onChange={(e) => handleInputDebounce(e.target.value)}
        value={value}
      />
    </>
  );
};

export default SearchInput;
