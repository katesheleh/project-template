module.exports = function(grunt) {

require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      src: 'src',
      dist: 'dist'
    },


    /*==============================
    =            STYLES            =
    ==============================*/

    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      style: {
        expand: true,
        src: ['!<%= config.src %>/less/components/*.less','<%= config.src %>/less/**/*.less']
      }
    },


    less: {
      style: {
        files: {
          '<%= config.src %>/css/style.css': '<%= config.src %>/less/style.less'
        }
      },
       dist: {
        files: {
          '<%= config.dist %>/css/style.css': '<%= config.src %>/less/style.less'
        }
      }
    },


    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      file: {
        src: '<%= config.src %>/css/style.css'
      }
    },


    cmq: {
      style: {
        files: {
          '<%= config.dist %>/css/style.css': ['<%= config.dist %>/css/style.css']
        }
      }
    },


    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: 'gzip'
        },
        files: {
          '<%= config.dist %>/css/style.min.css': ['<%= config.dist %>/css/style.css']
        }
      }
    },


    /*-----  End of STYLES  ------*/



    /*===============================
    =            SCRIPTS            =
    ===============================*/

    concat: {
      app: {
        src: ['<%= config.src %>/js/plugins/*.js','<%= config.src %>/js/modules/*.js', 'src/js/main.js'],
        dest: '<%= config.src %>/js/build/scripts.js'
      }
    },

    uglify: {
      app: {
        src: '<%= config.dist %>/js/build/scripts.js',
        dest: '<%= config.dist %>/js/build/scripts.min.js'
      }
    },
    /*-----  End of SCRIPTS  ------*/






  /*=============================
  =            WATCH            =
  =============================*/

  watch: {

      scripts: {
        files: ['<%= config.src %>/js/**/*.js', '!<%= config.src %>/js/build/*.js'],
        tasks: ['scripts']
      },


      styles: {
        files: ['<%= config.src %>/less/**/*.less'],
        tasks: ['styles']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '<%= config.src %>/css/*.css',
            '<%= config.src %>/*.html',
            '<%= config.src %>/js/build/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: '<%= config.src %>'
        }
      }
    },


  /*-----  End of WATCH  ------*/



  /*============================
  =            HTML            =
  ============================*/

  embed: {
    options: {
      threshold: '100KB'
    },
    some_target: {
      files: {
        '<%= config.dist %>/index.embed.html': '<%= config.dist %>/index.html'
      }
    }
  },

  replace: {
    dist: {
      src: '<%= config.dist %>/*.html',
      expand: true,
      overwrite: true,
      replacements: [
      {

        from: /href=\"css\/style.css\"/g,
        to: 'href="css/style.min.css"'
      },{
        from: /<script src=\"js\/build\/plugins.js/g,
        to: '<script src="js/build/plugins.min.js'
      },{
        from: /<script src=\"js\/build\/scripts.js/g,
        to: '<script src="js/build/scripts.min.js'
      }
      ]
    }
  },

  /*-----  End of HTML  ------*/










    notify: {
      less: {
        options: {
          title: 'Ура!',  // optional
          message: 'LESS was compiled', //required
        }
      },

      html: {
        options: {
          title: 'Ура-Ура!',  // optional
          message: 'HTML was updated', //required
        }
      },

      svg: {
        options: {
          title: 'SVG',  // optional
          message: 'you have the SVG sprite', //required
        }
      }
    },



    lintspaces: {
      test: {
        src: [
          '!<%= config.src %>/icon-preview.html',
          '<%= config.src %>/*.html',
          '<%= config.src %>/js/scripts.js',
          '!<%= config.src %>/js/plugins/*.js',
          '!<%= config.src %>/js/lib/*.js',
          '<%= config.src %>/less/*.less'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      },
    },




    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    },

    copy: {
      make: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>',
          src: [
            'index.html',
            'img/**/*',
            'css/**',
            'js/build/*.js',
            'js/lib/*.js',
            'fonts/*.{eof,otf,svg,ttf,woff}'
          ],
          dest: '<%= config.dist %>',
        }]
      }
    },







    prettify: {
      options: {
        config: '.htmlprettifyrc'
      },
      all: {
        expand: true,
        ext: '.html',
        src: ['<%= config.dist %>/*.html']
      }
    },




    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['<%= config.dist %>/img/**/*.{png,jpg}']
        }]
      }
    },




    clean: {
      svg: [
        '<%= config.src %>/css/icons.data.png.css',
        '<%= config.src %>/css/icons.data.svg.css',
        '<%= config.src %>/css/icons.fallback.css',
        '<%= config.src %>/img/png-grunticon',
        '<%= config.src %>/_svg/svgmin'
      ],
      finish: [
        '<%= config.dist %>'
      ]
    },




    svgmin: {
      options: {
        plugins: [
          {
            removeDesc: true
          }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/_svg/origin',
          src: ['!!ai','*.svg'],
          dest: '<%= config.src %>/_svg/svgmin'
        }]
      }
    },

    grunticon: {
      mysvg: {
        files: [{
            expand: true,
            cwd: '<%= config.src %>/_svg',
            src: ['svgmin/*.svg', '*.png'],
            dest: '<%= config.src %>'
        }],
        options: {
          enhanceSVG   : true,
          datasvgcss   : 'css/icons.data.svg.css',
          datapngcss   : 'css/icons.data.png.css',
          urlpngcss    : 'css/icons.fallback.css',
          loadersnippet: 'js/lib/grunticon.loader.js',
          previewhtml  : 'icon-preview.html',
          pngfolder    : 'img/png-grunticon',
          pngpath      : '../img/png-grunticon',
          template     : '<%= config.src %>/_svg/template.hbs',
          defaultWidth : '200px',
          defaultHeight: '200px',
          customselectors: {
                "instagram": [".social--instagram:before"]
          },
        }
      }
    }
  });



  grunt.registerTask('styles',[
    'less:style',
    'autoprefixer',
    'notify:less'
  ]);


  grunt.registerTask('scripts',[
    'concat'
  ]);


  grunt.registerTask('svg', [
    'clean:svg',
    'svgmin',
    'grunticon',
    'notify:svg'
  ]);


  grunt.registerTask('fit', [
   'clean:finish',
   'copy:make',
   'cmq',
   'cssmin',
   'imagemin',
   'uglify',
   'replace',
   'prettify'
  ]);


  grunt.registerTask('make', [
    'svg',
    'styles',
    'scripts',
    'fit',
    'embed'
  ]);


  grunt.registerTask('default', [
    'styles',
    'scripts',
    'browserSync',
    'watch'
  ]);



  grunt.registerTask('test', ['lintspaces:test']);
};
