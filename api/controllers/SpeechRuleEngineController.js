/**
 * SpeechRuleEngineController
 *
 * @description :: Convert MathML Using the Speech-Rule-Engine
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

    /** Convert MathML to a text description. */
    convert: function(req, res) {
        var speech = require("speech-rule-engine");
        speech.setupEngine({domain: req.param("ruleset"), style: req.param("style"), semantics: true});
        return res.json(speech.processExpression(req.param("mml")));
    }

};

