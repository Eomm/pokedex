import { useState, useEffect } from "react";
import { useQuery } from "urql";
import ReactPaginate from "react-paginate";

import PokemonItem from "./Item";

const query = `
query searchPokemon($limit: LimitInt, $offset: Int, $name: String, $gen: [Int]) {
  pokemon(limit: $limit, offset: $offset, where: {name: {like: $name}, generation: { in: $gen} }) {
    id
    name
    picture { url }
    isLegendary
    isBaby
    isMythical
  }
}
`;

const queryCounter = `
query searchPokemon($name: String, $gen: [Int]) {
  countPokemon(where: {name: {like: $name}, generation: { in: $gen}}) {
    total
  }
}
`;

function PokemonResult({ itemsPerPage, filterByName, filterByGeneration }) {
  const [page, setPage] = useState(0);

  const variables = {
    name: (filterByName && `%${filterByName}%`) || undefined,
    gen: filterByGeneration,
  };

  useEffect(() => {
    setPage(0);
  }, [filterByName, filterByGeneration]);

  const [result] = useQuery({
    query,
    variables: {
      limit: itemsPerPage,
      offset: page * itemsPerPage,
      ...variables,
    },
  });

  const [resultCounter] = useQuery({
    query: queryCounter,
    variables,
  });

  const { data } = result;
  const fetching = result.fetching || resultCounter.fetching;
  const error = result.error || resultCounter.error;

  const changePage = (event) => {
    setPage(event.selected);
  };

  if (fetching) {
    return (
      <div className="pagination-container">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pagination-container">
        <div>Error: {error.message}</div>
      </div>
    );
  }

  if (!data.pokemon.length) {
    return (
      <div className="pagination-container">
        <div>No results found</div>
      </div>
    );
  }

  return (
    <>
      <div className="results">
        {data.pokemon.map((p) => (
          <PokemonItem key={p.id} pokemon={p} />
        ))}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          nextLabel="next >"
          initialPage={page}
          onPageChange={changePage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={resultCounter.data.countPokemon.total / itemsPerPage}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default PokemonResult;
