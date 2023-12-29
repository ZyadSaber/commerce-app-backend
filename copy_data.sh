#!/bin/bash

# Source database details
SOURCE_DB_HOST="144.24.209.19"
SOURCE_DB_PORT="5432"
SOURCE_DB_NAME="salam"
SOURCE_DB_USER="postgres"
SOURCE_DB_PASSWORD="ZozSaber@0909010169"

# Target database details
TARGET_DB_HOST="144.24.209.19"
TARGET_DB_PORT="5432"
TARGET_DB_NAME="commerce"
TARGET_DB_USER="postgres"
TARGET_DB_PASSWORD="ZozSaber@0909010169"

# Dump data from source database
pg_dump -h $SOURCE_DB_HOST -p $SOURCE_DB_PORT -U $SOURCE_DB_USER -d $SOURCE_DB_NAME -F c -b -v -f dump_file.dump

# Restore data to target database
pg_restore -h $TARGET_DB_HOST -p $TARGET_DB_PORT -U $TARGET_DB_USER -d $TARGET_DB_NAME -v dump_file.dump

# Clean up: Remove the dump file
rm dump_file.dump
