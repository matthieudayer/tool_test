#!/usr/bin/env bash
ng build
git add .
echo Hello, Can you please add the commit message?
read commitmessage
git commit -m commitmessage
echo  what is the name of your branch?
git push origin develop
