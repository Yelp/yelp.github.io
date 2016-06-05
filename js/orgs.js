Organization = function(name, repos) {
  this.name = name;
  this.repos = repos || [];
}

Organization.prototype.totalForks = function() {
  total = 0;
  this.repos.forEach(function(repo) {
    total += repo.forks;
  });

  return total;
}

Organization.prototype.totalWatchers = function() {
  total = 0;
  this.repos.forEach(function(repo) {
    total += repo.watchers;
  });

  return total;
}

Organization.prototype.forkedCount = function() {
  total = 0;
  this.repos.forEach(function(repo) {
    if (repo.fork) {
      total += 1;
    }
  });

  return total;
}

Organization.prototype.notForkedCount = function() {
  total = 0;
  this.repos.forEach(function(repo) {
    if (!repo.fork) {
      total += 1;
    }
  });

  return total;
}

Organization.prototype.featuredRepos = function() {
  featured = [];
  this.repos.forEach(function(repo) {
    if (repo.featured() && !repo.fork) {
      if (repo.position()) {
        featured[repo.position()-1] = repo
      } else {
        featured.push(repo);
      }
    }
  });

  return featured;
}

Organization.prototype.deprecatedRepos = function() {
  deprecated = [];
  this.repos.forEach(function(repo) {
    if (repo.deprecated() && !repo.fork) {
      deprecated.push(repo);
    }
  });

  return deprecated;
}


Organization.prototype.forkedRepos = function() {
  forked = [];
  this.repos.forEach(function(repo) {
    if (repo.fork) {
      forked.push(repo);
    }
  });

  return forked;
}

Organization.prototype.regularRepos = function() {
  regular = [];
  this.repos.forEach(function(repo) {
    if (!repo.fork && !repo.featured() && !repo.deprecated()) {
      regular.push(repo);
    }
  });

  return regular;
}

Organization.prototype.addReposToContainer = function(container, repos) {
  repos.forEach(function(repo, i) {
    container.append(repo.getContainer(i+1));
  });
}

// vim: sw=2 sts=2 expandtab
