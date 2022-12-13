# 19N15 - TEAM 5 - Healthcare: Doctor Matching
[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)





## Team 5 - Members
- Lê Quốc Thịnh - 102190141
- Đinh Minh Toàn - 102190143
- Phan Đình Khôi - 102190071

## Features

- Find diseases based on your symptons
- Chat with doctor
- Provide helpful blogs
- Book an appointments with doctors

## MVP Video
- [DriveVideo] Link video demo

## Slide docks
- [SlideVideo] Link slide docks
## Tech
Healthcare uses a number of open source projects to work properly:

- [Angular] - HTML enhanced for web apps!
- [Flask] - Simple http server for python
- [Tensorflow] - Build an AI model
- [Primeng] - UI Toolkit
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [MongoDb] - NoSQL Database
- [Redis] - Simple caching server


## Installation

Healthcare requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd healthcare-client
npm i
npm run start
```

For production environments...

```sh
npm install --production
npm run build:prod
cd dist/healthcare-client
http-server
```

## Continious Deployment
Our product uses Firebase as a place where we put our client code in.
Using github workflow, we can easily trigger a push event so that, we can deploy everytime the code is merged into master

```
# This file was auto-generated by the Firebase CLI
# https://github.com/firebase/firebase-tools

name: Deploy to Firebase Hosting on merge
'on':
  push:
    branches:
      - master
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install --force && npm run build

      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_HEALTHCARE_B8858 }}'
          channelId: live
          projectId: healthcare-b8858

```


## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   [SlideVideo]: <https://www.canva.com/design/DAFUoT_gsOM/7SIb7OwARz8ddbGR34HMcQ/view?utm_content=DAFUoT_gsOM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton>
   [DriveVideo]: <https://drive.google.com/file/d/1Jx7if_3dJgybVxlxXlo9C5QRgKpmtjZh/view?usp=sharing>
   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
