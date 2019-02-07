#!/bin/sh

TOKEN=$1

cat << EOF
registry=https://registry.npmjs.org
email=automated+write@quid.com
username=automated.write
always-auth=true
_auth=$TOKEN
//registry.npmjs.org/:_authToken=$TOKEN
EOF
