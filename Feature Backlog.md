Backlog:
Key:
***** means that the topic is an immediate focus


*****Git:
-delete compiled folder and iron out gitignore


Bug Fixes:
1)The `list` state variable populated in and passed down from Stats.jsx is currently (incorrectly) always populating a `twitterHandle` property with the search entry. In former code versions, the title would render differently (with or without an '@'; see StatsCard.jsx's `getTitle` function) depending on the existence of the properties `twitterHandle`, `topic`, and `location` on the `list` state variable in Stats.jsx


Features:
*****Client/UX:
1)Seek out a way - if possible - to correctly capitalize the characters of twitter handles in user titles (instead of generically using the `capitalizer` function in StatsCard.jsx)
2)Change `location` in search radio button to `topic by location` (we're currently also seeking an enterprise partnership with GNIP for realtime location data to utilize instead of or in addition to this)
--conditionally render a second search bar labeled with "location" - separated by a colon or the words "in" (the first search bar will be still labeled "topic")
3)Pithy explanation or tagline immediately to the right of the title explaining what the app does and is about
-"Are you making waves?" OR "Find out what's making waves" OR "What's making waves near you?"
4)StatsCard entries:
-X button at the top right to change `display` style of entry to `none` on the dom
-change the orange text between twitter handle, topic, and location
5)Basic Website flavicon
6)Overloading the Nav component with NavItems distorts how the individual StatsCards appear on the page - diagnose this
7)Change the `selected twitter handle inactive` text upon failed score loading to something better (e.g. 
an equivolent to the StatsNav's "Invalid Twitter Handle")


*****Auth0:
1)refactor api usage model to `streaming` to remove 15 tweets / 15 minutes api key limitations


Google map api iframe (select a location on the globe to simultaneously populate the search bar with a location)


Stretch Features:
Cookies/Tokens:
-pull user's location and save to state variable on page load "<web address> wants to: Know your location"
--pre-load coordinates into gmaps iframe if below is achieved


Trending Topics feature/sidebar

Game mode: users estimate what 10(?) random topics, locations, and or celebrities' scores are and - like golf scores - the lowest are tracked on a daily basis




Wrap-up sprint goals:
1)Deployment
2)Update project page readme so that the user can get an instant idea of the features that were added via a before-and-after app screenshot