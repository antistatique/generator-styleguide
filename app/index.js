'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var AppGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
        this.log(yosay('Everything went smoothly! We\'ll just download the dependencies now. Bye from Antistatique!'));
      } else {
        this.log(yosay('Everything went smoothly! Bye from Antistatique!'));
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Styleguide generator by Antistatique!'));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: "What's the name of your project?",
      default: this.appname
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.appname = this.name;

      done();
    }.bind(this));
  },

  app: function () {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.template('README.md', 'README.md');

    this.directory('assets/sass/components', 'assets/sass/components');
    this.directory('assets/sass/javascript', 'assets/sass/javascript');
    this.directory('assets/sass/layout', 'assets/sass/layout');

    this.mkdir('assets/fonts');
    this.mkdir('img');

    this.copy('assets/sass/bootstrap-variables.scss', 'assets/sass/bootstrap-variables.scss');
    this.copy('assets/sass/bootstrap.scss', 'assets/sass/bootstrap.scss');

    this.template('assets/sass/project-variables.scss', 'assets/sass/'+this.name+'-variables.scss');
    this.template('assets/sass/project-mixins.scss', 'assets/sass/'+this.name+'-mixins.scss');
    this.template('assets/sass/project.scss', 'assets/sass/'+this.name+'.scss');
    this.template('assets/js/project.js', 'assets/js/'+this.name+'.js');
    this.template('assets/README.md', 'assets/README.md');
    this.template('hologram_config.yml', 'hologram_config.yml');

    this.template('gulpfile.js', 'gulpfile.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
    this.copy('htaccess', '.htaccess');
    this.copy('robots.txt', 'robots.txt');
  }
});

module.exports = AppGenerator;
