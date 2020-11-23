import React from 'react'
import PropTypes from 'prop-types'

function CountriesSearchBox({
  searchByNameorCode
}) {
  return (
    <div>
      <input
        data-testid="search-box" 
        type="text"
        id="myInput"
        onKeyUp={searchByNameorCode}
        placeholder="Search for country names.."
        title="Type in a name"
        className="country-input"
        style={{ width: '-webkit-fill-available' }}
      ></input>
    </div>
  );
}

CountriesSearchBox.propTypes = {
  searchByNameorCode: PropTypes.func
}

export default CountriesSearchBox

