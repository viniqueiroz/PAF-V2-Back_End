var express = require('express');
var dbfun = require('./db.js');
var jwt = require('jsonwebtoken');

var RoutUsuario = express.Router();

var sha1 = require('sha1');


RoutUsuario.post('/auth', function(req, res) {
  usuariof = new dbfun.Usuario();
  //console.log(req.body);
  var r = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;
  var email = req.body.email.match(r);
  var senha = sha1(req.body.senha);
  if(email != null) {
    email = email[0];
    usuariof.find('all', {
      fields: ['email', 'idUsuario', 'senha', 'nome','idPrivilegio'],
      where: "email=\"" + email + "\""
    }, function(err, rows, fields) {

      if(err) throw err;
      var user = null;
      if(rows[0]) {
        user = {
          id: rows[0].idUsuario,
          nome: rows[0].nome,
          idPrivilegio: rows[0].idPrivilegio
        };
      }
      if(!user) {
        res.json({
          status: false,
          message: 'Usuário Não Encontrado'
        });
      } else if(user) {

        //verifica se a senha esta correta
        if(rows[0].senha != String(senha)) {

          res.json({
            status: false,
            message: 'Senha Incorreta'
          });
        } else {
          // Se a conta for encontrada e a senha bater com a verdadeira
          // Cria uma token
          var token = jwt.sign(user, dbfun.secret, {
            expiresIn: 60 * 60 * 7  // Expira em 7 horas
          });
          res.json({
            status: true,
            message: 'Token Gerada',
            token: token,
            user
          });
        }
      }
    })
  } else {
    res.json({
      status: false,
      message: 'Usuário Não Encontrado'
    });
  }
});

RoutUsuario.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

RoutUsuario.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    // Faz verificação da Token
    jwt.verify(token, dbfun.secret, function(err, token_decoded) {
      if(err) {
        // Se a verificação falhar
        //console.log(req.headers['x-access-token']);
        return res.json({
          status: false,
          message: "Falha para autentificar a Token."
        });
      } else {
        //console.log("token Ok")
        // Token é verificada, Salva as informações
        req.token = token_decoded;
        req.user = token_decoded.user;
        req.authenticated = true;
        next();
      }

    });
  }
});

module.exports = RoutUsuario;
