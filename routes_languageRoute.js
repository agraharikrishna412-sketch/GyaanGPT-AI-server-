import express from 'express';
import { translateText } from '../utils/translator.js';
const router = express.Router();

router.post('/translate', async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    const translated = await translateText(text, targetLang);
    res.json({ translated });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Translation failed' });
  }
});

export default router;