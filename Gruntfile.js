module.exports = function(grunt) {

    // CONFIG 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: {                               
            dynamic: {                            
                files: [{
                    expand: true,                  
                    cwd: 'app/images/',             
                    src: ['**/*.{png,jpg,gif}'],   
                    dest: 'build/www/img/'            
                }]
            }
        },

        concat: {
            dist: {
                src: [
                    'app/libs/angular.js',
                    'app/libs/angular-route.js',
                    'app/libs/init.js',
                    'app/app.js',
                    'app/preloader.js',
                    'app/templates.js',
                    'app/global/**/*.js',
                    'app/views/**/*.js'
                ],
                dest: 'app/main.js',
            }
        },

        ngtemplates: {
            app: {
                options: {
                    module: "app",
                    bootstrap: function(module, script) {
                        return 'app.run(["$templateCache", function($templateCache) {' + script + '}])';
                    },
                    htmlmin: {
                        collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeEmptyAttributes:          true,
                        removeRedundantAttributes:      true,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  true
                    }
                },
                src: [
                    'app/global/**/*.html',
                    'app/views/**/*.html'
                ],
                dest: 'app/templates.js'
            }
        },

        uglify: {
            build: {
                src: 'app/main.js',
                dest: 'build/js/main.min.js'
            }
        },

        watch: {
            scripts: {
                files: [
                    'app/*.js',
                    'app/global/**/*.js',
                    'app/views/**/*.js'
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                },
            },

            css: {
                files: [
                    'app/global/**/*.scss',
                    'app/views/**/*.scss'
                ],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            },

            html: {
                files:[
                    'app/**/*.html'
                ],
                tasks: ['ngtemplates']
            },

            json: {
                files:[
                    'app/**/*.json'
                ],
                tasks: ['copy:json']
            },

            livereload: {
                options: { livereload: 1339 },
                files: [
                    'app/**/*.js',
                    'app/**/*.html',
                    'app/**/*.json',
                    'app/**/*.scss',
                    'build/css/*.css',
                    'build/js/*.js',
                    'build/views/*.html'
                    ],
            }
        },

        compass: {                  
            dist: {                
                options: {          
                    sassDir: 'app',
                    cssDir: 'build/css',
                    noLineComments : true,
                    environment: 'development'
                }
            }
        },

        copy: {
            json : {
                expand: true, 
                flatten: true,
                cwd: 'app', 
                src: [
                    '**.json',
                    '*/*.json',
                    '*/*/*.json',
                    '*/*/*/*.json'
                    ], 
                dest: 'build/api/', 
                filter: 'isFile'
            }
        },

        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        }

    });

    // PACKAGES
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');

    // RUN GRUNT 
    grunt.registerTask('default', ['concat', 'ngtemplates', 'express:dev', 'uglify', 'watch', 'compass', 'copy:json']);

};