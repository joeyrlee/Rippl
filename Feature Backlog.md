Backlog:
Key:
***** means that the topic is an immediate focus


*****Git:
-delete compiled folder and iron out gitignore


Features:
*****Client/UX:
1)When a topic or location is entered, but with weird capitalization, output the prettified string using javascript
2)Proceed locations with gps coords in a light gray (a la twitter fashion)
3)Pithy explanation or tagline immediately to the right of the title explaining what the app does and is about
4)Overloading the Nav component with NavItems distorts how the individual StatsCards appear on the page - diagnose this
5)StatsCard entries:
-change the orange text between twitter handle, topic, and location
-X button at the top right to change `display` style to `none` on the dom
6)Change `location` in search radio option to `topic by location`
--conditionally render a second search bar labeled with "location" (the first will be labeled "topic")
7)Change the `selected twitter handle inactive` text upon failed score loading to something better (e.g. 
an equivolent to the StatsNav's "Invalid Twitter Handle")


StatsFoot Bug:
-"To Twitter" text is dislocated (moved right 20% of screen) when no score is found
--part of a bigger problem to do with screen resolution and current rendering resolution that persist across multiple app features


*****Auth0:
1)persist search history in database on an individual basis
2)refactor api usage model to `streaming` to remove 15 tweets / 15 minutes api key limitations
-render username and corresponding twitter or google thumbnail image to nav bar
-allow page reloading (endpoint conflicts)
-persist JWT tokens so that on reload you don't have to re-login
-incorporate Google auth0



Stretch Features:
Cookies/Tokens:
-pull user's location and save to state variable on page load "<web address> wants to: Know your location"
--pre-load coordinates into gmaps iframe if below is achieved

Google map api iframe (select a location on the globe to simultaneously populate the search bar with a location)

Trending Topics feature/sidebar

Game mode: users estimate what 10(?) random topics, locations, and or celebrities' scores are and - like golf scores - the lowest are tracked on a daily basis