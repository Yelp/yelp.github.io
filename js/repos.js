Repository = function(repo) {
  // attributes
  this.name        = repo.name;
  this.language    = repo.language;
  this.url         = repo.html_url;
  this.description = repo.description;
  this.fork        = repo.fork;
  this.watchers    = repo.watchers;
  this.forks       = repo.forks;
}

Repository.prototype.blogPost = function() {
  if (oss_projects[this.name] && oss_projects[this.name].blog_post) {
    return oss_projects[this.name].blog_post;
  }
}

Repository.prototype.featured = function() {
  return oss_projects[this.name] && oss_projects[this.name].featured;
}

Repository.prototype.deprecated = function() {
  return oss_projects[this.name] && oss_projects[this.name].deprecated;
}

Repository.prototype.classes = function() {
  if (this.featured()) {
    return 'featured-project';
  } else if (this.deprecated()) {
    return 'deprecated-project';
  }
}

Repository.prototype.getBlogLink = function() {
  if (this.blogPost()) {
    return '<a href="'+ this.blogPost() +'" target="_blank" class="chiclet-link inner-opaque"><i class="icon-external-link"></i> Blog post</a> ';
  }
}

Repository.prototype.getContainer = function() {
  return [
    '<div class="project island ', this.language, ' ', this.classes(), '">',
      '<h3><a href="', this.url, '" target="_blank">', this.name, '</a></h3>',
      '<p>', this.description, '</p>',
      '<div class="bottom-links">',
        '<a href="', this.url, '" target="_blank" class="chiclet-link inner-opaque"><i class="icon-github"></i> View source</a> ',
        this.getBlogLink(),
      '</div>',
      '<div class="top-links">',
        '<span class="chiclet-link"><i class="icon-star"></i> ', this.watchers, '</span> ',
        '<span class="chiclet-link"><i class="icon-code-fork"></i> ', this.forks, '</span> ',
      '</div>',
    '</div>'
  ].join('')
}
