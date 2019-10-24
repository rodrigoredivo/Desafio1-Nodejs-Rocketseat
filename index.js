  const express = require('express');

  const server = express();

  server.use(express.json());

  let requisitionNumbers = 0 ;
  const projects = [];

/**
 *----- Middleware que checa se o projeto existe -----
 */

 function checkUserExists(req, res , next){ 
  const project = projects[req.params.id];
  if(!project){
     return res.status(400).json({ error: `Project not found`
    });
   }
   return next();
 } 

 /**
 * ----- Middleware de número de requisições -----
 */
  server.use((req, res, next)=>{
    requisitionNumbers++;
    console.log(`A requisição foi Chamada! ;
    Método ${req.method};
    Numero de Requisições: ${requisitionNumbers};
    URL: ${req.url};`);

    return next();
  });

  /**
   * ----- Listando os Projetos -----
   */
  server.get('/projects',(req, res)=>{
    return res.json(projects);
  })

  /**
   * ----- Listando apenas um Projeto -----
   */
  server.get('/projects/:id',checkUserExists,(req, res)=>{
    const { id } = req.params;
    return res.json(projects[id]);
  })
  /**
   * ----- Criando/Adicionando novos Projetos -----
   */
  server.post('/projects',(req, res)=>{
    const { id, title } = req.body;
    const project = {
      id,
      title,
      tasks: []
    };

    projects.push(project);
    console.log('Projeto:',project);

    return res.json(project)
  })
  /**
  * ----- Criando/Adicionando TASK nos Projetos --- 
  */ 
  server.post('/projects/:id/tasks',(req, res)=>{
    const { id } = req.params;
    const { title } = req.body;
    projects[id].tasks.push(title)
    return res.json(projects)
  })
  /**
   * ----- Editando Projetos -----
   */
  server.put('/projects/:id',checkUserExists, (req, res)=>{
    const { id , } = req.params;
    const { title } = req.body;

    projects[id].title = title
    return res.json(projects)
  })
  /**
   * ----- Excluindo/Deletando Projetos -----
   */
  server.delete('/projects/:id',checkUserExists,(req, res)=>{
    const { id } = req.params;

    projects.splice(id, 1);

    return res.json(projects)
  })

  server.listen(4000);
