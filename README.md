# CS3213 Project

## Github Development Workflow
- `git clone https://github.com/soedar/cs3213-project`
- Let's try our hardest to not merge broken code to develop

### Working on new feature
- `git checkout develop`
- `git pull`
- `git checkout -b <name>-<feature>`
- Work on your new feature in the feature branch

### Merge back to develop
- `git checkout develop`
- `git pull`
- `git merge <branchName>`
- `git push`

### Removing branch
- `git branch -d <branchName>` (local branch)
- `git push origin --delete <branchName>` (remote branch)

### Merge to master
- `git checkout master`
- `git pull`
- `git merge develop`
- `git push`


## Project Structure
### Frontend
- `/frontend` 
- Web Frontend
- AngularJS
- Scaffold by Yeoman angular generator

### Backend
- `/scratch` 
- Web Backend
- Strongloop
	
### Database
- MongoDB

## Project Dependencies
### Code dependencies
`[sudo] npm install -g grunt-cli strongloop bower yo generator-angular`

### Database
- Install MongoDB

## Frontend Notes
### Development Workflow
- `cd frontend`
- `grunt serve`
- Modify files in `frontend/app` folder when developing
- Yay live reload

### To add a new frontend dependencies
- `bower install <project> --save`

### To add a new Angular Controller
- `cd frontend`
- `yo angular:controller <controllerName>`
- More info: https://github.com/yeoman/generator-angular

### Angular Routes
- We can't add routes automatically using the generator, since our routes are ui-routes. Have to do it manually :(
- Modify `frontend/app/scripts/app.js` to add a new ui route
- To add a new tab, modify `frontend/app/scripts/controllers/tabsController.js`

## Backend Notes
### Development Workflow
- `cd scratch`
- `slc run`

### Get latest code from frontend
- `cd frontend`
- `grunt build`
- The distributed frontend code should appear in the `scratch/client` folder