# CHRORACLE
![GitHub language top](https://img.shields.io/github/languages/top/ChronoDAO/CHROracle)

[CHROracle](app.chronodao.com) is a webapp to track and follow the market of the web 3 game [Big Time](https://bigtime.gg). It follows close to real time the evolution of sales, floor price and other aspects of the market place.

## Table of Contents

[Authors](#authors)  
[Modifying-the-database](#modifiying-the-database)  
[Next-Auth](#next-auth)  
[Licence](#licence)  

### Authors

[@LionelDiot](https://github.com/LionelDiot)  
[@AndreaSolis](https://github.com/Andreasolisgarcia)  
[@Cyber-Geooorge](https://github.com/Cyber-Geooorge)  
[@LisaDaudibon](https://github.com/LisaDaudibon)  
[@1996thomas](https://github.com/1996thomas)


### Modifying the database
If you work on our database, any and all changes related to the database must be done in the Indexer. If you're not part of the organisation ChronoDAO but want to contribute, you can contact us to request access. 

If you're using your own supabase access key, disregard the consideration above. 

INFO : if you fork the project and do modification to the database, know that will be unable to accept any pull request from you because it could disrupt our own schema.

### Next-Auth
This project handles authentication for the users using next-auth and jwt. To add, modify or delete a field of the model User, you'll first need to go through the [indexer](https://github.com/ChronoDAO/Indexer.git) to make changes to the db.

Then to fill, modify or remove the new field from the table User, you have to modify the following files :
- `auth.d.ts` at the root level,
- `lib/prisma/auth.ts`,
and the route/component where you want to show the new information.

To only add an info to the table user, change the `ìnterface user` and then the profile info in the `lib/prisma/auth.ts` file, to get a new info in the session, change both the `jwt` and the `session interface` in the `auth.d.ts` and the info you get in the `auth.ts` file.

### License
This project is protected under the GNU License.