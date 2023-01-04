const fs = require('fs')
const path = require('path')
const https = require('https')

main()

async function main () {
  let data
  if (process.env.ONLINE) {
    data = await getData()
  } else {
    const jsonFile = path.join(__dirname, './source.json')
    data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'))
  }

  processData(data)
}

async function getData () {
  return new Promise((resolve, reject) => {
    const endpoint = 'https://beta.pokeapi.co/'

    const query = `query gottaCatchThemAll {
    pokemon: pokemon_v2_pokemon{
      id
      name
      height
      weight
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
          id
        }
      }
      images: pokemon_v2_pokemonsprites {
        sprites
      }
      specy:pokemon_v2_pokemonspecy {
        generation_id
        is_baby
        is_legendary
        is_mythical
        color:pokemon_v2_pokemoncolor {
          name
          id
        }
        evolutions: pokemon_v2_evolutionchain {
          baby_trigger_item_id
          id
          chain: pokemon_v2_pokemonspecies {
            id
            order
          }
        }
      }
  
    }
  }`

    const options = {
      method: 'POST',
      path: '/graphql/v1beta',
      headers: {
        'Content-Type': 'application/json',
        'X-Method-Used': 'graphiql'
      }
    }

    const request = https.request(endpoint, options, response => {
      let data = ''

      response.on('data', chunk => {
        data += chunk
      })

      response.on('end', () => {
        resolve(JSON.parse(data))
      })

      response.on('error', reject)
    })

    request.write(JSON.stringify({ query }))
    request.end()
  })
}

function processData (data) {
  const sqlColors = new Set()
  const sqlTypes = new Set()
  const sqlEvolutionSteps = new Set()
  const sqlEvolutionChain = new Set()
  const sqlPokemon = new Set()

  // Generate the INSERT statements
  data.data.pokemon.forEach(pokemon => {
    const name = pokemon.name
    const height = pokemon.height
    const weight = pokemon.weight
    const isBaby = pokemon.specy.is_baby
    const isLegendary = pokemon.specy.is_legendary
    const isMythical = pokemon.specy.is_mythical
    const colorId = pokemon.specy.color.id
    const gen = pokemon.specy.generation_id
    const evolutionChainId = pokemon.specy.evolutions?.id || null

    // const link = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    const link = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

    sqlColors.add(`INSERT INTO color (id, name) VALUES (${colorId}, '${pokemon.specy.color.name}');`)
    if (evolutionChainId) {
      sqlEvolutionChain.add(`INSERT INTO evolution_chain (id) VALUES (${evolutionChainId});`)
      pokemon.specy.evolutions.chain.forEach(evo => {
        sqlEvolutionSteps.add(`INSERT INTO evolution_step ("order", evolution_chain_id, pokemon_id) VALUES (${evo.order}, ${evolutionChainId}, ${evo.id});`)
      })
    }

    sqlPokemon.add(`INSERT INTO pokemon (id, name, height, weight, is_baby, generation, is_legendary, is_mythical, color_id, evolution_chain_id) VALUES (${pokemon.id}, '${name}', ${height}, ${weight}, ${isBaby}, ${gen}, ${isLegendary}, ${isMythical}, ${colorId}, ${evolutionChainId});`)
    sqlPokemon.add(`INSERT INTO picture (pokemon_id, url) VALUES (${pokemon.id}, '${link}');`)

    pokemon.types.forEach(type => {
      const typeId = type.type.id
      sqlTypes.add(`INSERT INTO element (id, name) VALUES (${typeId}, '${type.type.name}');`)
      sqlPokemon.add(`INSERT INTO pokemon_element (pokemon_id, element_id) VALUES (${pokemon.id}, ${typeId});`)
    })
  })

  // Write the INSERT statements to a file
  fs.writeFileSync(path.join(__dirname, '../migrations/002.do.data.sql'), [
    ...[...sqlColors].sort(),
    ...[...sqlTypes].sort(),
    ...[...sqlEvolutionChain].sort(),
    ...sqlEvolutionSteps,
    ...sqlPokemon
  ].join('\n'))
}
