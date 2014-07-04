$(document).ready(function() {
  var projects = 0;

  var not_forked = 0;
  var forked = 0;
  var repos = [];
  var org = new Organization('yelp', []);

  $.get('https://api.github.com/users/yelp/repos?per_page=100', function(data) {
    data.forEach(function(repository) {
      org.repos.push(new Repository(repository));
    });

    org.addReposToContainer($('.projects.not-forked .featured'), org.featuredRepos());
    org.addReposToContainer($('.projects.not-forked .not-featured'), org.regularRepos());
    org.addReposToContainer($('.projects.forked'), org.forkedRepos());

    $('.not-forked .count').html(org.forkedCount());
    $('.forked .count').html(org.notForkedCount());

    $('.stats-projects').html(org.repos.length + " projects open sourced by us or being contributed to");
  });

  $.get('https://api.github.com/orgs/yelp/members', function(data) {
    users = data.length
    $('.stats-users').html("We have " + users + " Yelpers contributing to open source projects");
  });

  $('.tabs-pill li').click(function(e) {
    e.preventDefault();

    $('.tabs-pill li').removeClass('selected');
    $('.projects').hide();

    $(e.target.parentNode).addClass('selected');
    var container = ".projects." + $(e.target.parentNode).data('container');

    $(container).show();
  });
});
