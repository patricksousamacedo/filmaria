import { useEffect, useState } from 'react';
import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import api from  '../../services/api';

import { toast } from 'react-toastify';


export default function Filme(){
  const { id } = useParams(); // Serve para acessar o id, isso ai é o id do filme, ele pega direto na url, como faz isso? não sei
  const history = useHistory(); // se o usuario pesquisar um id que não existe o usuário será levado pra home, veja no if

  const [ filme, setFilme ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    
    async function loadFilme(){
      const response = await api.get(`r-api/?api=filmes/${id}`);

      if(response.data.length === 0){
        // tentou acessar com um id que não existe, navego pra home
        history.replace('/');
        return;
      }

      setFilme(response.data);
      setLoading(false);
    }

    loadFilme();

    return () => {
      // console.log('componente desmontado');
    }

  }, [history, id]);

  function salvaFilme() {

    const minhaLista = localStorage.getItem('filmes');

    let filmesSalvos = JSON.parse(minhaLista) || [];


    // se tiver algum filme salvo com o mesmo id, ignorar
    // some, testa se ao menos um dos elementos no array passa no teste implementado pela função atribuída e retorna um valor true ou false.
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if(hasFilme) {
      toast.info('Você já possui esse filme salvo')
      return; // para a execução do código
    }

    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos))
    toast.success('Filme salvo com sucesso!')
  }

  if(loading) {
    return(
      <div className="filme-info">
        <h1>Carregando seu filme...</h1>
      </div>
    )
  }

  return(
    <div className="filme-info">
      <h1> {filme.nome} </h1>
      <img src={filme.foto} alt={filme.nome} />

      <h3>Sinopse</h3>
      {filme.sinopse}

      <div className="botoes">
        <button onClick={salvaFilme} >Salvar</button>
        <button>
          <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}