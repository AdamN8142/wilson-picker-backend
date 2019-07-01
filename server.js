const express = require('express');
require('dotenv').config();
const app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
 console.log(`Trying out environment variables over on http://localhost:${app.get('port')}`);
});