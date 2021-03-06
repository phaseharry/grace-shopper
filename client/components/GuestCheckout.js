import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StripeProvider, Elements } from 'react-stripe-elements'
import { Redirect } from 'react-router-dom'

import { lineItemsTotalQuant, getLocalCart } from '../store/utils'
import GuestPayment from './GuestPayment'
import Cart from './Cart'
import { guestSubmit } from '../store/thunks'


class CheckoutPage extends Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event){
    this.setState = {
      [event.target.name] : event.target.value
    }
  }
  render(){ 
    const { cart, sum, submitOrder, updateOrder } = this.props
    if(!cart.lineItems.length){
      return <Redirect to='/cart'/>
    } 
    return (
      <div>
        <Cart />
        <StripeProvider apiKey={'pk_test_g6vVJLVkeKQ0eryAlysmiylc'}>
          <Elements>
            <GuestPayment sum={sum} cart={cart} submitOrder={submitOrder} updateOrder={updateOrder}/>
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { products } = state
  const cart = { lineItems: getLocalCart().lineItems.sort((a, b) => a.productId - b.productId) }
  const sum = lineItemsTotalQuant(cart.lineItems , products)
  
  return {
    products,
    cart,
    sum,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitOrder: (order, data) => dispatch(guestSubmit(order, data)),
    updateOrder: order => dispatch(updateOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)