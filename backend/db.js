const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TrackMyTask',
    password: 'qwe123',
    port: 5432,
});

pool
    .connect()
    .then(() => console.log('PostgreSQL connected successfully'))
    .catch(err => console.error('Error while connecting to PostgreSQL:', err.stack));

module.exports = pool;
