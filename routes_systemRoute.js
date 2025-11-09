import express from 'express';
import { restoreBackup, checkHealth } from '../storage/backup_manager.js';
const router = express.Router();

// Health check
router.get('/health', async (req, res) => {
  try {
    const status = await checkHealth();
    res.json(status);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// Restore backup (protected, JWT token required)
router.post('/restore', async (req, res) => {
  try {
    const result = await restoreBackup();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Restore failed' });
  }
});

export default router;