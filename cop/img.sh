#!/bin/bash

# Loop through all folders in ./blog and create an img folder if it doesn't exist
for dir in ./blog/*/; do
  if [ -d "$dir" ]; then
    img_dir="${dir}img"
    if [ ! -d "$img_dir" ]; then
      mkdir "$img_dir"
      echo "Created: $img_dir"
    else
      echo "Exists: $img_dir"
    fi
  fi
done