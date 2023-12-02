#!/usr/bin/env bash

BACKEND_PROJECT=seastar-backend
CURRENT_PROJECT=seastar-admin-frontend
API_FILE=api.json

# Clone backend project
git clone git@github.com:dipro-vn/$BACKEND_PROJECT.git ../

# To stop this script on any error
set -e

# Merge backend API specs
cd ../$BACKEND_PROJECT
yarn mergeAPI

# Copy `api` file to `./.api-gen` of the mobile project
cp $API_FILE ../$CURRENT_PROJECT/.api-gen/$API_FILE

# using openapi-generator-cli to generate API code
cd ../$CURRENT_PROJECT

# delete old files
rm -rf src/api/generated

npx @openapitools/openapi-generator-cli generate \
  -i $PWD/.api-gen/$API_FILE \
  -t $PWD/.api-gen/template \
  -g typescript-fetch \
  -o $PWD/src/api/gennerated