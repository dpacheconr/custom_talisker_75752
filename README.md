# custom_talisker_75752

# DOCS
https://opensource.newrelic.com/oss-category/#new-relic-experimental

To run locally:
- Add the account number to ingest the data to in line 213 of base_script.js
- Add the NR User Key in line 251 from the account to get the data from
- Add the Ingest Key in line 252 from the account to ingest the data to

Run locally:
- node base_script.js

PS- Query and ingest account need to be from same DC, if you require different DC amend lines 229-231 accordingly.