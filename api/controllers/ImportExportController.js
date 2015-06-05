/**
 * ImportExportController
 *
 * @description :: Handle importing of seed data and exporting of ruleset data.
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var waterfall = require('async'), exec = require('child_process').exec, fs = require('fs');
var pathToMathMaps = "node_modules/speech-rule-engine/lib/";
module.exports = {

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
    },

    seedStatesAndCountries: function(req, res) {
        var states = JSON.parse(fs.readFileSync("states.json", 'utf8'));
        for ( code in states ) {
            State.findOrCreate({code: code, name: states[code]}).then(function(states) {
                //Do nothing.
            }).catch(function(err) {
                console.log(err);
            }); 
        }
        var countries = JSON.parse(fs.readFileSync("countries.json", 'utf8'));
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            Country.findOrCreate({code: country.code, name: country.name}).then(function(countries) {
                //Do nothing.
            }).catch(function(err) {
                console.log(err);
            }); 
        }
        return res.json("Seeding states and countries.");
    }
};

