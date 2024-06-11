// src/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { agendaHandlers } from './handlers/agenda.handlers';
import { topicsHandlers } from '@/mocks/handlers/topics.handlers';

export const worker = setupWorker(...agendaHandlers, ...topicsHandlers);
