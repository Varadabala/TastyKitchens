import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const RestaurantHeader = props => {
  const onChangeSortBy = event => {
    const {changeSortBy} = props
    changeSortBy(event.target.value)
  }

  const {sortByOptions, activeOptionId} = props
  return (
    <div className="restaurant-header">
      <div className="header-text-container">
        <h1 className="restaurant-list-heading">Popular Restaurants</h1>
        <p className="restaurant-list-para">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortBy}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.id}
              value={eachOption.value}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default RestaurantHeader
