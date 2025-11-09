export const config = {
  port: process.env.PORT || 3000,
  region: process.env.REGION || 'asia-south1',
  apiKeys: {
    deepseek: process.env.DEEPSEEK_API_KEY,
    claude: process.env.CLAUDE_API_KEY,
    gpt: process.env.GPT_API_KEY,
    translator: process.env.TRANSLATOR_KEY
  },
  jwtSecret: process.env.JWT_SECRET || 'verysecret',
  storagePath: process.env.STORAGE_PATH || '/data/backups'
};