#!/bin/bash

# Usage: ./replace_dev_to_uploads.sh /path/to/your.md

FILE="$1"

if [ -z "$FILE" ]; then
  echo "Usage: $0 /path/to/your.md"
  exit 1
fi

# Replace all dev-to-uploads image links with ./img/<alt tag>.png
sed -i '' -E 's|!\[([^\]]+)\]\(https://dev-to-uploads\.s3\.amazonaws\.com[^\)]+\)|![\1](./img/\1.png)|g' "$FILE"