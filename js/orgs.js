Organization = function(name, repos) {
  this.name = name;
  this.repos = repos;

  this.total_forks = function() {
    total = 0;
    repos.forEach(function(repo) {
      total += repo.forks;
    });

    return total;
  }

  this.total_watchers = function() {
    total = 0;
    repos.forEach(function(repo) {
      total += repo.watchers;
    });

    return total;
  }

  this.forked_count = function() {
    total = 0;
    repos.forEach(function(repo) {
      if (repo.fork) {
        total += 1;
      }
    });

    return total;
  }

  this.not_forked_count = function() {
    total = 0;
    repos.forEach(function(repo) {
      if (!repo.fork) {
        total += 1;
      }
    });

    return total;
  }

  this.featured_repos = function() {
    featured = [];
    repos.forEach(function(repo) {
      if (repo.featured && !repo.fork) {
        if (repo.position) {
          featured[repo.position] = repo
        } else {
          featured.push(repo);
        }
      }
    });

    return featured;
  }

  this.deprecated_repos = function() {
    deprecated = [];
    repos.forEach(function(repo) {
      if (repo.deprecated && !repo.fork) {
        deprecated.push(repo);
      }
    });

    return deprecated;
  }


  this.forked_repos = function() {
    forked = [];
    repos.forEach(function(repo) {
      if (repo.fork) {
        forked.push(repo);
      }
    });

    return forked;
  }

  this.regular_repos = function() {
    regular = [];
    repos.forEach(function(repo) {
      if (!repo.fork && !repo.featured && !repo.deprecated) {
        regular.push(repo);
      }
    });

    return regular;
  }

  this.add_repos_to_container = function(container, repo_func) {
    repo_func().forEach(function(repo) {
      container.append(repo.get_container());
    });
  }
}
