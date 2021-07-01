
import { useEffect, useState } from 'react';
import './home.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [filmes, setFilmes] = useState([]); // essa é a state filmes

  useEffect(() => { // esse effect serve para adicionar na state filmes o conteudo da api

    async function loadFilmes(){
      const response = await api.get('r-api/?api=filmes')
      // console.log(response.data);
      setFilmes(response.data); // data quer dizer que está pegando os dados da variavel response.
    }

    loadFilmes();

  }, []);

  return(
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return(
            <article key={filme.id}>
              <strong> {filme.nome} </strong>
              <img src={filme.foto} alt={filme.nome} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  );
}