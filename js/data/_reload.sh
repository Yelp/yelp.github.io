#!/bin/bash

cd $(dirname $0)

# repos.json
echo -n > repos.json
response=
let page=1
while [ "$response" != "[]" ]
do
  url="https://api.github.com/users/yelp/repos?per_page=100&page=$page"
  echo $url
  response=$(curl "$url" | jq . | tee -a repos.json.tmp)
  let page=page+1
done
cat repos.json.tmp | jq '.[]' | jq -s . > repos.json
rm repos.json.tmp

# members.json
curl "https://api.github.com/orgs/yelp/members" > members.json
