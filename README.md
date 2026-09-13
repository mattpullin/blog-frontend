Assessment 3 – laravel admin assessment 3 React JS Blog Front End

GitHub repository: https://github.com/mattpullin/blog-frontend


## Setup and running the frontend

Requirements: Node.js 20 or later (includes npm), Git, and the Laravel backend running on
http://localhost:8000 - See Read me in A3 backend.

1. Clone the repository
git clone https://github.com/mattpullin/blog-frontend.git
cd blog-frontend

2. Install dependencies
npm install

3. Start the development server
npm run dev

4. Open http://localhost:5173 in a browser. Go to /login and sign in with the seeded admin
account: email `admin@example.com`, password `password`.


Approach

The assignment required the frontend to be a separate repository. I created a new project with the React and TypeScript template, initialised git, and pushed to a new GitHub repository and added Ibrahim-une as a collaborator.

Inside the src I created four folders. The first folder was /types for the TypeScript interfaces (Post.ts and Category.ts). Each interface is a copy of the JSON the API returns, and is imported wherever that data is used so there is one place where it is defined.

The second folder is /api this contains all fetch calls (client.ts for login and logout, posts.ts and categories.ts for the CRUD calls). Front end components and pages dont call fetch directly, The URL and the Authorization header are written once in this layer and stored for use in calls to the backend unitl the user logs out and it is discarded.

The third folder is components, for pieces shared across pages, Layout (the navbar, page container and footer) and RequireAuth (the route guard) that ensures a bearer token is present before rendering a protected page this redirects to an unauthorised page if it doesnt.

The Fourth folder stores the pages for the route components - Login, PostsList, PostDetail, PostCreate, PostEdit, CategoriesList, CategoryCreate, CategoryEdit, Unauthorised.

The login page posts the email and password to /api/login. The token from the response is stored in localstorage. Every API function reads it from there and sends it in the authorization header. Logout calls /api/logout to revoke the token on the server and then removes it from local storage.

The RequireAuth component wraps the protected routes. If there is no token it redirects to an Unauthorised page instead of rendering the page. I added this for user feedback only. During user testing, visiting a protected page while logged out fell through to a blank page, and it was not clear what had happened. The page was still protected, because the sanctum middleware on the API was rejecting the request with a 401, but the frontend was not surfacing that response so it failed silently. I found this using the browser developer tools, where the Network tab showed the 401 that the page was not reporting.

Routing is defined in src/App.tsx using React Router. It provides the routes for login, authentication, posts and categories. The protected routes are nested under RequireAuth so they go through a token check before they can be used.Navigation components sucj as the create and edit buttons and the navigation bar use Link components imported from react-router-dom this is so the browser does not reload the page, the URL changes and React swaps the page components in place this ensures that only data moves between the two apps as JSON over the API and that navigation can be contained within the front end application.

I used React-Bootstrap so the frontend looks tsimilar to the A2 application whichthe assignment brief recommended. A Layout component renders a similar navigation bar, page container and footer as the A2 app.blade.php and each route then renders inside it. The posts and categories lists use the same table formats as the A2 Blade views which i spent time in formatting and aligning to get a similar look and feel.

Each page uses useState to hold its data and useEffect to load it when the page mounts. Edit pages load the existing record first and fill the form, then send a PUT on submit. Delete asks for confirmation and updates the local list state.

Testing

I used the compiler developer tools available to check for typescript and compiling errors throughout the process to correct issues as as i built out each section. This helped a lot as i was able to chase out code issues and correct them before they ran. I used the following checks thoughout the build, npx tsc --noEmit to check for typscript errors and npm run build to check how the application is compiled. I also use npm run lint to check for any other code quality issues. Finally i used npx prettier --write src to format the code automatically to improve the readability and presentation of the code base.

In network Development tools in the browser i logged in and confirmed the token appeared in localStorage. I then loaded the posts list and confirmed the GET /api/posts request carried the Bearer token. I Created, viewed, edited and deleted posts and categories and confirmed each request in the Network tab with the expected status code. ILogged out and confirmed the token was removed and that protected pages redirected to the Unauthorised page.


Challenges

Moving everything over to TypeScript. This was a new concept for me, so reformatting the code and getting the type definitions correct took time to understand and get working. The types had to match the JSON the API returns exactly. Getting a clean build took several rounds.

Filling in the visual gaps once the basic frontend was working. The first version ran, but pieces were missing and the pages did not look like the Assignment 2 app. Bringing the layout, navbar, tables and forms into line with A2 was a long run of small iterative edits and retests.

Categories were not in the assignment brief. I built the frontend to the assessment guide, which only covered posts, and did not notice until I was fine tuning that the frontend was only a partial version of the Assignment 2 app. I decided to go back into the backend, build out the category API controller and routes, test them in Postman, then added the category type, API functions, pages and routes on the frontend. I should have picked this up earlier but it wasnt until i was functionally testing that it becam apprarent i only had half an application which was a bit of a face palm moment, a very obvious thing and it reminded me to look at the bigger picture of what i was doing rather than blindly following a specification. I decided there was enough time to build it out and get the frontend as close to the backend as possible.

Silent failure on validation and auth errors. When the API rejects a request with a 422 or 401, the form still redirects as if it succeeded and the user gets no message. This is still in the code. I ran out of time to fix it. The fix is to check it in the API layer and pass an error, then show the message to the user. This would bring the application closer to the validation the A2 application had. The RequireAuth fixed the no-token case, but a invalid, revoked or obsolete token would still fail silently.



