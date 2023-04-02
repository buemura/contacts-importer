#!/bin/bash

cd apps/contacts-service
npm run start:dev &

cd ../file-importer-service
npm run start:dev &

cd ../web
npm run dev &