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
<h2>start <span class="blinking">:</span> here</h2>

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

<style>
.blinking {
  animation: blink 2s infinite;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>

---
title: Personal Intro
layout: image-right
image: ./assets/headshot.jpeg
---

# hello, I'm @axbg

<br><br><br><br>

- 👨🏻‍💻 Software Engineering Specialist @ Accenture
- 🧑🏻‍💼 Technical Trainer @ Devmind
- 🧑🏻‍🏫 Teaching Assistant @ CSIE ASE

<br><br><br><br>
<br><br>

Find my open-source projects on GitHub: @axbg
<br>
Check my articles: [encapsulated.axbg.cloud](https://encapsulated.axbg.cloud)

---
title: Talk Intro 1
layout: default
---
# Why did this talk happen?

<br><br>

<div v-click style="display: flex; justify-content: center">
  <img src="./assets/mail.png" height="200px">
</div>

---
title: Talk Intro 2
layout: default
---
# Why did this talk happen?

<div style="display: flex; justify-content: center">
  <img src="https://secure.meetupstatic.com/photos/event/d/a/7/e/600_523855934.webp?w=384">
</div>

---
title: WebRTC? How come?
layout: image-right
image: https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
# WebRTC? How come?
<br><br>

<v-clicks>

- Teaching stuff is cool, but you have to talk a lot
- Talking is (often) boring (for the listener)
- You have to **present** something for the audience to, **hopefully**, get less bored
- So, most of the time, you will use a **projector** to share some kind of **content**

</v-clicks>

---
title: yes, but
---
# yes, but

### what do you do if you encounter something like this in 2025?

<div v-click style="display: flex; justify-content: center">
  <img src="https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F6659557-01" />
</div>

---
title: yes, but 2
---
<br>
<div v-click style="display: flex; justify-content: center;">
  <img src="./assets/crush.png" />
</div>
---
title: How to solve this problem?
layout: center
---
# How to solve this problem?

<v-clicks>

- the most reasonable solution: buy an adapter
- the next most reasonable solution: use Zoom
- my (not so reasonable) solution: **build an app**

</v-clicks>

---
title: dream app
layout: image-right
image: https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
# my dream app
<br>

The plan is to build an application that I can use to share my screen seamlessly

The application should be:

<v-clicks>

- easy to build
- easy to deploy 
- working on various clients
- adaptable to all network conditions

</v-clicks>

---
title: watchme demo
layout: two-cols
---
# watchme
web native real-time media share

available [here](https://git@github.com:devclub1/watchme)

built on:
- TypeScript
- React
- Express
- Socket.IO (WebSockets)
- **WebRTC**

::right::
<div style="height: 100%; display: flex; justify-content: center; align-items: center;">
  <img src="./assets/logo-watchme.png" />
</div>
---
title: What is WebRTC?
layout: image-right
image: https://miro.medium.com/v2/resize:fit:800/0*SuZh9kdJ58G-xtIt.png
---
# what is WebRTC?

<br>

- a free and open-source project that became a web standard
- a collection of technologies used together to achieve performant real-time peer-to-peer (P2P) transmissions using UDP
- a global standardization effort
- a pragmatic approach that makes use of preexisting protocols
- a secure-by-default way to exchange real-time media
- a set of APIs that can be used to integrate real-time media exchange in web applications
---
title: WebRTC for the Curious
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
title: Underlying technologies
---
# WebRTC: underlying technologies

<div style="display: flex; justify-content: center">
  <img width="80%" src="https://webrtcforthecurious.com/docs/images/01-webrtc-agent.png" />
</div>
<!--
SCTP: Stream Control Transmission Protocol
DTLS: Datagram Transport Layer Security
SRTP: Secure Real-time Transport Protocol
RTCP: Real Time Control Protocol
RTP: Real Time Protocol
-->
---
title: Components & processes
---
# Components & processes
<br>

<v-clicks>

The underlying technologies, which represent the fabric of WebRTC, are used in a specific order to exchange real-time media between two clients

For a connection to be established, each of these processes must succeed:

- Signaling
  - Media negotiation
  - Discovery
- Establishing connection

Let's take a closer look at each of them

</v-clicks>
---
title: Signaling 1
layout: image-right
image: https://img.freepik.com/free-photo/hands-gently-touching-each-other_23-2147795505.jpg?t=st=1737568796~exp=1737572396~hmac=afdfbb0f8d3e9db08214d4b3fdb4d3919c8b8650f63a705b39f693743ee9a27d&w=900
---
# Signaling
finding each other

<v-clicks>

WebRTC aims to establish a P2P connection between two participants (we'll call them **peers**)

As in all P2P systems, before the connection can be established, a mechanism that allows the peers to find each other is required

Funny enough, even though it's the first step, **WebRTC does not cover signaling**: each implementer can choose how the peers will discover each other

The most common approach is to use a *WebSocket* server that governs the initial discovery process

</v-clicks>

---
title: Signaling 2
---
# Signaling
exchanging data about data

<v-clicks>

Signaling starts with an exchange between the peers:
- one of them will initiate the process by sending an **offer**
- after reviewing the offer the other one responds with an **answer**

These objects, which are exchanged through the signaling server, contain all the information required for the peers to understand **what type of media will be streamed**

No connection is established at the moment, but if the negotiation between the peers does not succeed, the process is dropped

The *offer* and the *answer* are part of the *Session Description Protocol* (SDP) which is used internally by WebRTC

</v-clicks>
---
title: Signaling 3
---
# Signaling
a direct path

<v-clicks>

The peers know what media will be exchanged, but they are not connected yet

Besides the initial process, where a centralized "meeting" point is used, WebRTC aims to use P2P connections 

The main advantages are:
- Lower latency
- Lower infrastructure costs
- Increased security (as data is not processed by any central server)

The advantages come with some caveats, as establishing a direct connection between two peers in a huge network like the Internet is not a trivial task

</v-clicks> 

---
title: Signaling 4
layout: two-cols
---
# Signaling
real-world networking issues

<v-clicks>

Unlike the more common client/server systems, where the server is directly accessible on the Internet, peers in P2P connections might not share the same network or have public IP addresses

In such cases, Network Address Translation (NAT) is the key mechanism that enables connections

NAT mapping allows devices on a private network to communicate with other devices on the Internet by translating their private IP addresses into a public IP address

NAT also makes it possible for external devices to connect to agents in a private network using an existing mapping

</v-clicks>

::right::
<div style="display: flex; height: 80%;justify-content: center">
  <img  src="https://webrtcforthecurious.com/docs/images/03-nat-mapping.png" />
</div>
---
title: NATs
---
# The world is NATs

<v-clicks>

NATs come in different flavors, and sometimes they can block peers from establishing a connection

The most important classification describes the mapping creation behaviors, where NATs can be:
  - Endpoint independent - once a mapping is created it can be reused
  - Address/Address and Port dependent mapping - a mapping is created for each connection, targeting a specific address or address and port

The same classification can be applied to mapping filtering behaviors

**For WebRTC to work using P2P, at least one of the peers should have an endpoint-independent mapping**

In case P2P connection is not possible, WebRTC can still function using a relay server

</v-clicks> 

---
title: Signaling 
layout: two-cols
---
# Signaling
who am I? (a pragmatic question)

<v-clicks>

The details about the NAT are not known to the peers

While they can create NAT mappings by sending outbound requests, they are not aware of their own Internet-facing address

This is where the Session Traversel Utilities for NAT **(STUN)** protocol comes into play

To learn more about their external IP, each peer will connect to a STUN server and will receive information about the external IP mapping done by NAT

</v-clicks> 

::right::
<div style="display: flex; justify-content: center; align-items: center; height: 100%;">
  <img src="https://www.datocms-assets.com/41207/1645049022-stun.png?w=694&h=694&q=40" />
</div>

---
title: Establishing connection
---
# Establishing connection
ICE ICE baby

<v-clicks> 

To establish a connection, WebRTC uses the Interactive Connectivity Establishment (ICE) technology

ICE uses the STUN answer, together with the local IP of the peer, to determine a list of possible addresses that can be used for connection

The candidates are exchanged using the signaling server and ICE starts to group each local candidate with each remote candidate, obtaining multiple *candidate pairs*

ICE tries to establish a connection between the members of each pair, and, based on connectivity and performance, selects a pair that becomes the *selected candidate pair* that will be used for the rest of the session

The peers are now P2P connected, and they can start to exchange media respecting the *offers* that they agreed upon

<div style="display: flex; justify-content: center;">
  <i style="font-size: 5rem">🔗</i>
</div>

</v-clicks>

---
title: Establishing connection 2
layout: two-cols
---
# Establishing connection
rely on relaying

<v-clicks>

If a direct connection cannot be established due to the restrictive nature of the NATs, a direct ICE connection will fail as well

In this situation, ICE will use the **Traversal Using Relays around NAT (TURN)** protocol to mediate the exchange through a **relay server**

Unlike the STUN server, which does not establish a permanent connection with the peers, the TURN server will receive traffic from each peer and will ensure the correct retransmission

**A robust WebRTC integration should always use TURN as a fallback mechanism**

</v-clicks>

::right::
<div style="display: flex; justify-content: center; align-items: center; height: 100%;">
  <img src="https://runby.com/system/inserted_images/images/000/000/574/blog_export/TURN2.png?1488875873" />
</div>

---
title: enough talk, show me the code
layout: center
---
# enough talk, show me some code
visiting the main browser WebRTC APIs
---
title: something
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

Each track can receive as parameter an object representing the [*constraints*](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) that should be applied
---
title: something
---
# Preparing connection
peers and stream

Then, the initiating client is ready to create a peer instance
```js {none|1-4|5|all}
// the configuration object is used to configure the ICE process
// in a simple implementation, it just specifies which STUN/TURN servers to use
//  in more complex implementations, the configuration object can define additional options: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection
const configuration = {'iceServers': [{'urls': ['stun:stun.l.google.com:19302', 'turn:TURN_IP:3478[user:password]']}]}
const peerConnection = new RTCPeerConnection(configuration);
```

Before creating an offer, the peer instance should be instructed how to handle upcoming connections

The order in which these configurations are written is not important, as they will be used only after the offer is sent

First thing could be to bind the captured user media stream to the peer instance
```js {none|all}
capturedUserMedia.getTracks().forEach(track => {
  // the type of each added track can be determined by the 'kind' property (e.g: video, audio)
  // if the tracks are associated with a stream instance, WebRTC will handle them together
  peerConnection.addTrack(track, capturedUserMedia);
});
```
---
title: something
---
# Preparing connection
handling events

Each WebRTC interaction is handled in an event-like manner: each peer will do an action, while the other will specify ahead of time it's behavior for each important event

So, the peer should be instructed what to do when it receives tracks from the remote peer
```js {none|all}
peerConnection.ontrack = (event) => {
  // even though individual tracks are received, we are referencing to the stream
  // this way, both video and audio tracks could be handled by the same video HTML element
  videoElement.srcObject = event.streams[0];
};
```

When the offer is created, WebRTC will start gathering ICE candidates and will send each one of them to the connecting peer through the signaling server
```js {none|all}
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    // generic method that will rely on the signaling server
    sendToSignalingServer(event.candidate)
  }
}};
```
---
title: something
---
# Preparing connection
#

Each peer is informed each time the state of the upcoming connection will change
```js {none|1|3,5,7,9|all}
peerConnection.onconnectionstatechange = () => {
  switch (peerConnection.connectionState) {
    case "connected":
      //...
    case "disconnected":
      //...
    case "closed":
      //...
    case "failed":
      //...
}}
```
Now, the initiating peer is ready to create an offer, bind it to itself and send it to the other peer through the signaling server
```js {none|1|2-5|7|all}
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);

sendToSignalingServer(offer);
```
---
title: something
---
# Accepting an offer
#

When an offer arrives, the receiving end creates its own peer instance, following a very similar set of steps, it accepts the offer and sends back the answer
```js {none|1|2-6|8|10-11|13|all}
webSocket.on("receiving-offer", async (payload) => {
  const peerConnection = new RTCPeerConnection(configurations);

  // ...
  // setting up its event handlers
  // ...

  peerConnection.setRemoteDescription(payload.offer);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  sendToSignalingServer(answer);
})
```
---
title: something
---
# Breaking the ICE
#

The only thing that was not covered in the previous example is receiving  of ICE candidates

Besides gathering and sending its own ICE candidates to the signaling server, each peer should prepare to receive the ICE candidates of the opposite side
```js {none|1|2-4|all}
webSocket.on("ice-candidate", (payload) => {
  peerConnection.addIceCandidate(new RTCIceCandidate(payload.candidate))
    .then(() => console.log("Added ICE candidate from viewer", payload.candidate))
    .catch(error => console.error("Error adding ICE candidate:", error));
});
```

Starting with the first candidate that arrives, WebRTC starts to create and test all the possible **pairs**

Once the best pair is found, the connection state is promoted to **connected** and the negociated streams are exchanged P2P

<div v-click style="display: flex; justify-content: center">
  <p style="font-size: 5rem">🎆</p>
</div>

---
title: something
---
# Renegotiation
#     
It happens frequently for the peers to want to remove some media tracks or add new ones after the connection is established

For soft removal, a solution is to disable, keeping the option to enable it again later
```js {none|1|2|all}
if (captureUserMedia && capturedUserMedia.getVideoTracks().length > 0) {
  capturedUserMedia.getVideoTracks()[0].enabled = false;
}
```

Adding or removing tracks trigger the renegotiation process which should establish a new pair of offer and answer
```js {none|1|2-5|8|all}
peerConnection.onnegotiationneeded = () => {
  const offer = await peerConnection.createOffer();
  // make sure to reuse the existing peer on both ends
  await peerConnection.setLocalDescription(offer);

  sendToSignalingServer(offer);
}
// modify the media tracks associated with the peerConnection to trigger the renegotiation
```

By default, the ICE connection will not be modified, but a peer can request that by toggling the **iceRestart** parameter


---
title: debugging
---
# Renegotiation
On the receiving end, the peer should also be reused, as most of the times the process will happen seamlessly, in the background, without triggering a request for a new connection

```js {none|1|2-5|8|all}
webSocket.on("receiving-offer", async (payload) => {
  if (peerConnection) {
    peerConnection.setRemoteDescription(payload.offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    sendToSignalingServer(answer);
  } else {
    peerConnection = new RTCPeerConnection(configurations);
    // the rest of the configuration discussed above
  }
}
```

Renegotiation can be triggered by both ends, and when both ends emit an offer at the same time, the ICE state machine could be upset

This is known as the **glare problem** and there are [a ways to handle it beautifully](https://blog.mozilla.org/webrtc/perfect-negotiation-in-webrtc/)

---
title: debugging
---
# Watching data flow (and debugging it)

Most browsers offer similar interfaces for viewing and debugging active and recently closed WebRTC connections

For Chromium-based browsers: chrome://webrtc-internals/

For Firefox: about:webrtc

- imagine webrtc internals
---
title: tools
---
# Useful resources

- The book: https://webrtcforthecurious.com/
- Mozilla's WebRTC API documentation: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
- Find out your NAT type: https://www.checkmynat.com/
- Public STUN servers: https://gist.github.com/mondain/b0ec1cf5f60ae726202e
- How to set up a TURN server using coturn: https://gabrieltanner.org/blog/turn-server/
- coturn configuration example: https://gist.github.com/axbg/c947f838387998d81664036a7beb3c27
- Find your ICE candidates: https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/
---
title: tools
---
# Facetime, but with (way) less features
demo time

To showcase the concepts described during the session, I built an app 

It allows a *couple* of users to join a live session where they have the option to share both their webcam and microphone

A user will initiate a room and will receive a randomly generated ID that should be used by the other users to join the same room

The app is built using:
- React
- Express
- Socket.io (WebSocket)
- **WebRTC**

(if you think that's because I reused a lot of code from *watchme* that's because it's true)
---
title: tools
layout: center
---
# the *problem* in the room
---
title: tools
---
# P2P limitations

P2P has a lot of benefits, but one important caveat: it does not scale well

The previous example could handle a small group of people, but after a dozen, the number of parallel connections becomes unmanageable

Each user has handle n-1 connections, and the total number of connections can be computed as n * (n - 1) / 2

This is the reason why, in order to build robust real-time media applications, P2P is often not enough

To solve this issue, in addition to pure P2P topologies (seen below), WebRTC also supports client/server topologies to overcome some of the caveats

<br>

<div style="display: flex">
  <div>
    <img src="https://webrtcforthecurious.com/docs/images/08-one-to-one.png" />
    <span>One-to-one</span>
  </div>
    <div>
    <img src="https://webrtcforthecurious.com/docs/images/08-full-mesh.png" />
    <span>Full Mesh</span>
  </div>
    <div>
    <img src="https://webrtcforthecurious.com/docs/images/08-hybrid-mesh.png" />
    <span>Hybrid Mesh</span>
  </div>
</div>
---
title: tools
---
# Client/Server topologies

- Selective Forward Unit (SFU) 
<div style="display: flex">
  <img src="https://webrtcforthecurious.com/docs/images/08-sfu.png" />
</div>

<br>
- Multi-point Conferencing Unit (MCU 🦸‍♂️)
<div style="display: flex">
  <img src="https://webrtcforthecurious.com/docs/images/08-mcu.png" />
</div>

---
title: tools
---
# One more thing

- Although WebRTC is well known for media transmission, it can also be used to transmit raw data using a **DataChannel**

- A DataChannel can handle any data, and can be used to transmit raw media in situations when specialized decoding methods are needed

- Each peer can handle 65534 DataChannels, and they can be opened and closed at any time, as negotiation is not needed

- The other steps of the connection process are the same

```js {none|1|3|5|7-9|all}
const peerConnection = new RTCPeerConnection(configurations);

// establish connection

const dataChannel = pc.createDataChannel("channel1");

dataChannel.onMessage = (message) => { }
dataChannel.onopen = () => { }
dataChannel.onclose = () => { }
```

---
title: tools
layout: center
---
# that's it!
WebRTC in a not-so-short-nor-exhaustive intro
---
title: tools
layout: center
---
# thank you for being here

<div style="color: #2c7a7b; position: absolute; left: 50%; transform: translate(-50%, 0);">
  <h2>Q&A</h2>
</div>

<div style="color: #2c7a7b; position: absolute; left: 0; bottom: 0; margin-left: 10px;">
  <span>Sibiu Web Meetup</span>
</div>

<div style="color: #2c7a7b; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%)">
  <span>January 2025</span>
</div>

<div class="abs-br m-0 text-xl" style="color: #2c7a7b">
  <span>axbg</span>
  <a href="https://github.com/axbg" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>
