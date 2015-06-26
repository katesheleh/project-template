module.exports = function(grunt) {

require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      src: 'src',
      dist: 'dist'
    },


    less: {
      style: {
        files: {
          'src/css/style.css': 'src/less/style.less'
        }
      },
       dist: {
        files: {
          '<%= config.dist %>/css/style.css': '<%= config.src %>/less/style.less'
        }
      }
    },





    watch: {
      styles: {
        files: ['<%= config.src %>/less/**/*.less'],
        tasks: ['less','notify:less'],
        options: {
            spawn: false,
            livereload: true
        }
      },

      livereload: {
        files: ['<%= config.src %>/*.html'],
        tasks: ['notify:html'],
        options: {
          livereload: true
        }
      },

      // scripts: {
      //   files: ['<%= config.src %>/js/**/*.js'],
      //   tasks: ['notify:js'],
      //   options: {
      //     spawn: false,
      //     livereload: true
      //   }
      // }
    },




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
      },

      png: {
        options: {
          title: 'PNG',  // optional
          message: 'PNG sprite was created', //required
        }
      }
    },



    lintspaces: {
      test: {
        src: [
          '<%= config.src %>/*.html',
          '!<%= config.src %>/icon-preview.html',
          '<%= config.src %>/js/scripts.js',
          '<%= config.src %>/less/*.less',
          '<%= config.src %>/sass/*.sass'
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
          cwd: 'src',
          src: [
            'img/**/*',
            '!css/sprite.css',
            'css/**',
            'index.html',
            'form.html',
            'blog.html',
            'post.html',
            'js/build/*.js',
            'js/lib/*.js'
          ],
          dest: '<%= config.dist %>',
        }]
      }
    },


    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      file: {
        src: '<%= config.dist %>/css/style.css'
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



    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: {
          '<%= config.dist %>/index.min.html': '<%= config.dist %>/index.html',     //'destination': 'source'
          '<%= config.dist %>/form.min.html': '<%= config.dist %>/form.html',
          '<%= config.dist %>/blog.min.html': '<%= config.dist %>/blog.html',
          '<%= config.dist %>/post.min.html': '<%= config.dist %>/post.html'
        }
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



    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      style: {
        expand: true,
        src: ["<%= config.src %>/less/**/*.less"]
      }
    },



    concat: {
      app: {
        src: ['<%= config.src %>/js/modules/*.js', 'src/js/scripts.js'],
        dest: '<%= config.src %>/js/build/scripts.js'
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
      png: [
        '<%= config.src %>/css/sprite.css'
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
          defaultHeight: '200px'
        }
      }
    },

    sprite:{
      all: {
        src: '<%= config.src %>/_png/*.png',
        dest: '<%= config.src %>/img/spritesheet.png',
        destCss: '<%= config.src %>/css/sprite.css',
        padding: 20
      }
    }
  });



  grunt.registerTask('fit', [
   'clean:finish',
   'copy:make',
   'less:dist',
   'autoprefixer',
   'cmq',
   'cssmin',
   'imagemin',
   'prettify',
   'htmlmin'
  ]);

  grunt.registerTask('svg', [
    'clean:svg',
    'svgmin',
    'grunticon',
    'notify:svg'
  ]);

   grunt.registerTask('png', [
    'clean:png',
    'sprite',
    'notify:png'
  ]);

  grunt.registerTask('test', ['lintspaces:test']);
};
