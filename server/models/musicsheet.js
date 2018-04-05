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
      require:true
  },
  author:{
        type:String,
        required:true
  }
});


var MusicSheet = mongoose.model('musicsheet',userSchema);

module.exports = {MusicSheet}
