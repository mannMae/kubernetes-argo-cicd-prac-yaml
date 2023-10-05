const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();

app.use(bodyParser.json());

// db.pool.query(
//   `CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`,
//   (err, results, fileds) => {
//     console.log('results', results);
//   }
// );

app.get('/api/values', (req, res) => {
  db.pool.query('SELECT * FROM lists;', (err, results, fileds) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json(results);
    }
  });
});

app.post('/api/value', (req, res, next) => {
  db.pool.query(
    `INSERT INTO lists (values) VALUES("${req.body.value}")`,
    (err, results, fileds) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    }
  );
});

app.listen(8080, () => {
  console.log('어플리케이션이 8080번 포트에서 시작되었습니다.');
});
