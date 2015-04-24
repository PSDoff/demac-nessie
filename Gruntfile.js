module.exports = function(grunt) {
    // Vars
    var skinDir = 'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/';
    var appDir = 'app/design/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/';

    // comment inside of wrapper
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: [skinDir + 'scss/**/*.{scss,sass}'],
                tasks: ['sass:dev','autoprefixer:dev']
            },
            plugins: {
                files: [skinDir + 'js/vendor/**/*.js'],
                tasks: ['concat:dev', 'uglify:dev']
            },
            scripts: {
                files: [skinDir + 'js/<%= pkg.custom_theme_name %>.js'],
                tasks: ['uglify:dev']
            },
            livereload: {
                files: [
                    skinDir + 'scss/{,*/}*.scss'
                ],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
            dev: {
                options: {
                    sourceMap: true,
                    outputStyle: 'expanded',
                    includePaths: [
                        'skin/frontend/rwd/default/scss',
                        'skin/frontend/rwd/enterprise/scss'
                    ]
                },
                files: {
                    'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/css/<%= pkg.custom_package_name %>.css': 'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/scss/<%= pkg.custom_package_name %>.scss'
                },

            },
            dist: {
                options: {
                    sourceMap: false,
                    outputStyle: 'compressed',
                    includePaths: [
                        'skin/frontend/rwd/default/scss',
                        'skin/frontend/rwd/enterprise/scss'
                    ]
                },
                files: {
                    'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/css/<%= pkg.custom_stylesheet_name %>.css': 'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/scss/<%= pkg.custom_stylesheet_name %>.scss'
                }
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    map: true,
                    browsers: [ "last 2 versions", "ie 7", "ie 8", "ie 9" ]
                },
                files: {
                    'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/css/<%= pkg.custom_stylesheet_name %>.css': 'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/css/<%= pkg.custom_stylesheet_name %>.css'
                }
            },
            dist: {
                options: {
                    map: false,
                    browsers: [ "last 2 versions", "ie 7", "ie 8", "ie 9" ]
                },
                files: {
                    'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/css/<%= pkg.custom_stylesheet_name %>.css': 'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/css/<%= pkg.custom_stylesheet_name %>.css'
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dev: {
                options: {
                    sourceMap: true
                },
                files: {
                    'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_theme_name %>.min.js': ['skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_package_name %>.js'],
                    'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_theme_name %>-plugins.min.js': ['skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_package_name %>-plugins.js']
                }
            },
            dist: {
                files: {
                    'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_package_name %>.min.js': 'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_package_name %>.js',
                    'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_package_name %>-plugins.min.js': 'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_package_name %>-plugins.js'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dev: {
                options: {
                    sourceMap: true
                },
                src: ['skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/vendor/**/*.js'],
                dest: 'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_package_name %>-plugins.js',
            },
            dist: {
                src: ['skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/vendor/**/*.js'],
                dest: 'skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/js/<%= pkg.custom_package_name %>-plugins.js',
            }
        },
        exec: {
            dist: 'blessc skin/frontend/<%= pkg.custom_package_name %>/<%= pkg.custom_theme_name %>/css/<%= pkg.custom_package_name %>.css --force'
        }
    });

    // Define Tasksets
    grunt.registerTask('default', [
        'sass:dev',
        'watch'
    ]);
    grunt.registerTask('develop', [
        'sass:dev',
        'watch'
    ]);
    grunt.registerTask('js-concat', [
        'concat:dist',
        'uglify:dist'
    ]);
    grunt.registerTask('production-compile', [
        'sass:dist',
        'autoprefixer:dist',
        'exec:dist',
        'concat:dist',
        'uglify:dist'
    ]);

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-autoprefixer');
};
