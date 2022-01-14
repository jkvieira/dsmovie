import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Movie } from 'Types/movie';
import { BASE_URL } from 'utils/requests';
import { validateEmail } from 'utils/validate';
import './style.css';


type Props = {
    movieID: string;
}

function FormCard({movieID}:Props) {
    //redirecionamento de rota (para pág home)
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie>();

    useEffect(()=>{
        axios.get(`${BASE_URL}/movies/${movieID}`)
          .then(response => {
              setMovie(response.data);
          })
    },[movieID]);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const score = (e.target as any).score.value;
    //não envia se o email não for válido
    if (!validateEmail(email)){
        return;
    }

    const config: AxiosRequestConfig = {
        baseURL: BASE_URL,
        method: 'PUT',
        url: '/scores',
        data: {
            movieID: movieID,
            email: email,
            score: score
        }
    }
     
    axios(config).then(response => {
        navigate("/");
    });
}

    return (
        <div className="dsmovie-form-container">
            <img className="dsmovie-movie-card-image" src={movie?.image} alt={movie?.title} />
            <div className="dsmovie-card-bottom-container">
                <h3>{movie?.title}</h3>
                <form className="dsmovie-form" onSubmit={handleSubmit}>
                    <div className="form-group dsmovie-form-group">
                        <label htmlFor="email">Informe seu email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group dsmovie-form-group">
                        <label htmlFor="score">Informe sua avaliação</label>
                        <select className="form-control" id="score">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="dsmovie-form-btn-container">
                        <button type="submit" className="btn btn-primary dsmovie-btn">Salvar</button>
                    </div>
                </form >
                <Link to="/">
                    <button className="btn btn-primary dsmovie-btn mt-3">Cancelar</button>
                </Link>
            </div >
        </div >

    );

}

export default FormCard;