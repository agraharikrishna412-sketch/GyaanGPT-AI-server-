import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import aiRoutes from './routes/aiRoutes.js';
import systemRoute from './routes/systemRoute.js';
import { initDB } from './storage/database_handler.js';
import { startPerformanceMonitor } from './analytics/performance_monitor.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// Initialize DB and Performance Monitor
await initDB();
startPerformanceMonitor();

// Mount routes
app.use('/api', aiRoutes);
app.use('/system', systemRoute);

app.get('/', (req, res) => res.send('GyaanGPT Server Running'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));