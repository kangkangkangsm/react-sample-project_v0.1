const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const connection = require('../db');
// 세션
const JWT_KEY = "secret_key";

router.route("/")
    .get((req, res)=>{
        const query = 'SELECT * FROM TBL_USER';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return;
            }
            res.json('user', { list : results }); 
        });
    })
    .post((req, res)=>{
        const { email, password } = req.body;
        const query = 'SELECT * FROM TBL_USER WHERE id = ? AND pwd = ?'; 
        connection.query(query, [email, password], (err, results) => {
          if (err) throw err;
          if (results.length > 0) {
            // 여기 아래가 세션 expiresIn : 1h 1시간  (2줄)
            const user = results[0]; 
            const token = jwt.sign({userId : user, name : user.name}, JWT_KEY, {expiresIn : '1h'});
            console.log(token);
            res.json({ success: true, message :'로그인 성공!', token });
          } else {
            // 로그인 실패
            res.json({ success: false, message: '실패!' });
          }
        });
    });

router.route("/join")
    .put((req, res)=>{
      const { email, password } = req.body;
      const query = 'INSERT INTO TBL_USER(id,pwd) VALUES(?,?)'; 
      connection.query(query, [email, password], (err, results) => {
        if (err) {
            return res.json({success : false, message : "db오류"});
        }
      res.json({ success: true, message :'회원가입 성공!'}); 
      });
    });


module.exports = router;