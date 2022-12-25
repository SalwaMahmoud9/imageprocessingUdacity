import express from 'express';
import routes from './routes/index';
import logger from './utilities/logger';

const app = express();
const port = 3000;

//middlewares
app.use([logger]);

//routes to access  /api which is my home page
app.use('/api', routes);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
