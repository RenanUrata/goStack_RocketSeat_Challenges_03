import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api'

function App() {
  const { repositories, setRepositories } = useState([])
  const { i, setI } = useState(1)

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const repoNew = {
      title: `Desafio ${i}`, url: "gostack01.com", techs: "Renan Urata"
    }
    const response = await api.post('repositories', repoNew)
    setRepositories([...repositories, repoNew])
    setI(i + 1)
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`repositories/${id}`)
    // const deletedRepo = [...repositories].splice(id, 1)
    // setRepositories([deletedRepo])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(
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
