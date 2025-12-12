#!/bin/bash
set -e
echo "Running database migrations with force flag..."
npm run db:push -- --force
echo "Building application..."
npm run build
