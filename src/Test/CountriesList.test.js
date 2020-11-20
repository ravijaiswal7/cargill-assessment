import React from 'react';
import ReactDOM from 'react-dom';
import CountriesList from '../components/CountriesList';
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    headers: [],
    uuid: jest.fn(),
    sortCountryList: jest.fn(),
    sortOrder: 'none',
    countries: []
  }
  ReactDOM.render(<CountriesList {...props}/>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders CountriesList correctly', () => {
  const props = {
    headers: [
      'population'
    ],
    uuid: jest.fn(),
    sortCountryList: jest.fn(),
    sortOrder: 'none',
    countries: []
  }
 const { getByTestId } = render(<CountriesList {...props}> </CountriesList>);
 expect(getByTestId('sort-btn')).toHaveTextContent('population');
})

it('calls sortCountryList prop when clicked', () => {
  const props = {
    headers: ['population'],
    uuid: jest.fn(),
    sortCountryList: jest.fn(),
    sortOrder: 'none',
    countries: []
  };
  const { getByTestId } = render(<CountriesList {...props}> </CountriesList>);
  fireEvent.click(getByTestId('sort-btn'));
  expect(props.sortCountryList).toHaveBeenCalledTimes(1);
});