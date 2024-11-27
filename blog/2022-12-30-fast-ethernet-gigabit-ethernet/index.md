---
slug: fast-ethernet-gigabit-ethernet
title: Fast Ethernet -> Gigabit Ethernet
authors: aakhtar3
tags: [tutorial, performance, computerscience, productivity]
image: https://blog.ayyazakhtar.com/assets/images/cover-b35572b89cab55178f8a581a54a60f84.jpg
---

![cover](./cover.jpg)

|  |  |  |
|:-|:-|:-|
|[1. Identify the Problem](#1-identify-the-problem)|[2. Develop a Theory](#2-develop-a-theory)|[3. Test the Theory](#3-test-the-theory)|
|[4. Plan of Action](#4-plan-of-action)|[5. Implement the Solution](#5-implement-the-solution)|[6. Verify System Functionality](#6-verify-system-functionality)|
||[7. Document the Issue](#7-document-the-issue)||

<!-- truncate -->

I wanted to hard wire all of my devices on my Local Area Network using Ethernet. I noticed one of my connections was much slower than expected and wanted to fix it. This write up goes over the 7 steps that a network administrator should use to troubleshoot network issues.

| Terms            | Definition  |
| ---------------- | ----------- |
| Fast Ethernet    | 100 Megabits per second  |
| Gigabit Ethernet | 1000 Megabits per second |
| Half Duplex      | Transmit data in one direction at a time |
| Full Duplex      | Transmit data in two directions at the same time |
| ISP              | Internet Service Provider |
| VPN              | Virtual Private Network   |
| WAN              | Wide Area Network         |
| LAN              | Local Area Network        |

# 1. Identify the Problem

![100/Full](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lkctorrbmyjuah9d1afe.png)

- [TP-Link 5 Port Gigabit Switch] identifies port as `100 Mbps Full duplex`

![92 Mbps](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9awuasbvnuzzf0r4vd2b.png)

- [fast.com] test shows 92 Mbps

# 2. Develop a Theory

![Network Diagram](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oh0zyxp4vfd4isdyi7aw.png)

- [Cat5e] cable is damaged or misconfigured

# 3. Test the Theory

![New connection](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7m0viskh39n0nfqcg16w.png)

- Use another wire and connection

# 4. Plan of Action

![Tools](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8jtfhe4rf6otwj7dchhz.jpg)

- Fix [Cat5e] Ethernet with a [Network Tool Kit]

![Correct](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ju776zsdc383l77ioepo.png)

- Update Male [Cat5e] Ethernet Jack

![Keystone Jack](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hsb6fbxsup79xpw3hgz6.jpg)

- Update Female [Ethernet Keystone Jack]

# 5. Implement the Solution

## Update [Cat5e] Ethernet Jack

![Crimping tool](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8fce6metkq4woqf62pye.jpeg)

- Use crimping tool 

![Cut Ethernet](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gu90v665u6k5kwfm8uug.jpg)

- Cut Male [Cat5e] Ethernet jack

![Expose Wires](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t3fgaor4dtprrtcdgnso.jpg)

- Expose Wires

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ht9slpo9p2bykcbnv920.jpg)

- Inspect wiring arrangement

![Wire stripping knife](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mre3pnlabmawe5xq2eaz.jpg)

- Use wire stripping knife

![Cut covering](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7xtkt2xmcyudh6lpyjhg.jpg)

- Cut covering

![Remove covering](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lpi15m39bgtjfr8yu9b5.jpg)

- Remove covering

![Separate Wiring](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/98yief3a9fljgc2zs328.jpg)

- Separate wire pairing

![Insert wires into RJ45](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3c6k00vu3eyzu44e133j.jpg)

- Insert wires into RJ45

![Tighten wires](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j5rvehhte87rnatraj8u.jpg)

- Tighten wires with crimping tool RJ45 slot 

## Update [Ethernet Keystone Jack]

![Punchdown tool](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zgtr4olsqfi5uzl6phl0.jpeg)

- Use Punchdown tool

![Trim](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6g1yxdw0my4z9egsqe3b.jpg)

- Push down into Female [Ethernet Keystone Jack] and trim exposed wires

![Right](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hqk3lqsfbkju6vae3647.png)

- Use B layout

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4unvd8c02vu4ductjsbv.png)

- Use B layout

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i51qiov02yt2in6unheh.jpg)

- Install on wall plate

# 6. Verify System Functionality

![1000/Full](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qiro43i01atcmi800bbc.png)

- [TP-Link 5 Port Gigabit Switch] identifies port as `1000 Mbps Full duplex`

![220 Mbps](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wy9wyeysnw2j2bah8r9u.png)

- [fast.com] test shows 220 Mbps
- In theory, I should get higher speed if I purchase more bandwidth from my ISP

# 7. Document the Issue

This write up is the documentation and is intended for sharing on the public internet

[TP-Link 5 Port Gigabit Switch]: https://a.co/d/ak0LMJt
[fast.com]: https://fast.com/
[Cat5e]: https://a.co/d/271M8AH
[Network Tool Kit]: https://a.co/d/3aFyMJh
[Ethernet Keystone Jack]: https://a.co/d/248yeLW