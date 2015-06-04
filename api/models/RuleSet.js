/**
* RuleSet.js
*
* @description :: A set of rules to describe math.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    name: {
        type: 'string',
        required: true
    },
    baseRuleSet: { 
        model: 'RuleSet' 
    },
    status: {
        type: 'string',
        required: true,
        enum: ['Pending', 'Live']
    },
    permission: {
        type: 'string',
        required: true,
        enum: ['Private', 'Public']
    }
  }
};

