function Pokemon({ pokemon }) {
  return (
    <div className="pokemon">
      <div className="img-container">
        <img src={pokemon.picture[0]?.url} alt={pokemon.name} />
      </div>
      <div className="info">
        <div className="number">#{pokemon.id}</div>
        <div className="name">{pokemon.name}</div>
      </div>
    </div>
  );
}

export default Pokemon;
