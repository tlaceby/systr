## System Tracker  
https://systr.tech/

* systr is a system tracking and monitoring application for Windows, & OSX. The application is built using electron along with core js and python libraries.

### Objectives / Future Plans for Development

* Add UI for Memory, Network / IO & System Overview Page
* Auto Updater Support and Release API for custom releases.
* Custom Theme Support
  * Allow custom JS, CSS, and HTML to be put into a community folder and then have a public api for any js code to access. 
  * The API will only allow variables I create and make private ***Privacy Reasons***
  * Plans for this will be further down below and I am experimenting with this concept in a separate code base.



## Current Features

* Settings and Customizable UI (Kind of)
  * Dark and Light Theme support
  * Open at startup of machine for windows **"not osx"**
  * two custom ui themes for how data is presented.

* CPU Tracking

  * Basic Usage and Utilization stats are implemented

  ## Stable Release
  
  Most stable release is 1.2.8 currently.
  
* ## Development Bugs And Notes

* The current build I am focusing on is 1.2.9 and it has noticeable spikes in CPU usage during the launching of a new python process. The app itself does not cause much extra performance overhead, however the widows defender is pegged at around 16% on my Ryzen 5 2600 system. 

* I think the main way to fix this is to not launch any python processes unless one is bugged or crashed. Then the windows defender will not be constantly trying to check this process. 

  