#!bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR=$(dirname "$SCRIPT_DIR")

cd "$ROOT_DIR/apps/contacts-service"
npx prisma migrate dev --name init &

cd "$ROOT_DIR/apps/file-importer-service"
npx prisma migrate dev --name init &