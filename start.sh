#! /bin/bash

set -euxo pipefail

docker-compose() {
  docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w="$PWD" \
    docker/compose:1.29.2 "$@"
}

docker-compose up