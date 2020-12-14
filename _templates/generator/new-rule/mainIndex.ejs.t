---
inject: true
to: index.js
after: "rules: {"
---
    '<%= name %>': require('./rules/<%= name %>/<%= name %>.js'),