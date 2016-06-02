$(document).ready(function() {
  var org = new Organization('yelp', []);

  loadRepositories = function(repoData) {
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

  loadMembers = function(members) {
    $('.dev-count').html(members.length);
  }

  getCachedRepos(org, loadRepositories);
  getCachedMembers(org, loadMembers);

  getGithubRepos(org, loadRepositories);
  getGithubMembers(org, loadMembers);

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

// vim: sw=2 sts=2 expandtab
