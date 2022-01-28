import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente Favorite Pokemons', () => {
  beforeEach(() => {
    renderWithRouter(<FavoritePokemons />);
  });
  test('Teste se é exibido na tela a mensagem "No favorite Pokemon found', () => {
    const noFavoriteMsg = screen.getByText(/No favorite Pokemon found/i);
    expect(noFavoriteMsg).toBeInTheDocument();
  });
});
