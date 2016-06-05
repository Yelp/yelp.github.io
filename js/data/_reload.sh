#!/bin/bash

cd $(dirname $0)

get_all_pages() {
  local url_prefix="$1"
  local outfile=$(mktemp)
  local response=
  local page_size=100
  local page=1

  while [ "$response" != "[]" ]
  do
    local url="$url_prefix?per_page=$page_size&page=$page"
    echo "$url" >&2

    response=$(curl -sf "$url" | jq . | tee -a "$outfile")

    if [ $? -ne 0 ]
    then
      echo "curl failed, so I'm gonna get out of here." >&2
      echo "[]"
      exit 1
    fi

    let page=page+1
  done

  cat "$outfile" | jq '.[]' | jq -s .
}

# Repos

get_repos() {
  get_all_pages 'https://api.github.com/users/yelp/repos'
}

(echo -n '$(function() { loadRepositoryData(' ; get_repos ; echo '); })') > load_repos.js

# Members

get_members() {
  get_all_pages 'https://api.github.com/orgs/yelp/members'
}

(echo -n '$(function() { loadMemberData(' ; get_members ; echo '); })') > load_members.js
