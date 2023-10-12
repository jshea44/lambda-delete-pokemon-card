const AWSMock = require('jest-aws-sdk-mock');
const deletePokemonCard = require('./index.js');

describe('Delete Pokemon Card Lambda Function', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(require('aws-sdk'));
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should delete a Pokemon card', async () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback) => {
      callback(null, {});
    });

    const event = {
      body: JSON.stringify({ id: 1 }),
    };

    const result = await deletePokemonCard.handler(event);

    expect(result.statusCode).toBe(201);

    const responseBody = JSON.parse(result.body);

    expect(responseBody.message).toBe('Pokemon deleted successfully');
  });
});
