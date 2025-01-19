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
# WebRTC? Why?
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
---
# what is WebRTC?