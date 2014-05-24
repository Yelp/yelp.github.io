$(document).ready(function() {
  var stars = 0;
  var forks = 0;
  var users = 0;
  var projects = 0;

  var not_forked = 0;
  var forked = 0;

  $.get('https://api.github.com/users/yelp/repos?per_page=100', function(data) {
    data.forEach(function(repository) {
      if (repository['fork'] === false) {
        $('.projects.not-forked').append(build_repository_container(repository));
        not_forked += 1;
      } else {
        $('.projects.forked').append(build_repository_container(repository));
        forked += 1;
      }

      stars += repository['stargazers_count'];
      forks += repository['forks_count'];
      projects = data.length;
    });

    $('.not-forked .count').html(not_forked);
    $('.forked .count').html(forked);

    $('.stats-stargazers').html(stars + " stargazers watching our projects");
    $('.stats-forks').html(forks + " forks on our projects");
    $('.stats-projects').html(projects + " projects open sourced by us or being contributed to");
  });

  $.get('https://api.github.com/orgs/yelp/members', function(data) {
    users = data.length
    $('.stats-users').html("We have " + users + " Yelpers contributing to open source projects");
  });

  $('.tabs-pill li').click(function(e, that) {
    e.preventDefault();

    $('.tabs-pill li').removeClass('selected');
    $('.projects').hide();

    $(e.target.parentNode).addClass('selected');
    var container = ".projects." + $(e.target.parentNode).data('container');

    $(container).show();
  });

  var build_repository_container = function(repository) {
    return [
      '<div class="project island ', repository['language'],'">',
        '<h3><a href="', repository['html_url'], '">', repository['name'], '</a></h3>',
        '<p>', repository['description'], '</p>',
        '<div class="bottom-links">',
          '<a href="', repository['html_url'], '" class="chiclet-link inner-opaque"><i class="icon-github"></i> View source</a> ',
          '<a href="#" class="chiclet-link inner-opaque"><i class="icon-external-link"></i> Blog post</a> ',
          '<span class="chiclet-link"><i class="icon-star"></i> ', repository['stargazers_count'], '</span> ',
          '<span class="chiclet-link"><i class="icon-code-fork"></i> ', repository['forks_count'], '</span> ',
        '</div>',
      '</div>'
    ].join('');
  }
});
