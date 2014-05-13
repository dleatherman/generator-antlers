module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    db_config: grunt.file.readJSON('config.json'),

    less: {
      production: {
        options: {
          paths: ['css']
        },
        files: {
          'wp-content/themes/<%= _.slugify(name) %>/css/style.css': 'wp-content/themes/<%= _.slugify(name) %>/css/less/style.less'
        }
      }
    },

    jshint: {
      all: {
        src: ['Gruntfile.js', 'js/src/*'],
        options: {
          bitwise: true,
          curly: true,
          eqeqeq: true,
          forin: true,
          freeze: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          nonbsp: true,
          plusplus: true,
          quotmark: 'single',
          undef: true,
          unused: true,
          strict: true,
          trailing: true,
          validthis: true,
          indent: 2,
          globals: {
            console: true,
            window: true,
            jQuery: true,
            module: true,
          }
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'wp-content/themes/<%= _.slugify(name) %>/js/dist/app.min.js': ['bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap/dist/js/bootstrap.js', 'js/src/app.js']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['wp-content/themes/<%= _.slugify(name) %>/js/src/*', 'wp-content/themes/<%= _.slugify(name) %>/js/lib/*'],
        tasks: ['jshint:all', 'uglify:dist']
      },
      less: {
        files: ['wp-content/themes/<%= _.slugify(name) %>/css/less/*'],
        tasks: ['less:production']
      },
      config: {
        files: ['Gruntfile.js', 'package.json'],
        options: {
          reload: true
        }
      }
    },

    build: {
      js: {
        files: ['wp-content/themes/<%= _.slugify(name) %>/js/src/*', 'wp-content/themes/<%= _.slugify(name) %>/js/lib/*'],
        tasks: ['jshint:all', 'uglify:dist']
      },
      less: {
        files: ['wp-content/themes/<%= _.slugify(name) %>/css/less/*'],
        tasks: ['less:production']
      }
    },

    db_dump: {
      'local': {
        'options': {
          'title': 'Local DB',
          'database': '<%%= db_config.local.db_name %>',
          'user': '<%%= db_config.local.username %>',
          'pass': '<%%= db_config.local.password %>',
          'host': '<%%= db_config.local.host %>',
          'site_url': '<%%= db_config.local.site_url %>',
          'backup_to': 'db/local.sql',
          'port': '8889'
        }
      },
    },

    db_import: {
      'local': {
        'options': {
          'title': 'Local DB',
          'database': '<%%= db_config.local.db_name %>',
          'user': '<%%= db_config.local.username %>',
          'pass': '<%%= db_config.local.password %>',
          'host': '<%%= db_config.local.host %>',
          'site_url': '<%%= db_config.local.site_url %>',
          'backup_to': 'db/local.sql',
          'port': '8889'
        }
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mysql-dump-import');

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('prepare', ['jshint:all', 'uglify:dist', 'less:production']);
  
};