const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');

const PORT = process.env.PORT || 1166;
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {});
