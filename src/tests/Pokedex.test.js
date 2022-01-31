import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const ButtonFilter = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

describe('test o componente pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('test se a pagina tem o h2', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
  });
  test('test se encontra o texto "Encountered pokémons', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('Encountered pokémons');
  });
});

describe('Test o proximo botão pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Test se o proximo pokemom é mostrado quando é clicado', () => {
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonBtn);
    const nextPokemon = screen.getByRole('img', { name: /charmander sprite/i });
    expect(nextPokemon).toBeInTheDocument();
  });
  test('Test se o botão contem o texto "Próximo pokémon"', () => {
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toHaveTextContent('Próximo pokémon');
  });
  test('Test se os pokemons foram listados um por um', () => {
    const pokemon = screen.getAllByRole('img'); // getAllByRole por ser usado com lista e array
    expect(pokemon).toHaveLength(1);
  });
  test('Test se quando a lista acabar o proximo pokemon retorna ao primeiro', () => {
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemonList = 9;
    for (let i = 0; i < pokemonList; i += 1) {
      userEvent.click(nextPokemonBtn);
    }
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});

describe('Test os botões pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Test se contém botões de preenchimento', () => {
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(ButtonFilter.length);
  });
  test('Test se o pokémon filtrado é renderizado', () => {
    const fire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fire);
    const charmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmander).toBeInTheDocument();
  });
  test('Test se o botão "Tudo" está sempre visivel', () => {
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);
    expect(allBtn).toBeInTheDocument();
  });
});

describe('Test o botão de reset', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('test se contem um botão de reset', () => {
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);
    const firstPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(firstPokemon).toBeInTheDocument();
  });
  test('test se o botão all contém o texto "all"', () => {
    const button = screen.getByRole('button', { name: /all/i });
    expect(button).toHaveTextContent('All');
  });
  test('Test se a pagina quando carregada contém o filtro todo selecionado', () => {
    const firstPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(firstPokemon).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);
    const secondPokemon = screen.getByRole('img', { name: /charmander sprite/i });
    expect(secondPokemon).toBeInTheDocument();
  });
});

// Também obtive orientação da colega Nicole Calderari
