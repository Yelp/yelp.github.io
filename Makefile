js/data: js/data/repos.json js/data/members.json

.PHONY: js/data/repos.json
js/data/repos.json:
	echo -n > $@.tmp
	response= page=1 ; while [ "$$response" != "[]" ] ; do \
	    url="https://api.github.com/users/yelp/repos?per_page=100&page=$$page" ; \
	    echo $$url ; \
	    response=$$(curl "$$url" | jq . | tee -a $@.tmp) ; \
	    let page=page+1 ; \
	done
	cat $@.tmp | jq '.[]' | jq -s . > $@
	rm $@.tmp

.PHONY: js/data/members.json
js/data/members.json:
	curl "https://api.github.com/orgs/yelp/members" > $@
