$(document).ready(function() {
  var projects = 0;

  var not_forked = 0;
  var forked = 0;
  var repos = [];
  var org = new Organization('yelp', []);
  var GITHUB_CLIENT_ID = '1bafa09b6086eec7afb4';
  var GITHUB_CLIENT_SECRET = '7e6422a0a2e24f0d0ecb7521a63990b5758c9cc8';

  loadRepositories = function(org, page) {
    page = page || 1;

    $.get('https://api.github.com/users/yelp/repos?per_page=100&client_id='+GITHUB_CLIENT_ID+'&client_secret='+GITHUB_CLIENT_SECRET+'&page=' + parseInt(page), function(data) {
      if (data.length > 0) {
        data.forEach(function(repository) {
          org.repos.push(new Repository(repository));
        });

        loadRepositories(org, page + 1);
      }
      else {
        org.addReposToContainer($('.projects .featured'), org.featuredRepos());
        org.addReposToContainer($('.projects .not-featured'), org.regularRepos());

        $('.project-count').html(org.forkedCount());
        $.get('https://api.github.com/orgs/yelp/members', function(data) {
          $('.dev-count').html(data.length);
        });
      }
    });
  }

  loadRepositories(org);

  $.get('https://api.github.com/orgs/yelp/members?client_id='+GITHUB_CLIENT_ID+'&client_secret='+GITHUB_CLIENT_SECRET, function(data) {
    users = data.length
    $('.stats-users').html("We have " + users + " Yelpers contributing to open source projects");
  });

  $('.titled-subnav a').click(function(e) {
    e.preventDefault();

    $('.titled-subnav a').removeClass('active');
    $('.projects').hide();
    $(e.target).addClass('active');

    var container = ".projects." + $(e.target).data('container');
    $(container).show();
  });

  $('body').on('click', '.project .island-item', function() {
    if ($(this).attr('class').indexOf("bottom-links") > -1) { return }
    window.open($(this).parent().find('h3 a')[0].href, '_blank');
  });

  $('body').on('click', '.project .bottom-links', function() {
    window.open($(this).find('a')[0].href, '_blank');
  });
});
