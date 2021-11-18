import { setupServer } from 'msw/node';
import { jiraApiHandlers } from './jira-api.handlers';
export const server = setupServer(...jiraApiHandlers);
