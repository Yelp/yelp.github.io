#!/bin/bash

cd $(dirname $0)

# repos.json

get_repos() {
  local outfile=$(mktemp)
  local response=
  local page=1

  while [ "$response" != "[]" ]
  do
    url="https://api.github.com/users/yelp/repos?per_page=100&page=$page"
    echo "$url" >&2

    response=$(curl -sf "$url" | jq . | tee -a "$outfile")

    if [ $? -eq 0 ]
    then
      echo "curl failed, so I'm gonna get out of here." >&2
      exit 1
    fi

    let page=page+1
  done

  cat "$outfile" | jq '.[]' | jq -s .
}

get_repos || echo '[]' > repos.json

# members.json

curl -sf "https://api.github.com/orgs/yelp/members" || echo '[]' > members.json
