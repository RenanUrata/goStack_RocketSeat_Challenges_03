import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const repoNew = {
      url: "https://github.com/renanurata",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }
    const response = await api.post('repositories', repoNew)
    setRepositories([...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(
      repo => repo.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(
          repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
          </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
