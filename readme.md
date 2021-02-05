## System Tracker  
https://systr.tech/

* systr is a system tracking and monitoring application for Windows, & OSX. The application is built using electron along with NodeJS.

### Objectives / Future Plans for Development

* **Add & Style System Overview and Network Pages.** 
* Custom notifications and settings for when usage of x part become too high.
* Speed and Launch time improvements. Target for *2seconds* of launch time and no *CPU usage above 2%* over a duration of a minute or so.
* Custom Theme Support
  * Allow custom JS, CSS, and HTML to be put into a community folder and then have a public api for any js code to access. 
  * The API will only allow variables I create and make private ***Privacy Reasons***
  * Plans for this will be further down below and I am experimenting with this concept in a separate code base.
* More customizability for what types of data are shown. Currently its all static and you cannot disable bar charts or graphs without changing themes. I want to add custom checkboxes for enabling and disabling at runtime each and every type of UI element.



## Current Features

* Settings and Customizable UI (Kind of)
  * Dark and Light Theme support
  
  * Open at startup of machine for windows **"not osx"**

  * Two custom ui themes for how data is presented.
  
    * One heavy with tables and another light with graphs and charts.
  
      
  
* **CPU Tracking**

  * Basic Usage and Utilization stats are implemented.
  * Model, make, manufacturer, clock.
  * System, User, and Overall % used in real time.
  * Nice Graph to see usage over a custom interval time.
  
* **Memory Tracking**

  * GB used and free
  * % Free and Used

* **Network Tracking**

  * Upload and Download / second

* **Process window**

  * Track and view any process running on your computer
  * see a real time graph and track how much the process is taking up on your system.
  * search and fast load times for tracking a process.

* Interval control for how often data is updated.
  
  ## Stable Release
  
  Most stable release is *1.4.0* currently.
  
  ##  Development Bugs And Notes
  
* Currently the overhead at startup is way to large and upwards of 3 seconds at average on my system. The target goal is 2seconds on all systems with a 4core CPU and decent ram amount. 

* I also have finally removed the security vulnerabilities associated with Node Integration being allowed in the render processes. However this is still available to be used in the process window.

  