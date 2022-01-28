import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

describe('test o component notFound', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/xablau');
  });
  test('Testa se a pagina contem um h2 ', () => {
    const title = screen.getByRole('heading', { name: /page/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/page requested not found/i);
  });
  test('Testa se a pagina mostra a imagem ', () => {
    const image = screen.getByRole('img', { name: /pikachu crying/i });
    const urlImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toHaveAttribute('src', urlImage);
  });
});
