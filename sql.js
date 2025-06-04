const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'my-rds.c10yywu4cx2k.ap-northeast-3.rds.amazonaws.com',
    user: 'admin',
    password: '9237eric',
    database: 'my_db_01'
})

// db.connect()

db.connect((err) => {
    if (err) {
        console.error('Error connecting to RDS:', err);
        return;
    }
    console.log('Connected to the RDS database!');
});
module.exports = db