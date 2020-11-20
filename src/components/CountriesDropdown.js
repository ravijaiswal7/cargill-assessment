import React from 'react'
import PropTypes from 'prop-types'

function CountriesDropdown({
  handleChange,
  uuid,
  dropDownValues
}) {
  return (
    <div>
      <select data-testid="select-box" defaultValue="--Select Country--" onChange={handleChange} className="country-input">
        <option key={uuid()} className="country-input option" value="--Select Country--">
          {'--Select Country--'}
        </option>
        {dropDownValues.map((item, index) => (
          <option key={uuid()} className="country-input option" value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

CountriesDropdown.propTypes = {
  handleChange: PropTypes.func,
  uuid: PropTypes.func,
  dropDownValues: PropTypes.instanceOf(Array)
}

export default CountriesDropdown

