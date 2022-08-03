#!/bin/bash

POSTGRES_USER_NAME=akhil
SQL_FILE_PATH=/home/akhil/Public/Code/SpaceLearn/server/db/database.sql

psql -d postgres -U $POSTGRES_USER_NAME -c "\i $SQL_FILE_PATH"
