import { Entity } from '@platformatic/sql-mapper';
import graphqlPlugin from '@platformatic/sql-graphql'
import { Color } from './types/Color'
import { Element } from './types/Element'
import { EvolutionChain } from './types/EvolutionChain'
import { EvolutionStep } from './types/EvolutionStep'
import { Pokemon } from './types/Pokemon'
import { PokemonElement } from './types/PokemonElement'
import { Picture } from './types/Picture'

declare module '@platformatic/sql-mapper' {
  interface Entities {
    color: Entity<Color>,
    element: Entity<Element>,
    evolutionChain: Entity<EvolutionChain>,
    evolutionStep: Entity<EvolutionStep>,
    pokemon: Entity<Pokemon>,
    pokemonElement: Entity<PokemonElement>,
    picture: Entity<Picture>,
  }
}
