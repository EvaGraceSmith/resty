import { rest } from 'msw';

export const handlers = [
  rest.post('/api/data', (req, res, ctx) => {
    const requestBody = req.body;
    // Process the request body and return the desired response
    const responseData = { result: 'Mocked Data' };
    return res(ctx.json(responseData));
  }),
  rest.get('/api/data', (req, res, ctx) => {
    // Return the same response data as the POST request
    const responseData = { result: 'Mocked Data' };
    return res(ctx.json(responseData));
  }),
];

