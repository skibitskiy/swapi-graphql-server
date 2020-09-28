const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');

const PORT = process.env.PORT || 1166;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {});
