module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    qunit: ['tests/index.html'],
    watch: {
      test: {
        files: ['moment.parseFormat.js', 'tests/**/*'],
        tasks: ['test']
      }
    },

    // https://github.com/vojtajina/grunt-bump
    // bump version of app
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['package.json', 'bower.json'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Release %VERSION%',
        push: true,
        pushTo: 'origin'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['watch']);
};
