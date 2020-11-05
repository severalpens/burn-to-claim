var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logbookSchema = new Schema({
  settings: Object,
  instances: Object,
  txs: Array,
  signedTxs: Array,
  completedTxs: Array,
  completedTxErrors: Array,
  signedTxErrors: Array,
  preBalances: Array,
  postBalances: Array,
  summary: Array

},{ timestamps: { createdAt: 'created_at' } });
  
  var LogbookModel = mongoose.model("logbook", logbookSchema, "logbook");
  
  module.exports = LogbookModel;