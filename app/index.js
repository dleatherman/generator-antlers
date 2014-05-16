'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    git = require('simple-git')(),
    fs = require('fs-extra'),
    art = require('../util/art');


var AntlersGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install'],
        callback: function() {
          // initial compilation
          this.spawnCommand('grunt', ['prepare']);
          // If the format is wordpress
          if(this.format === 'wordpress') {
            this.log(chalk.blue('Growing antlers...'));
            // Start copying over wordpress directories
            fs.copy('bower_components/wordpress/', './', function(err){
              if (err) return console.error(err);
            });
            fs.remove('wp-content/themes/twentyten/', function(err){
              if (err) return console.error(err);
            });
            fs.remove('wp-content/themes/twentyeleven/', function(err){
              if (err) return console.error(err);
            });
            fs.remove('wp-content/themes/twentytwelve/', function(err){
              if (err) return console.error(err);
            });
            fs.remove('wp-content/themes/twentythirteen/', function(err){
              if (err) return console.error(err);
            });
          }
          this.log(chalk.red('Antlers grown...') + chalk.blue('*grunt*'));
        }.bind(this)
      });
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    // this.log(this.yeoman);
    this.log(art.antler, {logPrefix: ''});

    // replace it with a short and sweet description of your generator
    this.log(chalk.red('You\'re using the Yeoman site generator antlers built by Red Antler (http://redantler.com/).'));

    var formats = ['static', 'wordpress'];
    var prompts = [{
      name: 'name',
      message: 'Project name',
      default: 'project'
    }, {
      type: 'list',
      name: 'format',
      message: 'What type of site are you starting?',
      choices: formats
    }];

    this.prompt(prompts, function (props) {
      this.folderName = this._.slugify(props.name + ' ' + props.format);
      this.name = props.name;
      this.format = props.format;

      done();
    }.bind(this));
  },

  app: function () {

    // Format specific options and directory setups
    if(this.format === 'wordpress') {
      this.mkdir('./db/');
      this.mkdir('./wp-content/themes/' + this.folderName);
      this.mkdir('./wp-content/themes/' + this.folderName + '/css/less/');
      this.mkdir('./wp-content/themes/' + this.folderName + '/js/dist/');
      this.mkdir('./wp-content/themes/' + this.folderName + '/js/src/');
      this.mkdir('./wp-content/themes/' + this.folderName + '/js/lib/');
      this.copy('style.less', './wp-content/themes/' + this.folderName + '/css/less/style.less');
      this.copy('app.js', './wp-content/themes/' + this.folderName + '/js/src/app.js');
      this.template(this.format + '/_config.json', './config.json');
    } else {
      this.mkdir('./css/less/');
      this.mkdir('./js/dist/');
      this.mkdir('./js/src/');
      this.mkdir('./js/lib/');
      this.copy('style.less', './css/less/style.less');
      this.copy('app.js', './js/src/app.js');
      this.template(this.format + '/_index.html', './index.html');
    }
    this.copy('editorconfig', './.editorconfig');
    this.copy(this.format + '/gitignore', './.gitignore');
    this.copy(this.format + '/htaccess', './.htaccess');
    this.template(this.format + '/_package.json', './package.json');
    this.template(this.format + '/_bower.json', './bower.json');
    this.template(this.format + '/_Gruntfile.js', './Gruntfile.js');
  }

});

module.exports = AntlersGenerator;