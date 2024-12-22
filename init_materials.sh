NAME=`basename "$PWD"`
git remote remove origin
git remote add origin https://github.com/robindevilliers/$NAME.git
git branch -M master
git push -u origin master
