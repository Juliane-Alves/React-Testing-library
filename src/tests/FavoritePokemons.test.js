import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente Favorite Pokemons', () => {
  beforeEach(() => {
    renderWithRouter(<FavoritePokemons />);
  });
  test('Teste se é exibido na tela a mensagem "No favorite Pokemon foud', () => {
    const noFavoriteMsg = screen.getByText('heading', {
      name: /No favorite pokemon found/i });
    expect(noFavoriteMsg).toBeInTheDocument();
  });
});
