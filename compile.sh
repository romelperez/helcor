#!/bin/sh

alias babel='./node_modules/.bin/babel'

log() {
  echo "\033[1;32m$1\033[0m"
}

build() {
  log "\nCompiling $1..."
  NODE_ENV=production
  rm -rf ./packages/$1/lib/
  babel ./packages/$1/src --out-dir ./packages/$1/lib/ --ignore '*.test.js' --presets=@babel/preset-env
}

log "Helcor packages compilation..."

build "merge-collections"
build "move-in-array"
build "throttle"
build "window-sizes"

log "\nCompilation completed."
