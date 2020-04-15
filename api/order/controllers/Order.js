'use strict';
const stripe = require("stripe")("sk_test_GVQKYuinWsHaNrXgonlSu0w300hOJDykGW");


module.exports = {
  create:async ctx => {
    const {name, total, items, stripeTokenId} = ctx.request.body
    const {id} = ctx.state.user
    const charge = await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      description: `Order ${new Date()} by ${ctx.state.user.username}`,
      source:stripeTokenId
    });
    const order = await strapi.services.order.create({
      name, total, items, user:id
    })
    return order
  }
};
