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
    mappings: {
        collection: 'mapping',
        via: 'rule'
    },
    names: {
        type: 'array'
    },
    category: {
	type: 'string'
    },
    // Simple MathML-spellout mappings.
    mathMapCategory: {
        model: 'mathMapCategory' 
    },

    // The following are needed for constraint-based spellout rules.
    dynamic: {
	type: "string"  // The context namespace, e.g. "mathspeak.brief.french'.
    },
    selector: {
	type: 'string'  // An XPath expression used to select rule application candidates.
    },
    constraints: {
	type: 'array'  // Array of XPath expressions; all must be true for the rule to fire.
    },
    actions: {
        collection: 'action', via: 'rule'
    }
  }
};
