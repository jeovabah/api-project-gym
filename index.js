const express = require('express');
const routes = require('./src/routes');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/', routes);

app.listen(PORT,()=>{
    console.log(`Iniciado na porta ${PORT}`);
})