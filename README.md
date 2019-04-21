[![Build Status](https://travis-ci.com/chybie/ng-my.svg?branch=master)](https://travis-ci.com/chybie/ng-my)

# NG-MY official website

Working on project:
1. always create your own branch and work on it
2. create a PR and merge to master only when it's ready
3. Travis will triggered when PR is merged, auto deploy to ng-my production

To start the project:
1. Install yarn
2. run "yarn"
3. run "yarn start"

To deploy the project manually:
1. run "npm install -g firebase-tools"
2. run "firebase login" then login with your google account
3. run "yarn deploy"

## How to create a new post
1. Create a PR
2. Add your new post introduction in `/projects/site2019/src/assets/data/posts.json` follow the existing format - the details here will be used for both the web content & SEO
3. Create a text file in `/projects/site2019/src/assets/posts` follow the other existing post. The file name **must be same as the post id you create in previous step**. File content is in `markdown` format. You can use `https://dillinger.io` to write your articles in markdown and previous it.
4. If you have any images that you want to upload, can add to this folder: `/projects/site2019/src/assets/imgs/posts`. The file name is not restricted, you can put any. In your article you can refer to the image with url like this `/assets/imgs/posts/{your-image-name}.jpg`. Always reduce your image size with `https://squoosh.app/` before upload.
5. All ready? Send to me!😁
