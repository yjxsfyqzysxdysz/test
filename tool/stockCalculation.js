const MIN_COMMISSION = 5 // 最少佣金
const MIN_COMMISSION_RATE = 0.00025 // 佣金率 双向
const STAMP_DUTY_RATE = 0.001 // 印花税率 单向
const TRANSFER_FEE_RATE = 0.00001 // 过户费 沪市 双向

let numberOfHands = 800

for (let i = 0,
  p1 = 6.14,
  p2 = getFloat((p1 * 100 + 1) / 100); i < 30; i++, p2 = getFloat((p2 * 100 + 1) / 100)) {
  getProfit(p1, p2, numberOfHands)
}
// getProfit(6.55, 6.65, numberOfHands)

function getProfit(buy, sell, num) {
  const sellPrice = sell * num
  const grossProfit = getFloat((sell - buy) * num)
  const totalTax = getFloat(getCommission(buy * num) + getCommission(sellPrice) + sellPrice * STAMP_DUTY_RATE)
  const NETProfit = getFloat(grossProfit - totalTax)
  const profitRate = getFloat((NETProfit / sellPrice) * 100) + '%'
  console.log(
    `买入价 ${buy}, 卖出价 ${sell}, 税额 ${totalTax}, 毛利润 ${grossProfit}, 净利润 ${NETProfit}, 利润率 ${profitRate}`
  )
}

/**
 * 获取佣金值
 * @param {Number} price
 */
function getCommission(price = 0) {
  return Math.max(MIN_COMMISSION, getFloat(price * MIN_COMMISSION_RATE))
}

function getFloat(num, rax = 2) {
  return +num.toFixed(rax)
}
