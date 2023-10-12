'use strict';

const dynamoose = require('dynamoose');

// define schema
const pokemonCardSchema = new dynamoose.Schema({
  id: Number,
  name: String,
  type: String,
  shiny: Boolean,
});

// create our 'Model'
const pokemonModel = dynamoose.model('pokemon-cards', pokemonCardSchema);

exports.handler = async (event) => {
  console.log('HERE IS THE EVENT OBJECT', event);
  // TODO implement

  const body = JSON.parse(event.body);
  const pokemonToDelete = body.id;

  try {
    await pokemonModel.delete({ id: pokemonToDelete });
    const response = {
      statusCode: 201,
      body: JSON.stringify({ message: 'Pokemon deleted successfully' }),
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to delete Pokemon' }),
    };
    return response;
  }
};
