## Task description

1) Signup form (Fields: Username, Password, Repeat a password) & Signin form.

2) File upload page that lets the user pick a file by clicking on the "Choose a file" button or by dropping a file to a drop area on the page. After the uploading need to show a user a unique download link.

3) Page with a list of files uploaded by an authorized user with meta-info (filename, upload datetime, file size, download link).

Additional requirements:
- Download link should initiate downloading only if the user is authorized as a file owner.
- The application should forbid uploading of files larger than 5Mb.
- The application shouldn't store on the disk and create a new link for a file that has been already uploaded by this user and it should return a link for the existing one.

*Note:*
The backend should be written using Node.js. You can use any frameworks or libraries.
You are able to use any libraries and code samples from the internet or from your own codebase during the task execution.

*Time limit: 2h*


## Solution description

Stack:

> NestJS - server-side framework
> TypeORM / SQLite - database connectivity & API
> Passport (Local + JWT + Nest Guards) - authentication & authorization
> Multer - file uploader library
> Serve-static - serving HTML pages in browser
> Jade Engine + Bootstrap 4 - html, css engines
> Jest - unit & e2e testing

TODO:
- Build page templates
- Verify already logged on users and redirect from login page
- Use jade templates for generating HTML pages (or React/Angular/Vue libs)