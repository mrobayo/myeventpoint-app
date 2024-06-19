// src/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { topicsHandlers } from '@/mocks/handlers/topics.handlers';
import { userHandlers } from '@/mocks/handlers/users.handlers';

export const worker = setupWorker(...userHandlers, ...topicsHandlers);
