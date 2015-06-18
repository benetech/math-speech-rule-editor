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
        RuleSet.findOne({id: req.param("id")}).then(function(ruleset) {
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
        Rule.find().populateAll().then(function(rules) {
            return res.json(rules);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    rule: function(req, res) {
        Rule.findOne({id: req.param("id")}).populateAll().then(function(rule) {
            return res.json(rule);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    editRule: function(req, res) {
        Rule.findOne({id: req.param("id")}).populateAll().then(function(rule) {
            RuleSet.find().then(function(ruleSets) {
                //TODO: manually populate rulesets
                //rule.mappings.foreach(function(mapping, index) {
                //    mapping.ruleSet = ruleSets.filter(function(ruleSet) {
                        
                return res.view("rule/edit", {'rule': rule, 'ruleSets': ruleSets});
            }).catch(function(err) {
                console.log(err);
                return res.badRequest(err);
            });
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    updateRule: function(req, res) {
       var values = req.allParams();
       Object.keys(values).forEach(function(key) {
           if(key.indexOf("mapping-") === 0) {
               var mappingId = key.split("-")[1];
               var newSpeak = values[key];
               Mapping.update({id: mappingId}, {speak: newSpeak}).exec(function after(err, updated) {
                   if(err) {
                       console.log(err);
                       return res.badRequest(err);
                   }
               });
           }
       });
       return res.view("homepage");
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
    },

    mathMaps: function(req, res) {
        MathMap.find().then(function(mathMaps) {
            return res.json(mathMaps);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        })
    },

    mathMapCategories: function(req, res) {
        MathMapCategory.find({mathMap: req.param("id")}).then(function(categories) {
            return res.json(categories);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        })
    },

    categoryRules: function(req, res) {
        Rule.find({mathMapCategory: req.param("id")}).populate("mappings").then(function(rules) {
            return res.json(rules);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        })
    }
};

