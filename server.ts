import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createServer = async () => {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');

      const appHtml = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).setHeader('Content-Type', 'text/html').end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error as Error);
    }
  });

  app.listen(port, () => console.log(`server start at port ${port}`));
};

createServer();
