import express from 'express';
import { main as mainController } from '../controllers/index.js';

const router = express.Router();

router.post('/', mainController);

export default router;
