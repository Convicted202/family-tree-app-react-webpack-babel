module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      dev: 'src',
      prod: 'dist'
    },

    webpack: {
      bundler: {
        // webpack options
        entry: './<%= config.dev %>/js/main.js',
        output: {
          path: './<%= config.dev %>/js/',
          filename: 'bundle.js'
        },
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel',
              exclude: /node_modules/,
              query: {
                presets: ['es2015', 'react'],
                cacheDirectory: true
              }
            }
          ]
        },
        stats: {
          // Configure the console output
          colors: false,
          // modules: true,
          reasons: true
        },
        progress: false, // Don't show progress
        failOnError: false, // don't report error to grunt if webpack find errors
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options : {
        livereload: true
      },
      sass: {
        files: ['<%= config.dev %>/**/*.sass'],
        tasks: ['sass:dev']
      },
      scripts: {
        files: [
          '<%= config.dev %>/js/*.js',
          'Gruntfile.js',
          'eslint.json'
        ],
        tasks: ['eslint']
      },
      jsx: {
        files: ['<%= config.dev %>/js/*.jsx'],
        tasks: ['eslint', 'webpack']
      },
      html: {
        files: ['index.html']
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          trace: true,
          cacheLocation: '<%= config.dev %>/stylesheets/sass/.sass-cache'
        },
        files: {
          '<%= config.dev %>/stylesheets/css/app.css': '<%= config.dev %>/stylesheets/sass/app.sass'
        }
      },
      build: {
        options: {
          style: 'compressed',
          trace: true,
          noCache: true
        },
        files: {
          '<%= config.prod %>/stylesheets/css/app.css': '<%= config.dev %>/stylesheets/sass/app.sass'
        }
      }
    },

    eslint: {
      options: {
        configFile: 'eslint.json'
      },
      target: ['<%= config.dev %>/js/*.js', '<%= config.dev %>/js/*.jsx']
    },

    uglify: {
      build: {
        files: [
          {
            dest: '<%= config.prod %>/js/bundle.min.js',
            src: [ '<%= config.dev %>/js/bundle.js' ]
          }
        ]
      }
    },

    useminPrepare: {
      html: './index.html',
      options: {
        dest: '<%= config.prod %>'
      }
    },

    usemin: {
      html: ['<%= config.prod %>/index.html']
    },

    // Copies all needed structure to dist
    copy: {
      assets: {
        expand: true,
        cwd: '<%= config.dev %>/',
        src: [
          // 'js/**/*.js',
          'stylesheets/css/**/app.css',
          'stylesheets/fonts/**'
        ],
        dest: '<%= config.prod %>/'
      },
      html: {
        expand: true,
        cwd: '.',
        src: [
          'index.html'
        ],
        dest: '<%= config.prod %>'
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.prod %>/**'
          ]
        }]
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    // The actual grunt server settings
    connect: {
      dev: {
        options: {
          port: 9090,
          base: '.',
          open: true,
          livereload: 35729,
          useAvailablePort: true,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
        }
      },
      build: {
        options: {
          port: 9090,
          base: '<%= config.prod %>/',
          open: true,
          keepalive: true,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
        }
      }
    }
  });

  grunt.registerTask('build', [
    'eslint',
    'webpack',
    'clean:dist',
    'copy:html',
    'sass:build',
    'copy:assets',

    'useminPrepare',
    'uglify:build',
    'usemin'
  ]);

  grunt.registerTask('build-server', [
    'connect:build'
  ]);

  grunt.registerTask('build-run', function() {
    grunt.task.run(['build', 'build-server'])
  });

  grunt.registerTask('test', [
    'eslint',
    // 'sass:dev',
    'karma'
  ]);

  grunt.registerTask('default', [
    'eslint',
    'webpack',
    'sass:dev',
    'connect:dev',
    'watch'
  ]);
};
