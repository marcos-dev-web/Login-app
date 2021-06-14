const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');
const { invalidRoute } = require('./middlewares');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
	origin: "http://localhost:3000",
	methods: ['POST', 'GET'],
	preflightContinue: false,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(routes);
app.use(invalidRoute);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
})
