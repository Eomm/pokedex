import { Entity } from '@platformatic/sql-mapper';
import graphqlPlugin from '@platformatic/sql-graphql'
import { Color } from './types/Color'
import { Type } from './types/Type'
import { EvolutionChain } from './types/EvolutionChain'
import { EvolutionStep } from './types/EvolutionStep'
import { Pokemon } from './types/Pokemon'
import { PokemonType } from './types/PokemonType'
import { Picture } from './types/Picture'

declare module '@platformatic/sql-mapper' {
  interface Entities {
    color: Entity<Color>,
    type: Entity<Type>,
    evolutionChain: Entity<EvolutionChain>,
    evolutionStep: Entity<EvolutionStep>,
    pokemon: Entity<Pokemon>,
    pokemonType: Entity<PokemonType>,
    picture: Entity<Picture>,
  }
}
