import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente Favorite Pokemons', () => {
  test('Teste se é exibido na tela a mensagem "No favorite Pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoriteMsg = screen.getByText(/No favorite Pokemon found/i);
    expect(noFavoriteMsg).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokemons favoritados', () => {
    renderWithRouter(<App />);
    const detail = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detail);

    const favCard = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favCard);

    const favoritePokemon = screen.getByText(/Favorite Pokémons/i);
    userEvent.click(favoritePokemon);

    const pikachu = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
  });
});

// Obtive orientação dá colega Nayara Vasconcelos, na questão do melhor redirecionamento pro link de More Details;
