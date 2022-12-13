#!/bin/sh

set -ex
npx prisma migrate reset --force
npm run start
