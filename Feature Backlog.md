Backlog:
Key:
***** means that the topic is an immediate focus


**********Bug Fixes:
1)Searches by Twitter Handle currently aren't working - only searches by #Topic


Features:
*****Client/UX:
1)Implement functionality in the 3rd search option (topic by location) with user-entered topics and geo-coordinates
-to be changed shortly thereafter to incorporate Google's geocode API for location name/address to geo-coord. conversion
2)Persist logins so that on page refresh, you don't have to re-login every time (or ever, at least cookies are cleared or until logout is clicked)
3)Seek out a way - if possible - to correctly capitalize the characters of twitter handles in user titles (instead of generically using the `capitalizer` function in StatsCard.jsx)
4)Pithy explanation or tagline immediately to the right of the title explaining what the app does and is about
-"Are you making waves?" OR "Find out what's making waves" OR "What's making waves near you?"
5)StatsCard entries:
-X button at the top right to change `display` style of entry to `none` on the dom
-change the orange text between twitter handle, topic, and location
6)Basic Website flavicon
7)Allow users to control the sample size (within reason) by which the sentiment scores are calculated
8)Overloading the Nav component with NavItems distorts how the individual StatsCards appear on the page - diagnose this
9) KG: change get to post requests


*****Server:
1)See Client/UX feature #1
1)See Client/UX feature #3



*****Auth0/Sessions/Tokens:
1)See #2 in Client/UX
2)See # regarding persisting DELETIONS of saved card entries removed from the dom via the 'x' bottom at the top right of each card
3)refactor api usage model to `streaming` to remove 15 tweets / 15 minutes api key limitations




Stretch Features:
Google map api iframe (select a location on the globe to simultaneously populate the search bar with a location)

Additional persisting of user-specific location data:
-pull user's location and save to state variable on page load "<web address> wants to: Know your location"
--pre-load coordinates into gmaps iframe if below is achieved
Trending Topics feature/sidebar

Game mode: users estimate what 10(?) random topics, locations, and or celebrities' scores are and - like golf scores - the lowest are tracked on a daily basis




Wrap-up sprint goals:
1)Update project page readme so that the user can get an instant idea of the features that were added via a before-and-after app screenshot
2)Deployment