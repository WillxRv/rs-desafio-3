const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const findRepository = repositories.find(
    (repository) => repository.id === id
  );

  if(!findRepository){
    return response.status(404).json(
      { error: "Repository not found" }
    );
  }

  if(title){
    findRepository.title = title;
  }
    
  if(url){
    findRepository.url = url;
  }
    
  if(techs){
    findRepository.techs = techs;
  }
  
  return response.json(findRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.find(
    (repository) => repository.id === id
  );

  if(!findRepository){
    return response.status(404).json(
      { error: "Repository not found" }
    );
  }

  repositories.splice(repositories.indexOf(findRepository), 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.find(
    (repository) => repository.id === id
  );

  if(!findRepository){
    return response.status(404).json(
      { error: "Repository not found" }
    );
  }

  findRepository.likes++;

  return response.json(findRepository);
});

module.exports = app;
