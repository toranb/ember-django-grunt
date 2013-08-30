module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-template-compiler');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['ember/static/script/**/*.js', 'ember/static/script/templates/*.handlebars'],
        tasks: ['dev'],
        options: {
          interrupt: true,
          debounceDelay: 250
        }
      }
    },
    hashres: {
      options: {
        renameFiles: true
      },
      prod: {
        src: ['ember/static/script/lib/deps.min.js'],
        dest: 'ember/person/templates/index.html'
      }
    },
    concat: {
      dist: {
          src: [
            'ember/static/script/vendor/jquery-1.9.1.js',
            'ember/static/script/vendor/handlebars.js',
            'ember/static/script/vendor/ember.js',
            'ember/static/script/app/person.js',
            'ember/static/script/lib/tmpl.min.js'],
          dest: 'ember/static/script/lib/deps.min.js'
      }
    },
    emberhandlebars: {
        compile: {
            options: {
                templateName: function(sourceFile) {
                    var newSource = sourceFile.replace('ember/static/script/templates/', '');
                    return newSource.replace('.handlebars', '');
                }
            },
            files: ['ember/static/script/templates/*.handlebars'],
            dest: 'ember/static/script/lib/tmpl.min.js'
        }
    }
  });

  grunt.task.registerTask('dev', ['emberhandlebars', 'concat:dist']);
  grunt.task.registerTask('local', ['dev', 'watch']);
  grunt.task.registerTask('deploy', ['emberhandlebars', 'concat:dist', 'hashres']);
}
