rem Monitor changes with supervisor
rem can be installed by hand or by specifying in package.json:
rem "scripts": {
rem "preinstall": "npm install -g supervisor"
rem }
start supervisor -V -e "js|less|ejs|md" -w "views,routes,content,model,helpers,." app.js
start http://localhost:3000