import { Input } from "antd";
import { useState, useMemo } from "react";
import { debounce } from "lodash";

const SearchInput = ({ allFetchMovies }) => {
  const [value, setValue] = useState("");

  const handleInput = (e) => {
    const text = e.target.value
    console.log(e);
    if(value.trim()) return
      setValue(text);
      allFetchMovies(text);
  };


  
  const debouncedChangeHandler = useMemo(() => {
    return debounce(handleInput, 300);
  }, []);

  // const handleInputDebounce = debounce(handleInput, 1000);

  return (
    <>
      <Input
        maxLength={50}
        onChange={debouncedChangeHandler}
        value={value}
      />
    </>
  );
};

export default SearchInput;
