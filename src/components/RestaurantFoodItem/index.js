/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

class RestaurantFoodItem extends Component {
  state = {}

  componentDidMount() {
    const {eachFoodItem} = this.props
    const {id} = eachFoodItem
    const cartData = localStorage.getItem('cartData')
    const parsedCartData = JSON.parse(cartData)
    if (parsedCartData === null) {
      this.setState({
        isButtonClicked: false,
        itemQuantity: 0,
      })
    } else {
      const presentCartData = parsedCartData.filter(
        eachItem => eachItem.id === id,
      )
      if (presentCartData.length > 0) {
        this.setState({
          isButtonClicked: true,
          itemQuantity: presentCartData[0].quantity,
        })
      }
    }
  }

  updateLocalStorage = () => {
    const {isButtonClicked, itemQuantity} = this.state
    const {eachFoodItem} = this.props
    const {imageUrl, name, cost, id} = eachFoodItem

    const localCartData = localStorage.getItem('cartData')
    const parsedCartData = JSON.parse(localCartData)

    if (parsedCartData === null) {
      const updatedParsedCartData = []

      if (isButtonClicked === true && itemQuantity > 0) {
        const cartItem = {id, name, cost, imageUrl, quantity: itemQuantity}
        updatedParsedCartData.push(cartItem)
        localStorage.setItem('cartData', JSON.stringify(updatedParsedCartData))
      }
    } else {
      const updatedCartData = parsedCartData
      if (isButtonClicked === true) {
        const cartItem = {id, name, cost, imageUrl, quantity: itemQuantity}
        const updatedCart = updatedCartData.filter(
          eachItem => eachItem.id !== id,
        )
        updatedCart.push(cartItem)
        localStorage.setItem('cartData', JSON.stringify(updatedCart))
      } else {
        const updatedCart = updatedCartData.filter(
          eachItem => eachItem.id !== id,
        )
        localStorage.setItem('cartData', JSON.stringify(updatedCart))
      }
    }
  }

  onClickedAdd = () => {
    this.setState(
      {
        isButtonClicked: true,
        itemQuantity: 1,
      },
      this.updateLocalStorage,
    )
  }

  onMinusClicked = () => {
    const {itemQuantity} = this.state
    if (itemQuantity < 2) {
      this.setState(
        {
          itemQuantity: 0,
          isButtonClicked: false,
        },
        this.updateLocalStorage,
      )
    } else {
      this.setState(
        prev => ({
          itemQuantity: prev.itemQuantity - 1,
          isButtonClicked: true,
        }),
        this.updateLocalStorage,
      )
    }
  }

  onPlusClicked = () => {
    const {itemQuantity} = this.state
    const updatedItemQuantity = itemQuantity + 1
    this.setState({itemQuantity: updatedItemQuantity}, this.updateLocalStorage)
  }

  render() {
    const {eachFoodItem} = this.props
    const {imageUrl, name, cost, rating} = eachFoodItem
    const {isButtonClicked, itemQuantity} = this.state
    console.log(isButtonClicked)
    console.log(itemQuantity)

    return (
      <li testid="foodItem" className="food-item-container">
        <img src={imageUrl} alt="" className="food-item-image" />
        <div className="food-item-details-container">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost">{cost}</p>
          <div className="rating-container">
            <AiFillStar className="food-item-star" />
            <p className="food-item-rating">{rating}</p>
          </div>
          {isButtonClicked && itemQuantity > 0 ? (
            <div className="food-item-quantity-container">
              <button
                testid="decrement-count"
                type="button"
                className="minus-button"
                onClick={this.onMinusClicked}
              >
                -
              </button>
              <p testid="active-count" className="item-quantity-number">
                {itemQuantity}
              </p>
              <button
                testid="increment-count"
                type="button"
                className="plus-button"
                onClick={this.onPlusClicked}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="food-item-button"
              onClick={this.onClickedAdd}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default RestaurantFoodItem
