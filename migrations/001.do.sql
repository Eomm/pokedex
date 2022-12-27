CREATE TABLE IF NOT EXISTS color (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "type" (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS evolution_chain (
  id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS evolution_step (
  `order` INTEGER NOT NULL,
  evolution_chain_id INTEGER NOT NULL,
  pokemon_id INTEGER NOT NULL,
  PRIMARY KEY (`order`, evolution_chain_id, pokemon_id),
  FOREIGN KEY (evolution_chain_id) REFERENCES evolution_chain(id),
  FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

CREATE TABLE IF NOT EXISTS pokemon (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  height INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  generation INTEGER NOT NULL,
  is_baby BOOLEAN NOT NULL,
  is_legendary BOOLEAN NOT NULL,
  is_mythical BOOLEAN NOT NULL,
  color_id INTEGER NOT NULL,
  evolution_chain_id INTEGER,
  FOREIGN KEY (color_id) REFERENCES colors(id),
  FOREIGN KEY (evolution_chain_id) REFERENCES evolution_chain(id)
);

CREATE TABLE IF NOT EXISTS pokemon_type (
  pokemon_id INTEGER NOT NULL,
  type_id INTEGER NOT NULL,
  PRIMARY KEY (pokemon_id, type_id),
  FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
  FOREIGN KEY (type_id) REFERENCES "type"(id)
);

CREATE TABLE IF NOT EXISTS picture (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  pokemon_id INTEGER NOT NULL,
  FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);
