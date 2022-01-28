import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('Testa se o H2 com o texto "about pokedex"', () => {
    const titleH2 = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i });
    expect(titleH2).toBeInTheDocument();
  });
  test('Testa se a pagina contem dois paragrafos', () => {
    const pokemomText = screen.getAllByText(/pokémons/i); // getAllByText é usado pra array
    expect(pokemomText).toHaveLength(2);
  });
  test('Testa se a imagem existe no documento', () => {
    const image = screen.getByRole('img', { name: 'Pokédex' });
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toHaveAttribute('src', urlImg);
  });
});
