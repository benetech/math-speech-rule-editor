
/**
 * Converts JSON format of a single mathspeak rule in json, to the parameters
 * for defineRule.
 * @param {Object} json The json object.
 * @return {Array.<string>} array of strings to give to the defineRule function:
 *      [name, dynamic, action, query, cstr...]
 */
function convertRuleToDefine(o) {
  if (!o.key) throw 'must have key (name)';
  if (!o.dynamic) throw 'must have dynamic';
  if (!o.selector) throw 'must have selector (query)';

  var name = o.key;
  var dynamic = o.dynamic;
  var query = o.selector;

  var action = undefined;
  var actions = o.actions;
  if (actions) {
    action = '';
    for (var i = 0; i < actions.length; i++) {
      if (i > 0) action += '; ';
      var a = actions[i];
      if (a.type == 'TEXT') action += '[t] ';
      else if (a.type == 'NODE') action += '[n] ';
      else if (a.type == 'MULTI') action += '[m] ';
      else if (a.type == 'PERSONALITY') action += '[p] ';
      else throw 'unknown action type';
      if (a.content) action += a.content;
      if (a.personality && a.personality.length) {
        action += '(';
        var p = a.personality;
        for (var j = 0; j < p.length; j++) {
          if (p[j].length != 2) throw 'personality pair must have exactly 2 elements';
          if (j > 0) action += ', ';
          action += p[j][0] + ':' + p[j][0];
        }
        action += ')';
      }
    }
  }

  var result = [name, dynamic, action, query]

  if (o.constraints && o.constraints.length) {
    cstr = '';
    var c = o.constraints;
    for (var i = 0; i < c.length; i++) {
       result.push(c[i]);
    }
  }

  return result;
}

/**
 * Converts array of rules objects to array of parameters for defineRules.
 * See documentation of convertRuleToDefine.
 * @param {Object} o The parsed json object.
 * @return {Array.<Array.<string>>}
 */
function convertParsedJsonToRules(o) {
  var result = [];
  for (var i = 0; i < o.length; i++) {
    result.push(convertRuleToDefine(o[i]));
  }
  return result;
}

/**
 * Converts JSON string to array of parameters for defineRules.
 * See documentation of convertRuleToDefine.
 * @param {string} json The json string.
 * @return {Array.<Array.<string>>}
 */
function convertAllFromJson(json) {
  if (json[0] != '[') json = '[' + json + ']';
  return convertAll(JSON.parse(json));
}
