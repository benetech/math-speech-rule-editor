/*
This file parses the json from:
https://raw.githubusercontent.com/benetech/math-speech-rule-editor/master/examples/rules.json
https://github.com/benetech/math-speech-rule-editor/blob/master/lib/mathspeak.json

And does part of what is needed to then dynamically generate a .js file like this one:
https://github.com/zorkow/speech-rule-engine/blob/master/src/speech_rules/mathspeak_rules.js
Specifically, to generate the defineRules calls in there.

This is needed, because there are constraints that as the framework currently is, the rules must
be ran from JavaScript in the browser of the user. Otherwise we could have just parsed the json
directly and use the object directly.

The functions in this file need to be integrated in the views and controllers instead. So they
need to be moved.
*/


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
        action += ' (';
        var p = a.personality;
        for (var j = 0; j < p.length; j++) {
          if (p[j].length != 2) {
            throw 'personality pair must have exactly 2 elements';
          }
          if (j > 0) action += ', ';
          action += p[j][0] + ':' + p[j][1];
        }
        action += ')';
      }
    }
  }

  var result = [name, dynamic, action, query]

  if (o.constraints && o.constraints.length) {
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
 * @param {Array.<Array.<string>> The result from convertParsedJsonToRules.
 * @return {string} a string containing JS code performing defineRule calls. 
 */
function convertParametersToDefineRuleCalls(params) {
  if (params[0].length == undefined) params = [params];
  var result = '';
  for (var i = 0; i < params.length; i++) {
    result += 'defineRule(';
    var current = params[i];
    for (var j = 0; j < current.length; j++) {
      if (j > 0) result += ',\n           ';
      result += '\'' + current[j] + '\'';
    }
    result += ');\n';
  }
  return result;
}

/**
 * Does everything in one go: converts JSON string to string of defineRule
 * function calls.
 * See documentation of convertRuleToDefine and
 * convertParametersToDefineRuleCalls.
 * @param {string} json The json string.
 * @return {string}
 */
function convertAllFromJson(json) {
  // If not given as array, turn it into one, so that the format becomes the
  // expected "[{rules},{rules},...]"
  if (json[0] != '[') json = '[' + json + ']';
  return convertParametersToDefineRuleCalls(
      convertParsedJsonToRules(JSON.parse(json)));
}
