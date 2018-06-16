# NW.JS Project Template
This template has everything needed to start an html-javascript NW.jS project right away

#Needed global npm dependencies
```
npm view nw versions - get the latest version of NW.JS and replace it in the command below
npm install -g nw@version-sdk
npm install -g nwbuild
```

# Run the project
Open terminal and run gulp

# Run auto refreshing copy of dist
Use Live Server extension in VS Code, right click on index.html, Open with Live Server

# Git - recommended SSH using the set key
###Set the new repo name
```
git remote set-url origin git@bitbucket.org:emanuilov/new-repo-name.git
```
###Check the current repo
```
git remote -v
```
###Merge with the new after the change
```
git pull --allow-unrelated-histories
```

# Edits
The only place that needs edits is package.json