module.exports = function(app) {


  //Exemplo de módulo para cada componente da aplicação
  //var Mod1 = require('./Mod1');
  //app.use('/mod1', Mod1)


  var dbfun = require('./db.js');

  var Produto = require('./models/produto');
  var Area = require('./models/area');
  var Fornecedor = require('./models/fornecedor');
  var Movimentacao = require('./models/movimentacao');
  var Planejamento = require('./models/planejamento');
  var Privilegio = require('./models/privilegio');
  var RegistroOperacional = require('./models/registroOperacional');
  var Status = require('./models/status');
  var Transportadora = require('./models/transportadora');
  var UnidadeMedida = require('./models/unidadeMedida');
  //var VerifyToken = require('./verifyToken');
  var auth = require('./auth');

  var moment = require('moment');
  //Criptografia da senha
  var sha1 = require('sha1');
  app.use(auth);
  app.get('/usuario/:user_id', function(req, res) {
    usuario = new dbfun.Usuario();
    usuario.find('all', {
      where: 'id =' + req.params.user_id
    }, function(err, rows) {
      if(err) throw err;
      res.json(rows);
    });
    /*Usuario.where( {id:req.params.user_id }).fetch({withRelated: ['tipoUsuario'], require: true}).then(function(usuario) {

    res.json({ usuario  });
  }); */

});


//  =================   USUÁRIO CRUD - INÍCIO ===================

app.post('/cadastrarUsuario', function(req, res) {   /// Cadastra um novo usuario

  var user = { /// Recebe os dados da view para serem cadastrados

    email: req.body.email,
    senha: (req.body.senha != undefined) || (req.body.senha != null) ? sha1(req.body.senha) : undefined,
    nome: req.body.nome,
    // lname: req.body.lname,
    idPrivilegio: req.body.tipo,
    idStatus: 1
  }
  listUser = [user.email, user.senha]
  verify = listUser.map((a) => a == undefined).reduce((a, b) => a || b)
  if(!verify) {
    usuario = new dbfun.Usuario(user) /// Conexão com o banco
    usuario.save(function(err) {
      if(err) { /// Caso ocorra um erro
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Cadastrar Usuário'
        });
      } else { /// Caso ocorra com sucesso
        // console.log('Novo usuario cadastrado');
        res.json({
          status: true,
          message: 'Novo usuario cadastrado'
        });
      }
    });
  } else {
    res.json({
      status: false
    });
  }
});

//Essa função remove o(s) usuário(s) selecionado(s)
app.delete('/removerUsuario/:usuario_id', function(req, res) {
  usuario = new dbfun.Usuario(); /// Conexão com o banco
  usuario.remove('idUsuario =' + req.params.usuario_id, function(err, res) { // Remove a partir do id
    if(err)
    return res.send(err);
  });
});

// Essa função edita o usuário no banco
app.put('/editarUsuario/:usuario_id', function(req, res) {
  usuario = new dbfun.Usuario();
  // Edita o usuário a partir do id
  usuario.query("UPDATE usuario SET nome='" + req.body.nome + "', email='" + req.body.email + "', senha='" + (sha1(req.body.senha)) + "', idPrivilegio=" + req.body.idPrivilegio + " WHERE idUsuario=" + req.params.usuario_id + ";",
  function(err) {
    if(err)
    res.send(err);
  });
  res.json({
    status: true,
    message: 'Usuario Atualizado'
  });
});

// Essa função pega um usuário no banco que vai ser editado na subtela
app.get('/getUsuario/:usuario_id', function(req, res) {
  usuario = new dbfun.Usuario();
  usuario.query("SELECT `usuario`.`idUsuario`,`usuario`.`nome`,    `usuario`.`email`,    `usuario`.`idStatus`,    `usuario`.`idPrivilegio`FROM `paf`.`usuario` WHERE `usuario`.`idUsuario`="+
  req.params.usuario_id+";", function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

// Essa função pega um usuário no banco que vai ser editado na subtela
app.get('/getUser/:usuario_id', function(req, res) {
  usuario = new dbfun.Usuario();
  usuario.query("SELECT `usuario`.`idUsuario`,`usuario`.`nome`,    `usuario`.`email`,    `usuario`.`idStatus`,    `usuario`.`idPrivilegio`FROM `paf`.`usuario` WHERE `usuario`.`idUsuario`="+
  req.params.usuario_id+";", function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

//Essa funçao retorna os usuários cadastrados no banco de dados com os devidos campos listados
app.get('/users', function(req, res) {
  users = new dbfun.Usuario();
  users.query("SELECT u.idUsuario, u.nome, u.email, u.senha, u.idStatus, u.idPrivilegio, p.nomePrivilegio FROM usuario as u, privilegio as p where u.idPrivilegio=p.idPrivilegio", function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
  // users.find('all', {
  //     fields: "idUsuario,nome,email,senha,idStatus,idPrivilegio",
  // }, function(err, rows, fields){
  //     if (err) throw err;
  //     res.json(rows);
  // });
});

//  =================   USUÁRIO CRUD - FIM ===================




//  =================   STATUS CRUD - INÍCIO ===================

app.get('/getStatus', function(req, res) { /// Retorna do banco todos os status cadastrados
  status = new dbfun.Status();
  status.find('all', {
    fields: "id,nomeStatus",
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

app.get('/getStat/:status_id', function(req, res) { /// Retorna do banco o status que vai ser editado na subtela de edição
  status = new dbfun.Status();
  status.find('all', {
    where: 'id =' + req.params.status_id
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

app.post('/cadastrarStatus', function(req, res) {  /// Cadastra um novo status
  var newStatus = { /// Recebe os dados da view para serem cadastrados
    nomeStatus: req.body.nomeStatus
  }
  status = new dbfun.Status(newStatus) /// Conexão com o banco
  status.save(function(err) {  /// Salva os dados no banco
    if(err) { /// Caso ocorra um erro
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Novo Status'
      });
    } else {  /// Caso ocorra com sucesso
      // console.log('Novo Status Cadastrado');
      res.json({
        status: true,
        message: 'Novo Status Cadastrado'
      });
    }
  });
});


app.put('/editarStatus/:status_id', function(req, res) { /// Edita um status a partir de seus dados
  status = new dbfun.Status(); /// Conexão com o banco
  status.query("UPDATE statusUsuario SET nomeStatus='" + req.body.nomeStatus + "' WHERE id=" + req.params.status_id + ";",  /// Atualiza os dados com a query do banco a patir do id
  function(err) { // Caso ocorra um erro
    if(err)
    res.send(err);
  });
  res.json({  /// Caso ocorra com sucesso
    status: true,
    message: 'Status Atualizado'
  });
});


app.delete('/removerStatus/:status_id', function(req, res) {   /// Deleta um determinado status a partir de seus dados
  status = new dbfun.Status();  /// Conexão com o banco
  status.remove('id =' + req.params.status_id, function(err, res) {  /// Remove o statos a partir de seu id
    if(err)  /// Caso ocorra um erro
    return res.send(err);
  });

});


//  =================   STATUS CRUD - FIM ===================





//  =================   UNIDADE DE MEDIDA CRUD - INÍCIO ===================

app.get('/getUnidadeMedida', function(req, res) { // Retorna do banco todos as unidades de medidas cadastradas

  UnidadeMedida.fetchAll().then(function(unidades) {
    //console.log(  JSON.stringify(unidades));
    res.json(unidades);
  }).catch(function (err) {
    res.json(err);
  });

});

app.post('/cadastrarUnidade', function(req, res) { /// Cadastra uma nova unidade de medida
  new UnidadeMedida(req.body).save().then(function(model) {
    console.log('Nova Unidade de Medida cadastrada');
    res.json({
      status: true,
      message: 'Nova Unidade de Medida cadastrada'
    });
  }).catch(function (err) {
    console.log(err);
    res.json({
      status: false,
      message: 'Erro ao Cadastrar Nova Unidade de Medida '
    });
  });
});

app.put('/editarUnidade/:unidade_id', function(req, res) { /// Edita a uniadade de medida a partir de seus dados
    UnidadeMedida.where({id: req.params.unidade_id}).save({sigla: req.body.sigla,descricao: req.body.descricao}  ,{ method: 'update'}).then(function () {
      res.json({
        status: true,
        message: 'Unidade de Medida Atualizada'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Atualizar Unidade de Medida '
      });
    });

});

app.get('/getUnidade/:unidade_id', function(req, res) { /// Retorna do banco a unidade de medida que vai ser editada na subtela
  UnidadeMedida.where({ id: req.params.unidade_id }).fetch().then(function(unidade) {
    //console.log(JSON.stringify(unidade) );
    res.json(unidade);
  }).catch(function (err) {
    console.log(JSON.stringify(err));
    res.json(err);
  });
});

app.delete('/removerUnidade/:unidade_id', function(req, res) { /// Deleta uma determinada unidade de medida
  UnidadeMedida.where({ id: req.params.unidade_id }).fetch().then((unidades)=> {
    unidades.destroy().then(function () {
      res.json({
        status: true,
        message: 'Unidade de Medida Deletada'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Deletar Unidade de Medida '
      });
    });
  });
});

//  =================   UNIDADE DE MEDIDA CRUD - FIM ===================






//  =================   GRUPO DE PEÇAS CRUD - INÍCIO ===================

app.get('/getGrupoPeca', function(req, res) { /// Retorna do banco todos os grupos cadastrados
  grupoPeca = new dbfun.GrupoPeca();
  grupoPeca.find('all', {
    fields: "idgrupPeca,grupo",
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});


app.get('/getGrupoP/:grupoPeca_id', function(req, res) {  /// Retorna do banco o grupo que vai ser editado na subtela de edição
  grupoPeca = new dbfun.GrupoPeca();
  grupoPeca.find('all', {
    where: 'idgrupPeca =' + req.params.grupoPeca_id
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

app.post('/cadastrarGrupoPeca', function(req, res) {   /// Cadastra um novo grupo
  var newGrupoPeca = { /// Recebe os dados da view para serem cadastrados
    grupo: req.body.grupo

  }
  grupoPeca = new dbfun.GrupoPeca(newGrupoPeca)
  grupoPeca.save(function(err) { /// Salva os dados no banco
    if(err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Novo Grupo de peças '
      });
    } else {
      // console.log('Novo Grupo de peças cadastrado');
      res.json({
        status: true,
        message: 'Novo Grupo de peças cadastrado'
      });
    }
  });
});


app.put('/editarGrupoPeca/:grupoPeca_id', function(req, res) { /// Edita um grupo a partir de seus dados
  grupoPeca = new dbfun.GrupoPeca();
  /// Atualiza os dados com a query do banco a patir do id
  grupoPeca.query("UPDATE grupoPeca SET grupo='" + req.body.grupo + "' WHERE idgrupPeca=" + req.params.grupoPeca_id + ";",
  function(err) {
    if(err)
    res.send(err);
  });
  res.json({
    status: true,
    message: 'Grupo de Peça Atualizado'
  });
});

app.delete('/removerGrupoPeca/:grupoPeca_id', function(req, res) {   /// Deleta um determinado grupo
  grupoPeca = new dbfun.GrupoPeca();
  grupoPeca.remove('idgrupPeca =' + req.params.grupoPeca_id, function(err, res) {  /// Remove o grupo a partir de seu id
    if(err)
    return res.send(err);
  });

});

//  =================   GRUPO DE PEÇAS CRUD - FIM ===================

//  =================   CATEGORIA CRUD - INÍCIO ===================




app.get('/categoria', function(req, res) { /// Retorna do banco todos os clientes cadastrados
  categoria = new dbfun.Categoria();
  categoria.find('all', {
    fields: "id,categoria",
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

app.get('/categoria/:categoria_id', function(req, res) {  /// Retorna do banco o grupo que vai ser editado na subtela de edição
  categoria = new dbfun.Categoria();
  categoria.find('all', {
    where: 'id =' + req.params.categoria_id
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

app.post('/categoria', function(req, res) {   /// Cadastra um novo grupo
  var newCategoria = { /// Recebe os dados da view para serem cadastrados
    categoria: req.body.categoria

  }
  categoria = new dbfun.Categoria(newCategoria)
  categoria.save(function(err) { /// Salva os dados no banco
    if(err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Nova Categoria '
      });
    } else {
      // console.log('Novo Grupo de peças cadastrado');
      res.json({
        status: true,
        message: 'Nova Categoria cadastrada'
      });
    }
  });
});

app.put('/categoria/:categoria_id', function(req, res) { /// Edita um grupo a partir de seus dados
  categoria = new dbfun.Categoria();
  /// Atualiza os dados com a query do banco a patir do id
  categoria.query("UPDATE categoria SET categoria='" + req.body.categoria + "' WHERE id=" + req.params.categoria_id + ";",
  function(err) {
    if(err)
    res.send(err);
  });
  res.json({
    status: true,
    message: 'Categoria Atualizada'
  });
});

app.delete('/categoria/:categoria_id', function(req, res) {   /// Deleta um determinado grupo
  categoria = new dbfun.Categoria();
  categoria.remove('id =' + req.params.categoria_id, function(err, res) {  /// Remove o grupo a partir de seu id
    if(err)
    return res.send(err);
  });
});

//  =================   CATEGORIA CRUD - FIM ===================



//  =================   TRANSPORTADORA CRUD - INÍCIO ===================




app.get('/transportadora', function(req, res) { /// Retorna do banco todos os clientes cadastrados
  transportadora = new dbfun.Transportadora();
  transportadora.find('all', {
    fields: "id,transportadora",
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

app.get('/transportadora/:transportadora_id', function(req, res) {  /// Retorna do banco o grupo que vai ser editado na subtela de edição
  transportadora = new dbfun.Transportadora();
  transportadora.find('all', {
    where: 'id =' + req.params.transportadora_id
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

app.post('/transportadora', function(req, res) {   /// Cadastra um novo grupo
  var newTransportadora = { /// Recebe os dados da view para serem cadastrados
    transportadora: req.body.transportadora

  }
  transportadora = new dbfun.Transportadora(newTransportadora)
  transportadora.save(function(err) { /// Salva os dados no banco
    if(err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Nova Transportadora '
      });
    } else {
      // console.log('Novo Grupo de peças cadastrado');
      res.json({
        status: true,
        message: 'Nova Transportadora cadastrada'
      });
    }
  });
});

app.put('/transportadora/:transportadora_id', function(req, res) { /// Edita um grupo a partir de seus dados
  transportadora = new dbfun.Transportadora();
  /// Atualiza os dados com a query do banco a patir do id
  transportadora.query("UPDATE transportadora SET transportadora='" + req.body.transportadora + "' WHERE id=" + req.params.transportadora_id + ";",
  function(err) {
    if(err)
    res.send(err);
  });
  res.json({
    status: true,
    message: 'Transportadora Atualizada'
  });
});

app.delete('/transportadora/:transportadora_id', function(req, res) {   /// Deleta um determinado grupo
  transportadora = new dbfun.Transportadora();
  transportadora.remove('id =' + req.params.transportadora_id, function(err, res) {  /// Remove o grupo a partir de seu id
    if(err)
    return res.send(err);
  });
});

//  =================   TRANSPORTADORA CRUD - FIM ===================


//  =================   PRODUTO CRUD - INÍCIO ===================


app.get('/produto', function(req, res) { /// Retorna do banco todos os clientes cadastrados

  Produto.fetchAll().then(function(produtos) {
    //console.log(  JSON.stringify(produtos));
    res.json(produtos);
  }).catch(function (err) {
    res.json(err);
  });

});

app.get('/produto/:produto_id', function(req, res) {  /// Retorna do banco o grupo que vai ser editado na subtela de edição
  Produto.where({ id: req.params.produto_id }).fetch().then(function(produto) {
    //console.log(JSON.stringify(produto) );
    res.json(produto);
  }).catch(function (err) {
    console.log(JSON.stringify(err));
    res.json(err);
  });
});

app.post('/produto', function(req, res) {   /// Cadastra um novo grupo
  new Produto(req.body).save().then(function(model) {
    console.log('Novo Produto cadastrado');
    res.json({
      status: true,
      message: 'Novo Produto cadastrado'
    });
  }).catch(function (err) {
    console.log(err);
    res.json({
      status: false,
      message: 'Erro ao Cadastrar Novo Produto '
    });
  });
});

app.put('/produto/:produto_id', function(req, res) { /// Edita um grupo a partir de seus dados

  Produto.where({ id: req.params.produto_id }).fetch().then((produtos)=> {
    produtos.save({produto: req.body.produto},{ method: 'update',patch: true}).then(function () {
      res.json({
        status: true,
        message: 'Produto Atualizado'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Atualizar Produto '
      });
    });
  });

});

app.delete('/produto/:produto_id', function(req, res) {   /// Deleta um determinado grupo

  Produto.where({ id: req.params.produto_id }).fetch().then((produtos)=> {
    produtos.destroy().then(function () {
      res.json({
        status: true,
        message: 'Produto Deletado'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Deletar Produto '
      });
    });
  });
});

//  =================   PRODUTO CRUD - FIM ===================


//  =================   FORNECEDOR CRUD - INÍCIO ===================

app.get('/fornecedor', function(req, res) { /// Retorna do banco todos os clientes cadastrados
  fornecedor = new dbfun.Fornecedor();
  fornecedor.find('all', {
    fields: "id,fornecedor",
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

app.get('/fornecedor/:fornecedor_id', function(req, res) {  /// Retorna do banco o grupo que vai ser editado na subtela de edição
  fornecedor = new dbfun.Fornecedor();
  fornecedor.find('all', {
    where: 'id =' + req.params.fornecedor_id
  }, function(err, rows, fields) {
    if(err) throw err;
    res.json(rows);
  });
});

app.post('/fornecedor', function(req, res) {   /// Cadastra um novo grupo
  var newFornecedor = { /// Recebe os dados da view para serem cadastrados
    fornecedor: req.body.fornecedor

  }
  fornecedor = new dbfun.Fornecedor(newFornecedor)
  fornecedor.save(function(err) { /// Salva os dados no banco
    if(err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Novo Fornecedor '
      });
    } else {
      // console.log('Novo Grupo de peças cadastrado');
      res.json({
        status: true,
        message: 'Novo Fornecedor cadastrado'
      });
    }
  });
});

app.put('/fornecedor/:fornecedor_id', function(req, res) { /// Edita um grupo a partir de seus dados
  fornecedor = new dbfun.Fornecedor();
  /// Atualiza os dados com a query do banco a patir do id
  fornecedor.query("UPDATE fornecedor SET fornecedor='" + req.body.fornecedor + "' WHERE id=" + req.params.fornecedor_id + ";",
  function(err) {
    if(err)
    res.send(err);
  });
  res.json({
    status: true,
    message: 'Fornecedor Atualizado'
  });
});

app.delete('/fornecedor/:fornecedor_id', function(req, res) {   /// Deleta um determinado grupo
  fornecedor = new dbfun.Fornecedor();
  fornecedor.remove('id =' + req.params.fornecedor_id, function(err, res) {  /// Remove o grupo a partir de seu id
    if(err)
    return res.send(err);
  });
});

//  =================   FORNECEDOR CRUD - FIM ===================

//  =================   PLANEJAMENTO CRUD - INÍCIO ===================


app.get('/planejamento', function(req, res) { /// Retorna do banco todos os clientes cadastrados

  Planejamento.fetchAll({withRelated: ['status','categoria','fornecedor','produto','area','movimentacao','transportadora','registroOperacional'], require: true}).then(function(planejamentos) {
    res.json(planejamentos);
  }).catch(function (err) {
    res.json(err);
  });

});

app.post('/planejamento', function(req, res) {   /// Cadastra um novo grupo

req.body.dataPlanejamento= moment(req.body.dataPlanejamento).format('YYYY-MM-DD');
req.body.horaPlanejamento= moment(req.body.horaPlanejamento).format('HH:mm');
  new Planejamento(req.body).save().then(function(model) {
    console.log('Novo Planejameto cadastrado');
    res.json({
      status: true,
      message: 'Novo Planejameto cadastrado'
    });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Novo Planejameto '
      });
  });
});

  app.get('/planejamento/:planejamento_id', function(req, res) {  /// Retorna do banco o grupo que vai ser editado na subtela de edição
  Planejamento.where({ id: req.params.planejamento_id }).fetch().then(function(planejamento) {
    //console.log(JSON.stringify(planejamento) );
    res.json(planejamento);
  });
});

app.get('/planejamento/status/:status_id',function(req, res) {  /// Retorna do banco o grupo que vai ser editado na subtela de edição
Planejamento.query(function(qb) {
  qb.where('idStatus', '<=', req.params.status_id);
}).fetchAll({withRelated: ['status','categoria','fornecedor','produto','area','movimentacao','transportadora'], require: true}).then(function(planejamentos) {
  //console.log(JSON.stringify(planejamentos) );
  res.json(planejamentos);
}).catch(function (err) {
  console.log(JSON.stringify(err));
  res.json(err);
});
});


app.put('/planejamento/:planejamento_id', function(req, res) { /// Edita um grupo a partir de seus dados

  Planejamento.where({ id: req.params.planejamento_id }).fetch().then((planejamento)=> {
    planejamento.save(req.body,{ method: 'update',patch: true}).then(function () {
      res.json({
        status: true,
        message: 'Planejamento Atualizado'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Atualizar Planejamento '
      });
    });
  });

});

/*
app.delete('/produto/:produto_id', function(req, res) {   /// Deleta um determinado grupo

  Produto.where({ id: req.params.produto_id }).fetch().then((produtos)=> {
    produtos.destroy().then(function () {
      res.json({
        status: true,
        message: 'Produto Deletado'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Deletar Produto '
      });
    });
  });
});
*/
//  =================   PLANEJAMENTO CRUD - FIM ===================


//  =================   REGISTRO OPERACIONAL CRUD - INÍCIO ===================


app.get('/operacional', function(req, res) { /// Retorna do banco todos os clientes cadastrados

  RegistroOperacional.fetchAll({withRelated: ['planejamento','usuarioOpInicio','usuarioOpFinal'], require: true}).then(function(registros) {
    res.json(registros);
  }).catch(function (err) {
    res.json(err);
  });

});

app.post('/operacional', function(req, res) {   /// Cadastra um novo grupo
  req.body.dataEntrada= moment(req.body.dataEntrada).format('YYYY-MM-DD');
  req.body.horaEntrada= moment(req.body.horaEntrada).format('HH:mm');
  req.body.dataSaida= moment(req.body.dataSaida).format('YYYY-MM-DD');
  req.body.horaSaida= moment(req.body.horaSaida).format('HH:mm');

  new RegistroOperacional(req.body).save().then(function(model) {
    console.log('Novo Registro Operacional cadastrado');
    res.json({
      status: true,
      message: 'Novo Registro Operacional cadastrado',
      operacionalId: model.id
    });
    });
});

 app.get('/operacional/:operacional_id', function(req, res) {  /// Retorna do banco o grupo que vai ser editado na subtela de edição
  RegistroOperacional.where({ id: req.params.operacional_id }).fetch().then(function(operacional) {
    console.log(JSON.stringify(operacional) );
    res.json(operacional);
  }).catch(function (err) {
    console.log(JSON.stringify(err));
    res.json(err);
  });
});

/*
app.put('/produto/:produto_id', function(req, res) { /// Edita um grupo a partir de seus dados

  Produto.where({ id: req.params.produto_id }).fetch().then((produtos)=> {
    produtos.save({produto: req.body.produto},{ method: 'update',patch: true}).then(function () {
      res.json({
        status: true,
        message: 'Produto Atualizado'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Atualizar Produto '
      });
    });
  });

});

app.delete('/produto/:produto_id', function(req, res) {   /// Deleta um determinado grupo

  Produto.where({ id: req.params.produto_id }).fetch().then((produtos)=> {
    produtos.destroy().then(function () {
      res.json({
        status: true,
        message: 'Produto Deletado'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Deletar Produto '
      });
    });
  });
});
*/
//  =================   REGISTRO OPERACIONAL CRUD - FIM ===================


app.post('/logout', function(req, res) {   /// Deleta um determinado grupo

  req.session.user=null;
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};
