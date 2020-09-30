const {
  GraphQLSchema,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const { ResourceType, ResourcesListType } = require('./types');

const api = require('../swapi');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getResources: {
      type: ResourcesListType,
      args: { page: { type: GraphQLInt }, resourceType: { type: GraphQLString } },
      async resolve(obj, args) {
        const response = await api.fetchResources(args.resourceType, args.page);
        response.id = `${args.resourceType}-${args.page}`;
        return response;
      }
    },
    getResource: {
      type: ResourceType,
      args: { resourceType: { type: GraphQLString }, id: { type: GraphQLInt } },
      async resolve(obj, args) {
        return await api.fetchResource(args.id, args.resourceType);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: Query
});

module.exports = schema;
