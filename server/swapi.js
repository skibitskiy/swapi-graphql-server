const fetch = require('node-fetch');

const baseUrl = 'https://swapi.dev/api/';

const fetchResources = async (type, page = 1) => {
  const url = new URL(type, baseUrl);
  url.searchParams.append('page', page);
  const response = await fetch(url).then((res) => res.json());
  return response;
};

const fetchResource = async (type, id) => {
  const url = new URL([id, type].join('/'), baseUrl);
  const response = await fetch(url).then((res) => res.json());
  return response;
};

module.exports = {
  fetchResources,
  fetchResource
};
