function getGithubRepos(callback, page, repos) {
  page = page || 1;
  repos = repos || [];

  var url = 'https://api.github.com/users/yelp/repos?per_page=100&page=' + parseInt(page);

  $.get(url, function(data) {
    if (data.length > 0) {
      data.forEach(function(repoDatum) {
        repos.push(repoDatum);
      });
      getGithubRepos(callback, page + 1, repos);
    }
    else {
      callback(repos);
    }
  });
}

function getGithubMembers(callback) {
  $.get('https://api.github.com/orgs/yelp/members', callback);
}

function loadRepositoryData(repoData) {
  var org = new Organization('yelp');
  org.repos = [];

  repoData.forEach(function(repoDatum) {
    org.repos.push(new Repository(repoDatum));
  });

  $('.projects .featured').empty();
  $('.projects .not-featured').empty();

  org.addReposToContainer($('.projects .featured'), org.featuredRepos());
  org.addReposToContainer($('.projects .not-featured'), org.regularRepos());

  $('.project-count').html(org.forkedCount());
}

function loadMemberData(members) {
  $('.dev-count').html(members.length);
}

$(document).ready(function() {
  getGithubRepos(loadRepositoryData);
  getGithubMembers(loadMemberData);
});


// vim: sw=2 sts=2 expandtab
