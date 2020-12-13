# Vue Youtube Iframe API

Hi, this is a Vue plugin to add youtube embed videos to your web project and control them.

It is very handy to create a custom player based on youtube videos, checkout this website for example :
https://foreignrap.com

## Installation

First add it to your project via yarn:

`yarn add vue-youtube-iframe-api`

OR npm:

`npm install vue-youtube-iframe-api --save`

Then, tell Vue about the plugin (Note that the name of the variable here is up to you).

```javascript
import Vue from 'vue';
import Vytia from 'vue-youtube-iframe-api';

// simple way
Vue.use(Vytia);

// OR, with configuration
Vue.use(Vytia, {
  scriptUrl: null, // API url, OPTIONAL, default: https://www.youtube.com/iframe_api
  width: null, // global player width, OPTIONAL, default: 640
  height: null, // global player height, OPTIONAL, default: 360
  playerVars: null, // global playerVars, OPTIONAL, default: {}
  onLoad: null, // iframe loaded callback function, OPTIONAL
  onError: null, // iframe load failed callback function, OPTIONAL
});

// instan your Vue app
new Vue( ... );
```

This Vue plugin gives you access to a `<vytia-player ytid="..."></vytia-player>` component.

However, you can use the component name you want by importing the component locally or globally.

```javascript
import Vue from 'vue'
import VuePlayerPlugin, { Player } from 'vue-youtube-iframe-api'

Vue.use(VuePlayerPlugin)

// globally
Vue.component('my-custom-name', Player)

// OR locally
new Vue({
  components: {
    MyPlayer: Player
  }
})
```

## How it works ?

Just add the component where you want with either a **id** or **url** prop.

When the prop changes, the player will automatically load the new relevant video.

## Component Props

| prop       | description                                                                                                  | type            | default |
|------------|--------------------------------------------------------------------------------------------------------------|-----------------|---------|
| id       | youtube video id note: both "ytid" & "yturl" can't be used at the same time               | String          | null    |
| url      | youtube video url note: both "ytid" & "yturl" can't be used at the same time  | String          | null    |
| width      | the iframe's width note: youtube asks for 200 minimum                                                        | String | Number | 640     |
| height     | the iframe's height  note: youtube asks for 200 minimum                                                      | String | Number | 360     |
| playerVars | the iframe's player variables, full list: https://developers.google.com/youtube/player_parameters?hl=fr | Object          | {}      |

Make sure to look at all player variables as this will help you remove controls from the youtube iframe.

https://developers.google.com/youtube/player_parameters?hl=fr

## Component Events

| event     | description                                                                                                       |
|-----------|-------------------------------------------------------------------------------------------------------------------|
| ready     | fires when the player is ready and the player's instance can be used                                              |
| error     | fires when the player encounters an error https://developers.google.com/youtube/iframe_api_reference?hl=fr#Events |
| unstarted | fires when player ready but not started because no video                                                          |
| playing   | fires when player starts playing                                                                                  |
| paused    | fires when player stops playing and is on pause                                                                   |
| cued      | fires when a video was added to the player's queue but hasn't played yet                                          |
| buffering | fires when player starts buffering / loading                                                                      |
| ended     | fires when player video has ended                                                                                 |

## Component Methods

You can access these methods by adding a **ref** on the component.

| method    | description                                            | params      |
|-----------|--------------------------------------------------------|-------------|
| loadById  | programatically loads a new video on the player by ID  | id: String, options: Object  |
| loadByUrl | programatically loads a new video on the player by URL | url: String, options: Object |

## Youtube Player instance

You can access the youtube player's instance by adding a **ref** on the component.
You need to wait for the player to be ready though.
When the player is not ready, the property holding the instance is null.

Full list of the instance's methods you can use below:
https://developers.google.com/youtube/iframe_api_reference?hl=fr#Playback_controls

```html
<vytia-player ytid="some youtube id" ref="yt" @ready="onPlayerReady"></vytia-player>
```

```javascript
new Vue({
  methods: {
    onPlayerReady () {
      // you have access to the ref here
      this.$refs.yt.player.seekTo( ... )

      // you can see the full list of methods available here
      // https://developers.google.com/youtube/iframe_api_reference?hl=fr#Playback_controls
    }
  }
})
```

Make sure to check out the demo to see how to control the player.

The demo works with parcel-bundler.

Install it by doing `npm install -g parcel-bundler` or `yarn global add parcel-bundler`.
