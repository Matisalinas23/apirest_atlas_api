import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import app from './app';

const PORT = process.env.PORT || 3000;

const apiStartLog = () => {
    console.log(`
+------------------------------------------------------------------+

  > Servidor escuchando en el puerto: \x1b[34m${PORT}\x1b[0m
  > API REST diponible en: \x1b[34mhttp://localhost:${PORT}\x1b[0m

+------------------------------------------------------------------+`)
}

app.listen(PORT, apiStartLog);