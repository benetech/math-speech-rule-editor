/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  'get /ruleSet/import': {
    controller: 'ImportExportController',
    action: 'import'
  },

  'get /seedData': {
    controller: 'ImportExportController',
    action: 'seedStatesAndCountries'
  },

  'get /ruleSet/previewExport': {
    controller: 'ImportExportController',
    action: 'previewExport'
  },

  'get /ruleSet/export': {
    controller: 'ImportExportController',
    action: 'export'
  },

  'get /rulesets': {
    controller: 'RuleSetController',
    action: 'ruleSets'
  },

  'get /rules': {
    controller: 'RuleSetController',
    action: 'rules'
  },

  'get /rule/:id': {
    controller: 'RuleSetController',
    action: 'rule'
  },

  'get /ruleset/:id': {
    controller: 'RuleSetController',
    action: 'ruleSet'
  },

  'get /ruleset/styles/:id': {
    controller: 'RuleSetController',
    action: 'ruleSetStyles'
  },

  'get /rule/mappings/:id': {
    controller: 'RuleSetController',
    action: 'ruleMappings'
  },

  'post /speech': {
    controller: 'SpeechRuleEngineController',
    action: 'convert'
  },

  'post /mapping': {
    controller: 'RuleSetController',
    action: 'createMapping'
  },

  'put /mapping/:id': {
    controller: 'RuleSetController',
    action: 'updateMapping'
  },

  'post /ruleset': {
    controller: 'RuleSetController',
    action: 'createRuleset'
  },

  'put /ruleset/:id': {
    controller: 'RuleSetController',
    action: 'updateRuleSet'
  },

  'get /countries': {
    controller: 'ReferenceDataController',
    action: 'countries'
  },

  'get /states': {
    controller: 'ReferenceDataController',
    action: 'states'
  },

  'get /mathmaps': {
    controller: 'RuleSetController',
    action: 'mathMaps'
  },

  'get /mathmap/categories/:id': {
    controller: 'RuleSetController',
    action: 'mathMapCategories'
  },

  'get /mathmapcategory/rules/:id': {
    controller: 'RuleSetController',
    action: 'categoryRules'
  }

};
