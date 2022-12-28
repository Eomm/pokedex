import { useState } from "react";
import { useQuery } from "urql";
import Select from "react-select";

const query = `
  query {
    types: element (limit: 99, orderBy: {field: id, direction:ASC} ){ 
      id
      name
    }
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
    ? data.types.map((t) => ({
        value: t.id,
        label: t.name,
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
