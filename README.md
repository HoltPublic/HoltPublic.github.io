Ok, so basically this website will primarily be edited via HTML and JSON. 
In the body text of the HTML File, include the following code: <header id="global-navbar" class="navbar"></header>
towards the top and <script src="JS/navbar.js"></script> at the bottom before closing <body>
This allows us to have a navigation bar on each webpage. Otherwise, do whatever is meant to update the website.

If the page is something like frc.html or ftc.html, then that means most of the content is dynamically loaded
from JavaScript pulling from a JSON file, just look for the respective .json files within Files/Data, and images can be found in
Files/Images