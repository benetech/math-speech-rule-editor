/**
* Action.js
*
* @description :: The components of a rule's action.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    type: {
        type: 'string',
	enum: ['TEXT', 'NODE', 'MULTI', 'PERSONALITY']
    },
    content: {
	type: 'string'  // TODO(): handle xpath vs literal string vs func
    },
    personality: {
	type: 'string'  // Opaque; pass-through but don't process.
    },
    rule: {
	model: 'Rule'
    }
  }
};

