import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente App', () => {
  test('Testa se o link "home" funciona devidamente', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });

    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  test('Testa se o link "about" funciona normalmente', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });

    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  test('Testa se o link "Pokemons Favoritados" funciona normalmente', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkFavorite);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  test('Testa o "NotFound"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const notFoundText = screen.getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });
});
