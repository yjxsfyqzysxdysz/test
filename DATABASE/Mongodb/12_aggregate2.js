const mongoose = require('./06_module/db.js')
const OrderItmeModal = require('./06_module/order_item')

OrderItmeModal.aggregate([{
  $lookup: {
    from: "order",
    localField: "order_id",
    foreignField: "order_id",
    as: "order_info"
  }
}, {
  $match: {
    // _id: mongoose.Types.ObjectId("5b743da92c327f8d1b360546")
    title: '酸奶'
  }
}], (err, res) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(JSON.parse(JSON.stringify(res)))
})