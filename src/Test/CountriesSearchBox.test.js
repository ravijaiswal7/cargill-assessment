import React from 'react';
import ReactDOM from 'react-dom';
import CountriesSearchBox from './../components/CountriesSearchBox';
import { render, fireEvent } from '@testing-library/react'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    searchByNameorCode: jest.fn(),
  }
  ReactDOM.render(<CountriesSearchBox {...props}/>, div);
  ReactDOM.unmountComponentAtNode(div);
})


it('calls searchByNameorCode prop when a value is typed', () => {
  const props = {
    searchByNameorCode: jest.fn(),
  };
  const { getByTestId } = render(<CountriesSearchBox {...props}></CountriesSearchBox>);
  fireEvent.keyUp(getByTestId('search-box'));
  expect(props.searchByNameorCode).toHaveBeenCalledTimes(1);
});