import { rest } from 'msw';

export const jiraApiHandlers = [
  rest.get('https://api.themoviedb.org/3/discover/movie', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
