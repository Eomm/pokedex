import { useState } from "react";
import { useQuery } from "urql";
import Select from "react-select";

const query = `
  query {
    generations
  }
`;

function PokemonTypes({ onChange }) {
  const [selectedValues, setSelectedValues] = useState([]);

  const [result] = useQuery({ query });
  const { data, error, fetching } = result;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const options = data
    ? data.generations.map((g) => ({
        value: g,
        label: `Gen. ${g}`,
      }))
    : [];

  function handleChange(selectedOptions) {
    setSelectedValues(selectedOptions);
    onChange(selectedOptions.map((option) => option.value));
  }

  return (
    <Select
      className="select-container"
      isLoading={fetching}
      value={selectedValues}
      options={options}
      onChange={handleChange}
      isMulti
    />
  );
}

export default PokemonTypes;
