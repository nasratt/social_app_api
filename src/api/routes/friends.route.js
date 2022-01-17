import express from 'express';

const friendsRouter = express.Router();

friendsRouter.get('/', () => {});
friendsRouter.get('/requests', () => {});
friendsRouter.get('/suggestions', () => {});
friendsRouter.post('/add', () => {});
friendsRouter.post('/accept', () => {});
friendsRouter.post('/reject', () => {});
friendsRouter.post('/remove', () => {});

export default friendsRouter;
