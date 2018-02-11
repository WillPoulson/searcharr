# Searcharr

## The Problem.

Radarr. Great at behind the scenes work however it has a very unfriendly frontend.

Imagine you've just set up your new shiny media server and linked it up to Plex. You've given every one in your family/friends their own user. However you're constantly getting bombarded with requests to add movies. You got sick of it so you've given them your Radarr address and login  so they can add movies themselves. Problem solved right?.. Aaaand they've messed it all up, somehow they've downloaded Shrek The Third 100 times in 4K filling up your precious HDD space.

## The Solution.
Searcharr. The simple Radarr & TMDB frontend that even your nan could use.
It connects directly to your Radarr server via Radarrs API and allows anyone to easily search and add movies to your collection.

## Basic setup.
To set Radarr. First clone this repository, you can clone it from wherever you like however I'd suggest picking the latest release as it will be the most stable branch.

You'll need to have the [Angular CLI](https://cli.angular.io/) set up with all it's dependancies to continue.

Once it's all cloned and you have Angular CLI set up simply navigate to the projects directory in your CLI and type `npm install`. Once that's finished you can now open the project in your favourite text editor that supports Typescript. I'd recommend [Visual Studio Code](https://code.visualstudio.com/).

Then find the `config.service.ts` file this is located in src/app/services/
Now fill in all the fields that contain placeholders. 

To get your Radarr API info follow the guide [here](https://github.com/Radarr/Radarr/wiki/API).
To get a TMDB API key follow the guide [here](https://developers.themoviedb.org/3).

Please note that when filling out the rootPath for Radarr you'll need to escape the slashes.

Once you've filled in everything you want to on that you can now go back to your CLI and type `npm build`. This will generate a dist folder containing all you need to upload to your hosting server (this can of course be locally hosted on the media server).

From then on it's just configuring your hosting!
## Some Warnings.
If you port forward it i'd highly suggest at the very least that you password protect it.

Remember if you're going to make contributions to this to not include your IPs/API keys in commits as they'll be compromised. 