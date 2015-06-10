/**
 * RuleSetImportController
 *
 * @description :: Import rulesets from the speech-rule-engine.
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var waterfall = require('async'), exec = require('child_process').exec;
module.exports = {

    /** Get a list of rulesets. TODO: filter by permissions. */
    ruleSets: function(req, res) {
        RuleSet.find().then(function(rulesets) {
            return res.json(rulesets);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    ruleSet: function(req, res) {
        RuleSet.find({id: req.param("id")}).then(function(ruleset) {
            return res.json(ruleset);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    ruleSetStyles: function(req, res) {
        Mapping.native(function (err, collection){
            collection.distinct('style', {
                ruleSet: RuleSet.mongo.objectId(req.param("id"))
            }, function (err, styles){
                if (err) return red.badRequest(err);
                return res.json(styles);
            });
        });
    },

    rules: function(req, res) {
        Rule.find().populate("mappings").then(function(rules) {
            return res.json(rules);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    rule: function(req, res) {
        Rule.findOne({id: req.param("id")}).populate("mappings").then(function(rule) {
            return res.json(rule);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    ruleMappings: function(req, res) {
        Mapping.find({rule: req.param("id")}).then(function(mappings) {
            return res.json(mappings);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    updateMapping: function(req, res) {
        Mapping.update({id: req.param("id")}, {speak: req.param("speak")}).then(function(mappings) {
            return res.json(mappings);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    createMapping: function(req, res) {
        Mapping.create({
            rule: req.param("rule"), 
            ruleSet: req.param("ruleSet"), 
            style: req.param("style"), 
            speak: req.param("speak")})
        .then(function(mapping) {
            return res.json(mapping);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    createRuleSet: function(req, res) {
        RuleSet.create({
            name: req.param("name"),
            baseRuleSet: req.param("baseRuleSet"),
            status: req.param("status"),
            permission: req.param("permission")
        }).then(function(ruleset) {
            return res.json(ruleset);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    updateRuleSet: function(req, res) {
        RuleSet.update({id: req.param("id")}, {
            name: req.param("name"), 
            status: req.param("status"),
            permission: req.param("permission")
        })
        .then(function(rulesets) {
            return res.json(rulesets);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    }
};

