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
