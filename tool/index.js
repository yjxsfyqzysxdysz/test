const { LIST } = require('./data')
const { log, filterList } = require('./getMissItem')
const INDEX = 2
const { list, path } = LIST[INDEX]

log(filterList(list, path))
