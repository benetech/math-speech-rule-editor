/**
 * RuleSetImportController
 *
 * @description :: Import rulesets from the speech-rule-engine.
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var waterfall = require('async'), exec = require('child_process').exec;
var pathToMathMaps = "node_modules/speech-rule-engine/lib/";
module.exports = {

    /** Get a list of rulesets. TODO: filter by permissions. */
    rulesets: function(req, res) {
        RuleSet.find().then(function(rulesets) {
            return res.json(rulesets);
        });
    },

    rules: function(req, res) {
        Rule.find().populate("mappings").then(function(rules) {
            return res.json(rules);
        });
    },

    rule: function(req, res) {
        Rule.findOne({id: req.param("id")}).populate("mappings").then(function(rule) {
            return res.json(rule);
        });
    },

    ruleMappings: function(req, res) {
        Mapping.find({rule: req.param("id")}).then(function(mappings) {
            return res.json(mappings);
        });
    },

    updateMapping: function(req, res) {
        Mapping.update({id: req.param("id")}, {speak: req.param("speak")}).then(function(mappings) {
            return res.json(mappings);
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
        });
    },

    /** Read json rulesets from the speech-rule-engine and import as default rulesets. */
    import: function(req, res) {
        //before we do anything, create the default rulesets.
        RuleSetImportExporter.createDefaultRulesets(function() {
            var mathmaps = RuleSetImportExporter.getMathMapDirectories(pathToMathMaps);
            for (var m = 0; m < mathmaps.length; m++) {
                MathMap.findOrCreate({name: mathmaps[m]}).then(function(mathmap) {
                    RuleSetImportExporter.importMathMap(pathToMathMaps + mathmap.name, mathmap);
                });
            }
        });
        
        return res.json("Importing...");
    },

    previewExport: function(req, res) {
        MathMap.find().then(function(mathmaps) {
            async.map(mathmaps, 
                function(mathmap, callback) {
                    MathMapCategory.find({mathMap: mathmap.id}).populate("rules").then(function(categories) {
                        mathmap.categories = categories;
                        return callback(null, mathmap);
                    });
                }, 
                function(err, results){
                    return res.json(results);
                }
            );
        }).catch(function(err) {
            return res.badRequest(err);
        });
    },

    export: function(req, res) {
        RuleSetImportExporter.exportMathMaps(pathToMathMaps);

        //Pretty hoopty, but I don't want to deal with reconfiguring
        //the export with callbacks.
        setTimeout(function() {
            //Restart server.
            console.log("Restarting Server.");
            var forever_restart = exec('forever restartall', {cwd: '/vagrant'});
        }, 60000);
        return res.json("Exporting. Please wait while the rulesets are exported. The server will restart in 1 minute.");
    }
};

