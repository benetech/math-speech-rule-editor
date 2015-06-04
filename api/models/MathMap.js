/**
* MathMap.js
*
* @description :: Math maps (functions, symbols, units).
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
        type: 'string',
        required: true
    },
    mathMapCategories: {
        collection: 'MathMapCategory',
        via: 'mathMap'
    }
  }

};

