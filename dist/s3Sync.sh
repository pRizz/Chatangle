#!/bin/bash
aws s3 sync . s3://www.chatangle.com/ --exclude "*.idea/*" --exclude "*.git/*" --exclude "s3Sync.sh" --delete
read -rsp $'Done syncing. Press any key to continue...\n' -n 1 key
