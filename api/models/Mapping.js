/**
* Mapping.js
*
* @description :: What to say for the given style.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  attributes: {
    rule: {
        model: 'Rule'
    },
    ruleSet: {
        model: 'RuleSet' 
    },
    style: {
        type: 'string',
        required: true
    },
    speak: {
        type: 'string',
        defaultsTo: ''
    }
  }
};

