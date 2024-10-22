const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const connection = require('../db');
//세션
const bcrypt = require('bcrypt');
// 세션
const JWT_KEY = "secret_key";
const ROUND = 10;

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
    // 로그인 성공한 경우
          const user = results[0];
    // 토큰 생성 
    // 첫번째 파라미터(페이로드) : 담고싶은 정보(비밀번호와 같은 중요한 데이터는 넣지 말 것)
    // 두번째 파라미터(키) : 위에서 선언한 서버의 비밀 키
    // 세번째 파라미터 : 만료 시간
          const token = jwt.sign({userId : user.id, name : user.name}, JWT_KEY, {expiresIn : '1h'});
          console.log(token);
    // 토큰 담아서 리턴
          res.json({ success: true, message : "로그인 성공!", token });
        } else {
          // 로그인 실패
          res.json({ success: false, message: '실패!' });
        }
      });
  });

router.route("/join")
    .post((req, res)=>{
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