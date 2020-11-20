import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function CountriesList({
  headers,
  uuid,
  sortCountryList,
  sortOrder,
  countries
}) {
  return (
    <div>
      <div className="country-colValue">
        {headers.map((item, index) => (
          <div className="each-header" key={uuid()}>
            {item === 'population' ? (
              <button data-testid="sort-btn" type="button" onClick={sortCountryList} className="sort-btn">
                {item}
                {sortOrder === 'desc' && <span> ▼</span>}
                {sortOrder === 'asc' && <span> ▲</span>}
              </button>
            ) : (
              <span>{item}</span>
            )}
          </div>
        ))}
      </div>
      <Fragment>
        {countries.map((country, index) => (
          <div className="country-details" key={uuid()}>
            {Object.values(country).map((detail, index) =>
              Array.isArray(detail) ? (
                <div className="each-detail-item" key={uuid()} title={detail.map(item => item.name).toString()}>
                  {detail.map(item => item.name).toString()}
                </div>
              ) : (
                <div className="each-detail-item" key={uuid()} title={detail}>
                  {detail}
                </div>
              )
            )}
          </div>
        ))}
      </Fragment>
    </div>
  );
}

CountriesList.propTypes = {
  headers: PropTypes.instanceOf(Array),
  uuid: PropTypes.func,
  sortCountryList: PropTypes.func,
  sortOrder: PropTypes.string,
  countries: PropTypes.instanceOf(Array)
}

export default CountriesList

