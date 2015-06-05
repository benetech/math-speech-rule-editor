/**
 * ReferenceDataController
 *
 * @description :: Get Reference Data.
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

    countries: function(req, res) {
        Country.find().then(function(countries) {
            return res.json(countries);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    },

    states: function(req, res) {
        State.find().then(function(states) {
            return res.json(states);
        }).catch(function(err) {
            console.log(err);
            return res.badRequest(err);
        });
    }
};

