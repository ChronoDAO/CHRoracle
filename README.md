# CHRORACLE
![GitHub language top](https://img.shields.io/github/languages/top/ChronoDAO/CHROracle)

[CHROracle](app.chronodao.com) is a webapp to track and follow the market of the web 3 game Big Time. It follows close to real time the evolution of sales, floor price and other aspects of the market place.

## Table of Contents

[Authors](#authors)  
[Next-Auth](#next-auth)  
[Run locally](#run-locally)  
[Licence](#licence)  

### Authors

[@LionelDiot](https://github.com/LionelDiot)  
[@AndreaSolis](https://github.com/Andreasolisgarcia)  
[@Cyber-Geooorge](https://github.com/Cyber-Geooorge)  
[@LisaDaudibon](https://github.com/LisaDaudibon)  
[@1996thomas](https://github.com/1996thomas)

### Next-Auth
This project handles authentication for the users using next-auth and jwt.

To add a field into the table User, you have to modify the following files :
- `auth.d.ts` at the root level,
- `lib/prisma/auth.ts`,
and the route/component where you want to show the new information.

To only add an info to the table user, change the `ìnterface user` and then the profile info in the `lib/prisma/auth.ts` file, to get a new info in the session, change both the `jwt` and the `session interface` in the `auth.d.ts` and the info you get in the `auth.ts` file.

### Run locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```
Transform the ``.env.local` into `.env` and add your own discord API key and supabase key.

Start the server

```bash
  npm run start
```

### License
This project is protected under the GNU License.