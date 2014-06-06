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

    org.add_repos_to_container($('.projects.not-forked .featured'), org.featured_repos);
    org.add_repos_to_container($('.projects.not-forked .deprecated'), org.deprecated_repos);
    org.add_repos_to_container($('.projects.not-forked .not-featured'), org.regular_repos);
    org.add_repos_to_container($('.projects.forked'), org.forked_repos);

    $('.not-forked .count').html(org.forked_count());
    $('.forked .count').html(org.not_forked_count());

    $('.stats-stargazers').html(org.total_watchers() + " stargazers watching our projects");
    $('.stats-forks').html(org.total_forks() + " forks on our projects");
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
