const mongoose = require('mongoose');
const {pick} = require('lodash');

var userSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true,
    unique:true
  },
  name:{
      type:String,
      required:true
  },
  author:{
      type:String
  }
});


var MusicSheet = mongoose.model('musicsheet',userSchema);

module.exports = {MusicSheet}
