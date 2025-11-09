import express from 'express';
import { handleMessage } from '../controllers/meta_core.js';
const router = express.Router();

router.post('/message', async (req, res) => {
  try {
    const { userId, text, lang } = req.body;
    const result = await handleMessage({ userId, text, lang });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;