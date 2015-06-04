/**
* MathMapCategory.js
*
* @description :: Math map categories and the math map they belong to.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    mathMap: {
        model: 'MathMap'
    },
    category: {
        type: 'string'
    },
    rules: {
        collection: 'Rule',
        via: 'mathMapCategory'
    }
  }

};

