// src/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { agendaHandlers } from './handlers/agenda.handlers';

export const worker = setupWorker(...agendaHandlers);
