const path = require('path');

const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLInterfaceType
} = require('graphql');

const ResourceInterface = new GraphQLInterfaceType({
  name: 'IResource',
  fields: () => ({
    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const PeopleType = new GraphQLObjectType({
  name: 'People',
  interfaces: [ResourceInterface],
  fields: () => ({
    name: { type: GraphQLString },
    height: { type: GraphQLString },
    mass: { type: GraphQLString },
    hair_color: { type: GraphQLString },
    skin_color: { type: GraphQLString },
    eye_color: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    gender: { type: GraphQLString },
    homeworld: { type: GraphQLString },
    films: { type: GraphQLList(GraphQLString) },
    species: { type: GraphQLList(GraphQLString) },
    vehicles: { type: GraphQLList(GraphQLString) },
    starships: { type: GraphQLList(GraphQLString) },
    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const FilmType = new GraphQLObjectType({
  name: 'Film',
  interfaces: [ResourceInterface],
  fields: () => ({
    title: { type: GraphQLString },
    episode_id: { type: GraphQLInt },
    opening_crawl: { type: GraphQLString },
    director: { type: GraphQLString },
    producer: { type: GraphQLString },
    release_date: { type: GraphQLString }, // "1977-05-25",
    characters: { type: new GraphQLList(GraphQLString) },
    planets: { type: new GraphQLList(GraphQLString) },
    starships: { type: new GraphQLList(GraphQLString) },
    vehicles: { type: new GraphQLList(GraphQLString) },
    species: { type: new GraphQLList(GraphQLString) },
    created: { type: GraphQLString }, // 2014-12-10T14:23:31.880000Z
    edited: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const StarshipType = new GraphQLObjectType({
  name: 'Starship',
  interfaces: [ResourceInterface],
  fields: () => ({
    MGLT: { type: GraphQLString },
    cargo_capacity: { type: GraphQLString },
    consumables: { type: GraphQLString },
    cost_in_credits: { type: GraphQLString },
    created: { type: GraphQLString },
    crew: { type: GraphQLString },
    edited: { type: GraphQLString },
    hyperdrive_rating: { type: GraphQLString },
    length: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    max_atmosphering_speed: { type: GraphQLString },
    model: { type: GraphQLString },
    name: { type: GraphQLString },
    passengers: { type: GraphQLString },
    films: { type: GraphQLList(GraphQLString) },
    pilots: { type: GraphQLList(GraphQLString) },
    starship_class: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const VehicleType = new GraphQLObjectType({
  name: 'Vehicle',
  interfaces: [ResourceInterface],
  fields: () => ({
    cargo_capacity: { type: GraphQLString },
    consumables: { type: GraphQLString },
    cost_in_credits: { type: GraphQLString },
    created: { type: GraphQLString },
    crew: { type: GraphQLString },
    edited: { type: GraphQLString },
    length: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    max_atmosphering_speed: { type: GraphQLString },
    model: { type: GraphQLString },
    name: { type: GraphQLString },
    passengers: { type: GraphQLString },
    films: { type: GraphQLList(GraphQLString) },
    pilots: { type: GraphQLList(GraphQLString) },
    vehicle_class: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const SpeciesType = new GraphQLObjectType({
  name: 'Species',
  interfaces: [ResourceInterface],
  fields: () => ({
    average_height: { type: GraphQLString },
    average_lifespan: { type: GraphQLString },
    classification: { type: GraphQLString },
    created: { type: GraphQLString },
    designation: { type: GraphQLString },
    edited: { type: GraphQLString },
    eye_colors: { type: GraphQLString },
    hair_colors: { type: GraphQLString },
    homeworld: { type: GraphQLString },
    language: { type: GraphQLString },
    name: { type: GraphQLString },
    people: { type: GraphQLList(GraphQLString) },
    films: { type: GraphQLList(GraphQLString) },
    skin_colors: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const PlanetType = new GraphQLObjectType({
  name: 'Planet',
  interfaces: [ResourceInterface],
  fields: () => ({
    climate: { type: GraphQLString },
    created: { type: GraphQLString },
    diameter: { type: GraphQLString },
    edited: { type: GraphQLString },
    films: { type: GraphQLList(GraphQLString) },
    gravity: { type: GraphQLString },
    name: { type: GraphQLString },
    orbital_period: { type: GraphQLString },
    population: { type: GraphQLString },
    residents: { type: GraphQLList(GraphQLString) },
    rotation_period: { type: GraphQLString },
    surface_water: { type: GraphQLString },
    terrain: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const ResourceType = new GraphQLUnionType({
  name: 'Resource',
  types: [PeopleType, FilmType, StarshipType, VehicleType, SpeciesType, PlanetType],
  resolveType(value) {
    if (value.detail === 'Not found') {
      throw new Error('Invalid resource id or type');
    }
    const type = path.basename(path.dirname(value.url));
    switch (type) {
      case 'films':
        return FilmType;
      case 'people':
        return PeopleType;
      case 'starships':
        return StarshipType;
      case 'vehicles':
        return VehicleType;
      case 'species':
        return SpeciesType;
      case 'planets':
        return PlanetType;
      default:
        return null;
    }
  }
});

const ResourcesListType = new GraphQLObjectType({
  name: 'Resources',
  fields: {
    id: { type: GraphQLString },
    count: { type: GraphQLInt },
    next: { type: GraphQLString },
    previous: { type: GraphQLString },
    results: { type: GraphQLList(ResourceType) }
  }
});

module.exports = {
  PeopleType,
  FilmType,
  StarshipType,
  VehicleType,
  SpeciesType,
  PlanetType,
  ResourceType,
  ResourcesListType
};
