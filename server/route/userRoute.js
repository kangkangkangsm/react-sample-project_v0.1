const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const connection = require('../db');
//세션
const bcrypt = require('bcrypt');
// 세션
const JWT_KEY = "secret_key";
const ROUND = 10;

// 로그인(Login) -----------------------------------------------------------------------------------------------------------------------------  
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
      const { userId, password } = req.body;
      const query = 'SELECT * FROM rp_tbl_user WHERE userId = ? AND password = ?';
      
      connection.query(query, [userId, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
    // 로그인 성공한 경우
          const user = results[0];
          console.log(user);
    // 토큰 생성 
    // 첫번째 파라미터(페이로드) : 담고싶은 정보(비밀번호와 같은 중요한 데이터는 넣지 말 것)
    // 두번째 파라미터(키) : 위에서 선언한 서버의 비밀 키
    // 세번째 파라미터 : 만료 시간
          const token = jwt.sign({userId : user.userId, name : user.username}, JWT_KEY, {expiresIn : '1h'});
          console.log(token);
    // 토큰 담아서 리턴
          res.json({ success: true, message : "로그인 성공!", token });
        } else {
          // 로그인 실패
          res.json({ success: false, message: '실패!' });
        }
      });
  });
// 로그인(Login) -----------------------------------------------------------------------------------------------------------------------------  
// 회원가입(Join) -----------------------------------------------------------------------------------------------------------------------------
// 아이디 체크 
router.route("/check/id")
.post((req, res)=>{
  const { userId } = req.body;
  const query = 'SELECT * FROM rp_tbl_user WHERE userId = ?';
  
  connection.query(query, [userId], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      res.json({ success: true, message : "중복된 아이디!"});
    } else {
      res.json({ success: false});
    }
  });
});
// 이메일 체크 
router.route("/check/email")
.post((req, res)=>{
  const { email } = req.body;
  const query = 'SELECT * FROM rp_tbl_user WHERE email = ?';
  
  connection.query(query, [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      res.json({ success: true, message : "중복된 이메일!"});
    } else {
      res.json({ success: false});
    }
  });
});
//회원가입 
router.route("/join")
    .post((req, res)=>{
      const { userId, username,email,password } = req.body;
      const query = 'INSERT INTO rp_tbl_user(userId,username,email,password) VALUES(?,?,?,?)'; 
      connection.query(query, [userId, username, email, password], (err, results) => {
        if (err) {
            return res.json({success : false, message : "db오류"});
        }
      res.json({ success: true, message :'회원가입 성공!'}); 
      });
    });
// 회원가입(Join) -----------------------------------------------------------------------------------------------------------------------------
module.exports = router;