module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: './test',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            {
                pattern: 'test.bundle.js',
                watched: false
            }
        ],

        // list of files to exclude
        exclude: [],

        preprocessors: {
            'test.bundle.js': ['webpack']
        },

        webpack: {
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
            watch: true
        },

        // test results reporter to use
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers
        browsers: ['PhantomJS'],

        reporters: ['mocha'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
