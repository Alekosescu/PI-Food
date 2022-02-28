import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() { 
    return (
        <div>   
            <h1>Bienvenue sur ma page de recette!</h1>
            <Link to='/home'>
                <button>Entrer dans</button>
            </Link>
        </div>
    )
}