/**
* Rule.js
*
* @description :: Rule with mappings for describing the key.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    key: {
        type: 'string',
        required: true
    },
    category: {
        type: 'string'
    },
    mappings: {
        collection: 'mapping',
        via: 'rule'
    },
    names: {
        type: 'array'
    },
    mathMapCategory: {
        model: 'mathMapCategory' 
    }
  }
};

