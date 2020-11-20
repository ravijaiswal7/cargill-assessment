import React from 'react';
import ReactDOM from 'react-dom';
import CountriesDropdown from './../components/CountriesDropdown';
import { render, fireEvent } from '@testing-library/react'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    handleChange: jest.fn(),
    uuid: jest.fn(),
    dropDownValues: []
  }
  ReactDOM.render(<CountriesDropdown {...props}/>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('calls handleChange prop when a new value is selected', () => {
  const props = {
    handleChange: jest.fn(),
    uuid: jest.fn(),
    dropDownValues: []
  };
  const { getByTestId } = render(<CountriesDropdown {...props}></CountriesDropdown>);
  fireEvent.change(getByTestId('select-box'));
  expect(props.handleChange).toHaveBeenCalledTimes(1);
});