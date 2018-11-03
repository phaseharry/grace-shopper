import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProduct, getCart, lineItemFinder, tracker, getLocalCart, findLocalLineItem } from '../store/utils'
import { addToCart, removeFromCart, getProductReviews, createLineItem, incrementLineItem, deleteLineItem, decrementLineItem, deleteProduct } from '../store/thunks'
import ProductModal from './ProductModal'
import Reviews from './Reviews'
import ReviewWriter from './ReviewWriter'
import { Link } from 'react-router-dom'

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lineItem: {},
      error: ''
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  componentDidUpdate(prevProps){

    if(prevProps !== this.props) {
      console.log('should updated')
    }
  }

  handleAdd() {
    const { cart, product, lineItem, createLineItem, incrementLineItem, id, localCart } = this.props;
    if(lineItem){
      incrementLineItem(cart, lineItem)
      console.log('incrementing')
    } else {
      createLineItem(cart, product)
      console.log('created')
    }
  }

  handleSubtract() {
    const { cart, lineItem, deleteLineItem, decrementLineItem } = this.props;

    if(lineItem ? lineItem.quantity === 1 : null){
      deleteLineItem(cart, lineItem)
      console.log('deleted')
    } else {
      decrementLineItem(cart, lineItem)
      console.log('decrementing')
    }
  }

  handleDelete(){
    this.props.deleteProduct(this.props.product)
    this.props.history.push('/products')
  }

  render() {
    if (!this.props.product) { return null }

    const { name, imageUrl, smallImageUrl, price, stock, description, id } = this.props.product
    const { addToCart, removeFromCart, lineItem, cart, product, reviews, admin, localCart } = this.props

    const { handleAdd, handleSubtract, handleDelete } = this;
    const outOfStock = (lineItem && stock <= lineItem.quantity) || 0;
    const noQuantity = !lineItem || !lineItem.quantity
    console.log('state ', this.state)
    return (
      <div>
        <h3> Introducing the { name }! </h3>
        <hr />
        { admin ?
        <div>
          <Link to={`/product/${this.props.id}/edit`}><button>Edit Product</button></Link>
          <button onClick={handleDelete}>Delete Product</button>
        </div>
        : <div></div>
        }
        <ul>
          <li>
            <ProductModal imageUrl = { imageUrl } productName = { product.name } />
          </li>
          <li>Price: $ {price} </li>
          <li>Stock: {stock ? 'In stock' : 'Out of stock'} </li>
          <li>Description: {description} </li>
        </ul>
        <hr />

        <button onClick={handleAdd} disabled={outOfStock}>+</button>
        <button onClick={handleSubtract} disabled={noQuantity}>-</button>
        {
          lineItem
          ? <p>Quantity in cart: {lineItem ? lineItem.quantity : 0 }</p>
          : <p>Quantity in cart: {this.state.lineItem ? this.state.lineItem.quantity : 0 }</p>
        }
        <hr />
        <Reviews />
        <ReviewWriter id = { id } />
      </div>
    )
  }
}


const mapStateToProps = ({ products, orders, reviews, auth }, { id }) => {
  const cart = getCart(orders)
  let lineItem;

  if(cart){
    lineItem = lineItemFinder(cart.lineItems, id)
  }

  return {
    cart,
    lineItem,
    reviews,
    product: getProduct(id, products),
    admin: auth.user.admin
  }
}


const mapDispatchToProps = (dispatch, { id })=> {
  console.log(id)
  return {
    init: () => dispatch(getProductReviews( id )),
    createLineItem: (cart, product)=> dispatch(createLineItem(cart, product)),
    incrementLineItem: (cart, lineItem)=> dispatch(incrementLineItem(cart, lineItem)),
    deleteLineItem: (cart, lineItem)=> dispatch(deleteLineItem(cart, lineItem)),
    decrementLineItem: (cart, lineItem)=> dispatch(decrementLineItem(cart, lineItem)),
    deleteProduct: (product) => dispatch(deleteProduct(product))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)

