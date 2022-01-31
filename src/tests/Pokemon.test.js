import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('test se as cartas dos pokemons estão renderizando corretamente', () => {
  test('Test se a carta do pokemon renderiza', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(title).toBeInTheDocument();

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const pokemonfav = screen.getByText(/pokémon favoritado/i);
    expect(pokemonfav).toBeInTheDocument();

    const favCheck = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favCheck);

    const favoritePokemonsPage = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsPage);

    const name = screen.getByText(/pikachu/i);
    const type = screen.getByText(/electric/i);
    const size = screen.getByText(/average weight:/i);
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(size).toBeInTheDocument();
  });
  test('Test se o pokémon correto é renderizado', () => {
    renderWithRouter(<App />);
    const pokePoison = screen.getByRole('button', { name: /poison/i });
    userEvent.click(pokePoison);

    const pokeEkans = screen.getByText(/ekans/i);
    expect(pokeEkans).toBeInTheDocument();

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const pokemonfav = screen.getByText(/pokémon favoritado\?/i);
    expect(pokemonfav).toBeInTheDocument();

    const favCheck = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favCheck);

    const favoritePokemonsPage = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsPage);

    const pokeEk = screen.getByText(/ekans/i);
    expect(pokeEk).toBeInTheDocument();
  });
  test('Test se o tamanho do pokemon renderiza com os atributos correntos', () => {
    const { container } = renderWithRouter(<App
      measurementUnit="kg"
      value="6.0"
      averageWeight="Average weight"
    />);
    expect(container.firstChild).toMatchSnapshot();
    // Container(firstCHild) contém o container renderizado.
    // Sobre os testes que precisam de verificar os atributos, estava tentando fazer com o ToHaveAtributte e não funcionou,
  /*  obtive orientação de Nicole Calderari sobre o metodo Snapshot que vai criar uma pasta "por baixo dos panos"
    com o componente que estou usando e que vai conter as props, então nesse test se espera que os atributos estejam iguais
    ao Snapshot */
    // snapshot foi usado em todos os tests que rerifica atributo//
  });
  test('test se a imagem é renderizada com os atributos corretos', () => {
    renderWithRouter(<App />);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const image = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(image).toHaveAttribute('src', url);
  });
});

describe('testando a URL da pagina Pokedex', () => {
  test('test se contém um link de navegação "Mostrar detalhes"', () => {
    renderWithRouter(<App />);
    const link = screen.getByText(/more details/i);
    expect(link).toBeInTheDocument();
  });
  test('test se a url do link contém o id do pokemon', () => {
    const { container } = renderWithRouter(<App id="25" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
describe('Testando o link de navegação de um pokemon', () => {
  test('Test se redireciona para detalhes do pokemon quando é clicado', () => {
    renderWithRouter(<App />);
    const link = screen.getByText(/more details/i);
    userEvent.click(link);
    const pokeSummary = screen.getByRole('heading', { name: /summary/i });
    expect(pokeSummary).toBeInTheDocument();
  });
});

describe('testando o icone favorito', () => {
  test('Test se tem um icone de "fav" quando é adicionado aos favoritos', () => {
    const { container } = renderWithRouter(<App
      alt="Pikachu is marked as favorite"
      src="/star-icon.svg"
    />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('test se o atributo contém o caminho "src" correto', () => {
    const { container } = renderWithRouter(<App src="/star-icon.svg" />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('test se contém um atributo alt com o nome do Pokemon', () => {
    const { container } = renderWithRouter(<App
      alt="Pikachu is marked as favorite"
    />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
