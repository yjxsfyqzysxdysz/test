const OrderModal = require('./06_module/order.js')

OrderModal.aggregate(
  [{
      $lookup: {
        from: "order_item",
        localField: "order_id",
        foreignField: "order_id",
        as: "items"
      }
    },
    {
      $match: {
        "all_price": {
          $gte: 90
        }
      }
    }
  ],
  (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(JSON.parse(JSON.stringify(res)))
  })