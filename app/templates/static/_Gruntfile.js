module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    
    less: {
      production: {
        options: {
          paths: ['css']
        },
        files: {
          'css/style.css': 'css/less/style.less'
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
          'js/dist/app.min.js': ['bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap/dist/js/bootstrap.js', 'js/src/app.js']
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: './',
          open: true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['js/src/*', 'js/lib/*'],
        tasks: ['jshint:all', 'uglify:dist']
      },
      less: {
        files: ['css/less/*'],
        tasks: ['less:production']
      },
      static: {
        files: ['index.html']
      },
      config: {
        files: ['Gruntfile.js', 'package.json'],
        options: {
          reload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'watch']);

  grunt.registerTask('prepare', ['jshint:all', 'uglify:dist', 'less:production', 'connect', 'watch']);
  
};