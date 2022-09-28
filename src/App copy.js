import React, { useState, useEffect } from 'react';

export default function App() {

  const [repositories, setRepositories] = useState([]);
      
  useEffect(() => {

    const loadData = async() => {
      const response = await fetch("https://api.github.com/users/diego3g/repos");
      const data = await response.json();
      setRepositories(data);
    }

    loadData();

  }, []);  

  useEffect(() => {
    const filtered = repositories.filter(rep => rep.favorite)

    document.title = `Você tem ${filtered.length} favotiros`
  }, [repositories])

  function handleFavorite(id) {
    const newRepositorite = repositories.map(rep => {
      return rep.id === id ? { ...rep, favorite: !rep.favorite} : rep
    })

    setRepositories(newRepositorite)
  }

  return (
    <ul>
      {repositories.map(rep => (
        <li key={rep.id}>
          {rep.name}
          {rep.favorite && <span>(Favotiro)</span>}
          <button onClick={() => handleFavorite(rep.id)}>Favoritar</button>
        </li>
      ))
      }
    </ul>
  )
}
