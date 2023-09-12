/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartItem from '../CartItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  state = {cartData: [], orderStatus: false}

  componentDidMount() {
    const cartData = localStorage.getItem('cartData')
    const parseCartData = JSON.parse(cartData)
    if (parseCartData === null || parseCartData.length === 0) {
      this.setState({cartStatus: false})
    } else {
      const cartAmounts = []

      if (parseCartData.length > 0) {
        parseCartData.forEach(eachItem => {
          const totalItemAmount = eachItem.cost * eachItem.quantity
          cartAmounts.push(totalItemAmount)
        })
        const totalCartAmount = cartAmounts.reduce(
          (previousScore, currentScore) => previousScore + currentScore,
        )
        this.setState({totalCartAmount})
      }
      this.setState({cartData: parseCartData, cartStatus: true})
    }
  }

  onClickPlaceOrder = () => {
    localStorage.removeItem('cartData')
    this.setState({orderStatus: true, cartData: []})
  }

  onChangeTotalAmount = value => {
    this.setState(prev => ({totalCartAmount: prev.totalCartAmount + value}))
  }

  updateCartData = () => {
    const {cartData} = this.state
    if (cartData.length > 0) {
      localStorage.setItem('cartData', JSON.stringify(cartData))
    } else {
      localStorage.removeItem('cartData')
    }
  }

  onDeleteCartItem = id => {
    const {cartData} = this.state
    const updatedCartData = cartData.filter(eachItem => eachItem.id !== id)
    this.setState({cartData: updatedCartData}, this.updateCartData)
  }

  render() {
    const {cartData, cartStatus, orderStatus, totalCartAmount} = this.state

    return (
      <>
        {cartStatus && totalCartAmount > 0 ? (
          <>
            {!orderStatus ? (
              <div>
                <Header />
                <div className="cart-container">
                  <div className="cart-responsive-container">
                    <ul className="cart-list-container">
                      <li className="cart-desktop-list-header">
                        <p className="list-header-name">Item</p>
                        <p className="list-header-name">Quantity</p>
                        <p className="list-header-name">Price</p>
                      </li>
                      {cartData.map(eachItem => (
                        <CartItem
                          eachItem={eachItem}
                          key={eachItem.id}
                          onChangeTotalAmount={this.onChangeTotalAmount}
                          onDeleteCartItem={this.onDeleteCartItem}
                        />
                      ))}
                    </ul>
                    <hr className="cart-line" />
                    <div className="total-cart-amount-container">
                      <h1 className="total-order-text">Order Total:</h1>
                      <p testid="total-price" className="total-order-amount">
                        ₹{totalCartAmount}
                      </p>
                    </div>
                    <div className="place-order-button-container">
                      <button
                        type="button"
                        className="cart-place-order-button"
                        onClick={this.onClickPlaceOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            ) : (
              <>
                <Header />
                <div className="order-successful-container">
                  <div className="order-successful-responsive-container">
                    <img
                      className="order-successful-image"
                      src="https://res.cloudinary.com/nsp/image/upload/v1636426713/tastyKitchens/successful_1x_micicp.png"
                      alt=""
                    />
                    <h1 className="order-successful-heading">
                      Payment Successful
                    </h1>
                    <p className="order-successful-para">
                      Thank you for ordering <br />
                      Your payment is successfully completed.
                    </p>
                    <Link to="/">
                      <button type="button" className="order-successful-button">
                        Go To Home Page
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div>
            <Header />
            <div className="empty-cart-container">
              <div className="empty-cart-responsive-container">
                <img
                  className="empty-cart-image"
                  src="https://res.cloudinary.com/nsp/image/upload/v1636379708/tastyKitchens/empty_cart_1_1x_o1nekx.png"
                  alt="empty cart"
                />
                <h1 className="empty-cart-heading">No Order Yet!</h1>
                <p className="empty-cart-para">
                  Your cart is empty. Add something from the menu.
                </p>
                <Link to="/">
                  <button className="empty-cart-button" type="button">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Cart
