function getGithubRepos(org, callback, page, repos) {
  page = page || 1;
  repos = repos || [];

  var url = 'https://api.github.com/users/' + org.name + '/repos?per_page=100&page=' + parseInt(page);

  $.get(url, function(data) {
    if (data.length > 0) {
      data.forEach(function(repoDatum) {
        repos.push(repoDatum);
      });
      getGithubRepos(org, callback, page + 1, repos);
    }
    else {
      callback(repos);
    }
  });
}

function getCachedRepos(org, callback) {
  $.get('js/data/repos.json', callback);
}

function getGithubMembers(org, callback) {
  $.get('https://api.github.com/orgs/' + org.name + '/members', callback);
}

function getCachedMembers(org, callback) {
  $.get('js/data/members.json', callback);
}

// vim: sw=2 sts=2 expandtab
