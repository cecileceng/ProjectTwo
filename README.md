# CODR! The Grindr for Devs.
Anyone can edit! Let's keep our code organized! Use this README as a public billboard.<br>
Heroku app URL: [coding-partners.herokuapp.com](http://coding-partners.herokuapp.com/home)<br>
Webpage URL: [coding.partners](https://www.coding.partners)<br>

## ANNOUNCEMENTS AND WARNINGS:
BRANCHES SYNCED! Views folder needs overhaul. Commented out sidenav in interactive.js. Still lots of work to do.
Heroku App remote: https://git.heroku.com/coding-partners.git<br>
Verify remotes in git:  git remote -v<br>
Add Heroku remote:  heroku git:remote -a coding-partners<br>
:information_desk_person:Add Heroku remote:  heroku git:remote -a coding-partners<br>
:information_desk_person:Push non-master branch to Heroku remote for live testing: git push heroku yourbranch:master<br>
:information_desk_person:Github HTML preview, just insert the index.html into this page: [https://htmlpreview.github.io/](https://htmlpreview.github.io/)<br>

##README STRUCTURE
1. Announcements
2. README index
3. Requirements
4. Workflow
5. Presentation
6. Notes


##REQUIREMENTS (when completed: list date completed and your name.)
1. Must use Node.js and Express.js for web server. (not yet done)
2. Must be backed with MYSQL Database using Sequelize ORM (not yet done)
3. Must have both GET and POST routes (not yet done)
4. Basic SEO (not yet done)
5. Basic Framework Testing (not yet done)
6. Must deploy on Heroku (in progress, not yet complete)
7. Must utilize new library (DONE. Michael: 8-7-2016 with sockets.io)
8. Must have polished UI (IN PROGRESS. Lee: current)
9. Must have MVC folder structure (DONE. Michael: 8-5-2016)
10. Must meet good quality coding standards (Maybe done??)
11. OPTIONAL : Utilize handlebars.js templating engine (DONE. ALL: 8-7-2016)
12. OPTIONAL : Incorporate Authentication (DONE. CECILE FOR REAL 8-8-2016)
13. OPTIONAL : Use existing data set to power database (not yet done) 
14. OPTIONAL :  Create migration strategy (not yet done)
15. IMPORTANT : Rehearse presentation (not yet done)
16. IMPORTANT : Build files and slideshow for presentation (not yet done)

##WORKFLOW 
#####All of us will have direct commit access to Cecile's repository as project contributors. But remember:
1. NEVER work on branch master! Master is perfection, and is representative of our latest progress!
2. Do not push or pull from github with uncommitted changes on your local machine. This will cause conflicts.
3. Always pull before you push!
4. Solve all merge conflicts on your own machine. We're all responsible for our individual commits.
5. Work on Branches! We can have shared branches on the main repo if more than one of us needs to work on any given feature at the same time.
6. This is a big project, prepare to do a lot of googling and asking the TA's for help.
7. Check GitHub and Slack daily for team updates! 5 minutes of looking can save you from spending 5 hours working on a feature someone else has already built.
8. Communicate! Communication is key.

#####Here's a quick list of the most common GitHub commands you'll be using:
1. git pull 	(detailed: git pull sourceName branchName)
2. git status 	(Check this before pushing and pulling)
3. git add -A 	(Stage all files for commit. You can also specify individual files)
4. git commit -m 	(commit early, commit often)
5. git push sourceName branchName (specify your endpoints so you don't accidentally push to the wrong branch)
6. git remote -v 	(view remote connections)
7. git checkout -b branchName 	(create branch named branchName and switches to it)
8. git checkout branchName 	(switch from current branch to branchName)
9. git branch 		(view branches)
10. git merge branchName 	(merge branchName INTO current branch)

##PRESENTATION

#####Our presentation time is 10 minutes. This is a formal presentation. We will need to explain the following in detail: 
1. Overall concept
2. Motivation for development
3. Design process
4. Technologies used
5. Demonstrate the applications functionality
6. Explain direction for future development

#####We will be graded on:
1. Concept
2. Design
3. Functionality
4. Collaboration
5. Presentation 
6. Technical sophistication??? (wasn't listed in the slideshow, but we were graded on it during the first project)

##NOTES

Feel free to make suggestions for improvement.
If you're not familiar with GitHub workflow, I'll give you a GitHub mentoring session. It's essential than all of us can work effectively over GitHub.

Use GitHub "Issues" feature to track issues with code.
Socket.io or websockets for live chat communication between users.
