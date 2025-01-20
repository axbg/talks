---
theme: ./theme
themeConfig:
  primary: '#2c7a7b'
background: https://plus.unsplash.com/premium_photo-1682125235036-d1ab54136ff4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
title: "WebRTC: start here"
info: |
  ## WebRTC: start here
  Talk by axbg @ sibiu
mdc: true
transition: fade-out
---

# WebRTC
## : start here

A gentle introduction to the real-time communication standard of the web

<div style="position: absolute; left: 0; bottom: 0; margin-left: 10px;">
  <span>Sibiu Web Meetup</span>
</div>

<div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%)">
  <span>January 2025</span>
</div>

<div class="abs-br m-0 text-xl">
  <span>axbg</span>
  <a href="https://github.com/axbg" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>
---
title: Personal intro
layout: image-right
image: ./assets/headshot.jpeg
---

# hello, I'm @axbg

<br><br><br><br>

- 🧑‍💻 Software Engineering Specialist @ Accenture
- 🧑‍💻 Technical Trainer @ Devmind
- 🧑‍💻 Teaching Assistant @ CSIE ASE

<br><br><br><br>
<br><br><br>

You can find all my links [here](https://github.com/axbg)
---
title: webrtc
layout: default
---
# why did this talk happen?

<br><br>

<div style="display: flex; justify-content: center">
  <img v-click src="./assets/mail.png" height="200px">
</div>
---
title: webrtc
layout: default
---
# how did this talk happen?

<div style="display: flex; justify-content: center">
  <img src="https://secure.meetupstatic.com/photos/event/d/a/7/e/600_523855934.webp?w=384">
</div>
---
title: webrtc
layout: image-right
image: https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
# WebRTC? How?
<br><br>

- Teaching stuff is cool, but you have to talk a lot
- Talking is (often) boring (for the listener)
- You have to **present** something for the audience to, **hopefully**, get less bored
- So, most of the times, you will use a **projector** to share some kind of slides
---
title: webrtc
---
# yes, but

### what do you do if you encounter something like this in 2025?

<img src="https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F6659557-01" />
---
title: 'something'
layout: center
---
# how to solve this problem?

- the most reasonable solution: buy an adapter
- my (not so reasonable) solution: build an app
---
title: 'something'
layout: image-right
image: https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
# critical points

<br><br>

The application should be:
- easy to build
- easy to deploy 
- working on various clients
- adaptable to all network conditions
---
title: 'something'
layout: two-cols
---
# watchme
web native real-time media share

available [here](https://git@github.com:devclub1/watchme)

built on:
- TypeScript
- React
- Express
- WebSockets
- **WebRTC**

::right::
<div style="height: 100%; display: flex; justify-content: center; align-items: center;">
  <img src="./assets/logo-watchme.png" />
</div>
---
title: something
layout: image-right
image: https://miro.medium.com/v2/resize:fit:800/0*SuZh9kdJ58G-xtIt.png
---
# what is WebRTC?

<br>

- a free and open-source project that became a web standard
- a collection technologies used together to achieve performant real-time peer-to-peer (P2P) transmissions using UDP
- a global standardization effort
- a pragmatic approach that makes use of preexisting protocols
- a set of APIs that can be used to integrate real-time media exchange in web applications
---
title: something
layout: image-right
image: https://avatars.githubusercontent.com/u/68770129?s=280&v=4
---
# WebRTC for the Curious

<br><br>

- an open-source book created by WebRTC implementers
- available for free forever at [webrtcforthecurious.com](https://webrtcforthecurious.com/)
- the main source of information for this talk
- (yes, I had the same look when I managed to implement my first WebRTC demo)
---
title: something
---
# WebRTC: underlying technologies

<img src="https://webrtcforthecurious.com/docs/images/01-webrtc-agent.png" />
---
title: something
---
# Components & Processes
<br>

The underlying technologies, which represent the fabric of WebRTC, are used in a specific order to exchange real-time media between multiple clients

For a connection to be established, each of these processes must succeed:

- Signaling
  - Media negociation
  - Discovery

- Establishing connection

Let's take a closer look at each of them
---
title: something
layout: image-right
---
# Signaling
finding each other

WebRTC aims to establish a P2P connection between each of the participants

As in all P2P systems, before the connection can be established, a mechanism that allows the peers to find each other is required

Even though it's the first step, *WebRTC does not cover signaling*: each implementer can choose how the peers will discover each other

The most common approach is to use a *WebSocket* server that governs the initial discovery process

-- ceva imagine cu peers
---
title: something
---
# Signaling
exchanging data about data

Signaling starts with an exchange between the peers: one of them will initiate the process by sending an **offer**, while the other, after reviewing the offer, responds with an **answer**

These objects, which are routed through the signaling server, contain all the information required for the peers to understand **what media will be exchanged**

No connection is established for the moment, but if the negociation between the peers does not succeed, the process is dropped

The *offer* and the *answer* are part of the *Session Description Protocol* (SDP) which is used internally by WebRTC
---
title: something
---
# Signaling
a direct path

The peers know what media will be exchanged, but they are not connected yet

Besides the initial process, where a centralized "meeting" point is used, WebRTC uses P2P connections 

The main advantages are:
- Lower latency
- Lower infrastructure costs
- Increased security (as data is not processed by any central server)

The advantages comes with some caveats, as establishing a direct connection between two peers is not a trivial task
---
title: something
layout: two-cols
---
# Signaling
real-world networking issues

Unlike client/server systems, where the server is directly accessible on the internet, peers in P2P connections might not share the same network or have public IP addresses

In such cases, Network Address Translation (NAT) is the key mechanism that enables connections

NAT mapping allows devices on a private network to communicate with other devices on the Internet by translating their private IP addresses into a single public IP address

NAT also makes it possible for external devices to connect to agents in a private network using an already established mapping

::right::
<div style="display: flex">
  <img  src="https://webrtcforthecurious.com/docs/images/03-nat-mapping.png" />
</div>
---
title: something
---
# Signaling
a lot of NATs

NATs come in different flavors, and sometimes they can block peers from establishing a connection

The most important classification describes the mapping creation behaviors, where NATs can be:
  - Endpoint independent - once a mapping is created it can be reused
  - Address/Address and Port dependent mapping - a mapping is created for each connection, targeting a specific address or address and port

The same classification can be applied to mapping filtering behaviors

**For WebRTC to work using P2P, at least one of the peers should have an endpoint-independent mapping**

In case P2P connection is not possible, WebRTC can function in a relayed way
---
title: something
layout: image-right
image: https://www.datocms-assets.com/41207/1645049022-stun.png?w=694&h=694&q=40
---
# Signaling
who am I? (a pragmatic question)


The details about the NAT are not known by the peers

While they can create NAT mappings by sending outbound requests, they are not aware of their own Internet-facing IPs

This is where the Session Traversel Utilities for NAT (STUN) protocol comes into play

To learn more about their external IP, each peer will connect to a STUN server and will receive information about the external IP associated to itself by the NAT

---
title: something
---
# Establishing connection
ICE ICE baby

To establish a connection, WebRTC uses the Interactive Connectivity Establishment (ICE) technology

ICE uses the STUN answer, together with the local IP of the peer, to determine a list of possible addresses that can be used for connection

The candidates are exchanged using the signaling server and ICE starts to group each local candidate with each remote candidate, obtaining multiple *candidate pairs*

ICE tries to establish a connection between the members of each pair, and, based on connectivity and performance, selects a pair that becomes the *selected candidate pair* that will be used for the rest of the session

The peers are now P2P connected, and they can start to exchange media respecting the *offers* that they agreed upon
---
title: something
layout: image-right
image: https://runby.com/system/inserted_images/images/000/000/574/blog_export/TURN2.png?1488875873
---
# Establishing connection
rely on relaying

If a direct connection cannot be established due to the restrictive nature of the NATs, direct ICE connection will fail as well

In this situation, ICE will use the **Traversal Using Relays around NAT (TURN)** protocol to mediate the exchange through a **relay server**

Unlike the STUN server, which does not establish a permanent connection with the peers, the TURN server will receive traffic from each peer and will ensure the correct retransmission

**A robust WebRTC integration should always use TURN as a fallback mechanism**
---
title: something
layout: center
---
# enough talk, show me some code
visiting the main browser WebRTC APIs
---
title: something
layoutClass: gap-12
---
# Capturing user media
<br>

Before exchanging media streams, a client should *capture* them

Most browsers support the standard *Media Capture and Streams API* (MediaStream API) which allows the capture of webcams, screens, device audio and microphones

```js {none|1-2|3-4|all}
// captures webcam and microphone
const capturedUserStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
// captures screen and audio device (currently supported only in Chrome for individual browser tabs)
const captureMediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
```

The user will be prompted for consent for each captured stream

The MediaStream API was developed together with the WebRTC API, so the captured media streams can seamlessly be used as sources in the live media exchange process
