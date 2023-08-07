const Cart = require("../../dao/models/cart.model");
const uuid4= require('uuid4')

class CartServices {
  async getCart(_id) {
    const cart = await Cart.paginate({ _id: _id }, { page: 1 });
    return cart;
  }
  async getById(_id) {
    const cart = await Cart.findOne({ _id: _id });
    return cart;
  }
  async postCart(data) {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    data.date = hoy.toDateString() + ' ' +uuid4()
    console.log(data.date);
    const cart = await Cart.create(data);
    return cart;
  } 
  async deleteProducts(_id) {
    const cart = await Cart.findOne({ _id: _id });
    let arr = [];
    cart.products = arr;
    let update = await Cart.updateOne({ _id: _id }, cart);
    return update;
  }
}
module.exports = CartServices;
