#!/bin/sh

TOKEN=$1

cat << EOF
@quid:registry=https://quid.jfrog.io/quid/api/npm/npm-quid/
//quid.jfrog.io/quid/api/npm/npm-quid/:_auth=$TOKEN
//quid.jfrog.io/quid/api/npm/npm-quid/:username=automated.write
//quid.jfrog.io/quid/api/npm/npm-quid/:email=automated+write@quid.com
//quid.jfrog.io/quid/api/npm/npm-quid/:always-auth=true
EOF
