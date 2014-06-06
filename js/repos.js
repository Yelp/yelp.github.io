Repository = function(repo) {
  // attributes
  this.name        = repo.name;
  this.language    = repo.language;
  this.url         = repo.html_url;
  this.description = repo.description;
  this.fork        = repo.fork;
  this.watchers    = repo.watchers;
  this.forks       = repo.forks;
  

  // attributes defined from hardcoded oss projects variables
  this.blog_post = function(name) {
    if (oss_projects[name] && oss_projects[name].blog_post) {
      return oss_projects[name].blog_post;
    }
  }(repo.name);

  this.featured = function(name) {
    return oss_projects[name] && oss_projects[name].featured;
  }(repo.name);

  this.deprecated = function(name) {
    return oss_projects[name] && oss_projects[name].deprecated;
  }(repo.name);

  this.position = function(name) {
    return oss_projects[name] && oss_projects[name].position;
  }(repo.name);

  this.classes = function() {
    if (this.featured) {
      return 'featured-project';
    } else if (this.deprecated) {
      return 'deprecated-project';
    }
  }();

  // methods
  this.get_blog_href = function() {
    if (this.blog_post) {
      return '<a href="'+ this.blog_post +'" target="_blank" class="chiclet-link inner-opaque"><i class="icon-external-link"></i> Blog post</a> ';
    }
  }

  this.get_container = function() {
    return [
      '<div class="project island ', this.language, ' ', this.lasses, '">',
        '<h3><a href="', this.url, '" target="_blank">', this.name, '</a></h3>',
        '<p>', this.description, '</p>',
        '<div class="bottom-links">',
          '<a href="', this.url, '" target="_blank" class="chiclet-link inner-opaque"><i class="icon-github"></i> View source</a> ',
          this.get_blog_href(),
        '</div>',
        '<div class="top-links">',
          '<span class="chiclet-link"><i class="icon-star"></i> ', this.watchers, '</span> ',
          '<span class="chiclet-link"><i class="icon-code-fork"></i> ', this.forks, '</span> ',
        '</div>',
      '</div>'
    ].join('') 
  }
}
