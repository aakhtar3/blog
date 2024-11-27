---
slug: build-networks-with-vlans
title: Build Networks with VLANs
authors: aakhtar3
tags: [tutorial, security, computerscience, architecture]
image: https://blog.ayyazakhtar.com/assets/images/cover-8f723e970de0fe6ef0966b888cec5c45.png
---

![cover](./cover.png)

| [Why](#why)| [What](#what) | [How](#how)|
|-|-|-|
|1. [Infrastructure](#infra)|2. [Administrator](#admin)        |3. [Game](#game)|
|4. [Laboratory](#lab)|5. [Internet of Things](#iot)|6. [Network Attachment Storage](#nas)|
|7. [Dematerialized Zone](#dmz)|8. [Work](#work)|9. [Guest](#guest)|

<!-- truncate -->

## Why

Having all devices on the same network introduces risk and network congestion. Physically separating devices onto subnets and then bridging them together is complex. Virtual Local Area Networks (VLANs) provide a way to keep all devices on the same physical network, but will logically isolate traffic.

You wouldn’t let strangers take a squat in your home so why should you let rouge devices on your network? Properly identifying which device is who and what are they doing is important to reduce risks. Each device can be identified by it’s Media Access Control (MAC) address and be assigned a static Internet Protocol (IP) address and hostname. You can easily spoof these, but this is a layer in the defense in depth strategy. 

Your firewall will identify VLANs through interfaces and can be used to quickly filter and debug network issues. Grouping devices together into an interface will reduce broadcasts and improve network traffic by splitting into separate lanes [802.1P]. Each interface will have its own firewall rules on ingress and egress traffic. 

There are many risks introduced when using a single Local Area Network (LAN), but here are a few examples.

| Attack  | Risk |
| :-      | :-   |
| Traffic Sniffing | Unencrypted traffic can be read |
| On Path | Man in the middle can be passive or malicious |
| DNS/ARP Poisoning | Corrupted data on important network protocols |
| Internet of Things (IOT) | Devices that have weak security or rouge services |

[802.1P]: https://en.wikipedia.org/wiki/IEEE_P802.1p

## What

[802.1Q] is known as VLAN tagging. Which adds a VLAN ID tag on the data frame. When moving across the network, this frame is tagged and untagged.

Be aware of VLAN hopping attacks, this can be achieved by misconfigured VLAN tables and adding additional VLAN tags on the data frame, but the data can not return in this situation.

![Tagging](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qjdoh5so46irj0hnil9y.gif)
- [networkacademy.io]

[networkacademy.io]: https://www.networkacademy.io/ccna/ethernet/trunk-native-vlan
[802.1Q]: https://en.wikipedia.org/wiki/IEEE_802.1Q
 
## How

The goal of this guide is to learn about different types of networks by building the example network architecture using open source software.

When following this guide, you should work on ONE network at a time. Be patient, patch to latest version of software/firmware, use different web browsers, use commands (ping, ssh, netstat, route), read logs, and restart devices as a last resort.

### Physical and Logical Network Diagram

![Network Diagram](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/64fi792kdaczuln8hmt3.png)

- 14 Networks
  - 1 WAN
  - 1 LAN
  - 8 VLANs
  - 4 PANs
- 4.5 Wireless Frequencies
  - 5.0 GHz Wifi
  - 2.4 GHz Wifi + ZigBee Channel
  - 2.45 GHz Bluetooth
  - 300 GHz Infrared

### INFRA

![Infra](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6hopqts6nakftdc0vmsx.png)

This is your most critical network because it will logically separate your network. You should put physical safeguards on these devices. You can achieve this by storing in a secure location, disabling unused port, and applying MAC address allow lists.

### ADMIN

![Admin](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lonj6hfh4h9slpgs7xy6.png)

This network should be limited to an administrator who will build, monitor, debug, test, and fix the network.

The admin's access should still be limited to a few ports. You can do most task over Ping, HTTP(S), and SSH (SSH Tunneling).

Bluetooth devices such as wireless headphones will create a Personal Area Network (PAN).

### GAME

![Game](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dhgd2gghhdw5f4b2w918.png)

You want to take advantage of prioritizing networks by moving this network to a lower priority using quality of service [802.1P].

Bluetooth controllers are on PAN with the consoles. Infrared remotes also create a PAN with the receiver. 

### LAB

![Lab](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/495y6myl937x5pvv6ju2.png)

This network is physically separated over a distance between four switches. You should have a laboratory (dev) network to test on before making changes on other networks.

### IOT

![IOT](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bs68hnk2haapxygwmkdi.png)

IOT devices should be on 2.4 GHz, since they do not need high data caps and to lower broadcast interference. In addition, these devices can have poor security and can be exploited.

![2.4 GHz](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/slhqjjjmsc6boty0d53j.png)

- 2.4 GHz
- [metageek.com]

[ZigBee] is using the 2.4 GHz frequency, but has multiple channels that overlap Wifi channels. This frequency should be placed on a channel that won't get overpowered from wifi devices.

![ZigBee](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l8c793mg8fbqe7pdqzhv.png)

- ZigBee
- [metageek.com]

[metageek.com]: https://www.metageek.com/training/resources/zigbee-wifi-coexistence/
[ZigBee]: https://en.wikipedia.org/wiki/Zigbee

### NAS

![NAS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l8cx1uepo6ii6exekmub.png)

Data is your Gold (Network Attached Storage (NAS)), so it need to be protected. This is a private network, meaning it has no access to any network, including the internet. Only a few devices should have access to the data ports. To perform updates on the system and software, you can forward proxy the requests through a NAT using filtered allow list of endpoints.

### DMZ

![DMZ](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ijpn1qhdfo9yloapafsc.png)

There are many ways to connect to a dematerialized zone (DMZ) a.k.a screened subnet and one wrong misconfiguration can be disastrous.

This type of network is open to the WAN (Internet). This can be used when you want to host a website, file server, or VPN concentrator.

### WORK

![Work](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zkw6c6q1soke94a73s5x.png)

Sometimes you need to work from home and you should avoid mixing network traffic with your personal network. Your work network should be connected to your works network through a VPN.

### GUEST

![Guest](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3uxw2ecubmg2wckkd68g.png)

Guests will need access to your internet, so having a wifi only connection will serve this purpose.

You can send all egress WAN (Internet) traffic through a VPN. So that you can provide them privacy and prevent your IP address from being associated with their network activity.

## Installation

| [firewall](#firewall) | [dns](#dns) | [siem](#siem) | [wap](#wap) | [TL-1](#tplink-switch) | [TL-2](#tplink-switch) | [TL-3](#tplink-switch)  |
|-|-|-|-|-|-|-|
|10.0.1.1|10.0.1.2|10.0.1.3|10.0.1.4|10.0.1.11|10.0.1.12|10.0.1.13|

### firewall

| | 10.0.1.1 | |
|-|-|-|
| 1. [Specs](#firewall-specs) | 2. [Config](#general-config) | 3. [VLANs](#vlans) |
| 4. [Interfaces](#interfaces) | 5. [DHCP](#dynamic-host-configuration-protocol) | 6. [Aliases](#aliases) |
| 7. [Rules](#firewall-rules) | 8. [Log](#firewall-logs) | 9. [Diagnostics](#diagnostics) |

#### firewall Specs

| Software: [pfSense] | | | | Hardware: [Protectli Vault]  |
| :- | :- | :- | :- | :- |
| Quad Core | 2 Switch Port | AES-NI | 8GB RAM | 120GB mSATA SSD |

- There are many hardware alternatives
- You can also run pfSense on a virtual environment

[pfSense]: https://www.pfsense.org/download/
[Protectli Vault]: https://a.co/d/3Cb1V0C

#### General Config

You should already have pfSense installed and configured on your Local Area Network (LAN) and connected to a Wide Area Network (WAN).

![Setup](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/upgr9otwqy8lj1cg7v7m.png)

- Click General Setup

![Add DNS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dl5a77o6ln1g1sou5tmw.png)

- Add your local DNS

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1r0xfppa8e5pxxnmbmee.png)
- Save

#### VLANs

Add your VLANs with a priority and ID.

![Interface](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ki6hz77dpihuk9wqd78s.png)

- Click Interfaces/Assignments

![Add VLANs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xyj95pi9xrsj2puvlu05.png)

- Add VLANs

![Add Interfaces](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v2cus8t7htuxwzomtnsv.png)

- Add Interfaces

#### Interfaces

You will do this for each interface.

![Edit Interface](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yxe5a9biwtcchf1j5jjq.png)

- Edit Interface

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2ln1sztta86ib114ao1l.png)

- Save

![Apply](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y1mxui0sag62hj54qpam.png)

- Apply

#### Dynamic Host Configuration Protocol

You will need to do this for each interface. This protocol will assign IP address for each VLAN.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jdjtpf0rre551ignkkln.png)

- Click Services/DHCP Server

![Enable DHCP](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fnm9x7rdt5z7arqczcdi.png)

- Enable Dynamic Host Configuration Protocol (DHCP)

![Add DNS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ud0dfg7ff7knrca7p73n.png)

- Add DNS

![Use MAC](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wgj1781pjnkl224ay6ul.png)

- Use MAC address to assign static IP and hostname

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d0g6x8q5v17bz9flkkfn.png)

- Save

#### Aliases

These are used to point to more one or more devices on the the network. These can be edited and applied across all firewall rules.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/akymx5ufom19vhtdy2fp.png)

- Click Firewall/Aliases

![Add IPs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/29ijdkvt9fgtpqqpncnk.png)

- Add IPs

![Add Ports](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o8mbbno59j8t5mw2n192.png)

- Add Ports

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zi9444kbq3j3nsl6c246.png)

- Save

#### Firewall Rules

Rules are stateful (Ingress traffic will be able to return egress traffic with out any rules), read from top to bottom, and have a implicit deny.

![Click Firewall/Rules](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/63w4fwfg1qxh2yazvmc7.png)

- Click Firewall/Rules

##### WAN Rules

Wide Area Network (WAN) is used to connect to remote networks over your ISP or VPN connection.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/836bnbwfbe4fe8l68hgp.png)

- Block Everything by using the implicit deny 

##### Floating Rules

These can be applied across multiple interfaces that share the same logic. The alternative is to add ingress and egress rules for all VLANs, which is prone to errors.

The LAN internal traffic will allow the ADMIN_HOSTS to perform debugging tasks on the LAN by using these protocols (PING, SSH, HTTP, HTTPS). In addition, all LANS on the network will have access to these protocols (DNS, NTP, SYSLOG), which are on the INFRA LAN.

The LAN Egress traffic is set to WAN only. The NAS interface does not have this rule because the data on this network needs to be tightly locked down.

![Add Floating Rules](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n5ci0kxusjzeymftd3ra.png)

- Add Floating Rules

##### Infra Rules

Anti-Lock is added by default to prevent from being locked out. The SIEM (Security Information Event Management) host will be the only host on the entire network to connect to the NAS network Data Ports.

![Add Rules](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y8svddq1wenn4k83jjyl.png)

- Add rule with aliases

##### NAS Rules

![Add Rules](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m38k2jp2k9j962uyzpo0.png)

- Add Rules

##### Route Table

You can run this command on the firewall `netstat -nWr` to see the route table on the firewall.

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dmh5p2sg1v8m2wkgedr0.png)

- Save

#### Firewall Logs

For short term log viewing, you can view from status

![Click Status](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1k15j2267jlf517ue206.png)

- Click Status/System Logs

![Add Filter](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gqbcdwoq8lsd6wdfl2uh.png)

- Add Filter

For long term log viewing, you can send to a SIEM.

![Click Status/System Logs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hvkjlf5ngsz4f9coy49h.png)

- Click Status/System Logs

![Enable](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zdqcwiqg7ksb9d9ld5cl.png)

- Enable

![Add SIEM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x50vnejfppejfb4b9bqj.png)

- Add SIEM
- Save

#### Diagnostics

Use these services to help troubleshoot.

![Click Diagnostics](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kc6vsix4wxlaku87y75j.png)

- Click Diagnostics

![Pftop](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p38xlnuqaoslr40ntm9r.png)

- Type Host IP to see active connections

![States](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vypug1i0rrrmbgdiia9a.png)

- Filter on interface

![Rebooot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o49r9xtko94arv0r3tfy.png)

- Restart if all else fails

### dns

| 10.0.1.2 |
|-|
| 1. [Specs](#dns-specs) |
| 2. [Software](#dns-software)

#### DNS Specs

| Software: [dietpi] | | | | Hardware: [raspberry Pi 3B+]  |
| :- | :- | :- | :- | :- |
| Quad Core | 1 ETH Port  | 4 USB | 1GB RAM | 32GB Micro SD |

[dietpi]: https://dietpi.com/#download
[raspberry Pi 3B+]: https://a.co/d/cl3msmi

#### DNS Software

You can either use a remote DNS servers, but your network will need to make a round trip through the WAN. Local DNS can cache, provide insights on your requests, and filter out request with DNS sink.

![PiHole](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bpurtkjcks9wgddstal8.png)

- [pi-hole](https://pi-hole.net)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sv4gd5occub5g8vmzj6y.png)

- [Adguard](https://ubuntu.com/appliance/adguard/raspberry-pi
)

### siem

| 10.0.1.3 |
|-|
| 1. [Specs](#siem-specs) |
| 2. [Software](#siem-software)

#### SIEM Specs

| Software: [macOS] | | | | Hardware: [Mac Mini M1]  |
| :- | :- | :- | :- | :- |
| 8 Core | 1 ETH Port  | 4 USB | 16 GB RAM | 256 SSD |

[macOS]: https://www.apple.com/macos/ventura/
[Mac Mini M1]: https://a.co/d/608Y3Zu

#### Siem Software

This device will collect logs and metrics from the network and use this data to trigger events. There's a lot on this topic, so I do a separate write up and update at a later point.

##### [GrayLog]

[GrayLog]: https://go2docs.graylog.org/5-0/downloading_and_installing_graylog/docker_installation.htm

Using docker compose you can run a local installation of the application. 

```yml
version: '3'
services:
  # MongoDB: https://hub.docker.com/_/mongo/
  mongo:
    image: mongo:5.0.13
    networks:
      - graylog
  # Elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/7.10/docker.html
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch-oss:7.10.2
    environment:
    - http.host=0.0.0.0
    - transport.host=localhost
    - network.host=0.0.0.0
    - "ES_JAVA_OPTS=-Dlog4j2.formatMsgNoLookups=true -Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    deploy:
      resources:
        limits:
         memory: 1g
    networks:
      - graylog
  # Graylog: https://hub.docker.com/r/graylog/graylog/
  graylog:
    image: graylog/graylog:5.0
    environment:
      # CHANGE ME (must be at least 16 characters)!
      - GRAYLOG_PASSWORD_SECRET=somepasswordpepper
      # Password: admin
      - GRAYLOG_ROOT_PASSWORD_SHA2=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
      - GRAYLOG_HTTP_EXTERNAL_URI=http://127.0.0.1:9000/
    entrypoint: /usr/bin/tini -- wait-for-it elasticsearch:9200 --  /docker-entrypoint.sh
    networks:
      - graylog
    restart: always
    depends_on:
      - mongo
      - elasticsearch
    ports:
      # Graylog web interface and REST API
      - 9000:9000
      # Syslog TCP
      - 514:514
      # Syslog UDP
      - 514:514/udp
      # GELF TCP
      - 12201:12201
      # GELF UDP
      - 12201:12201/udp

networks:
  graylog:
    driver: bridge
```

![Add Input](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0qhqdocc6uq95m8hyocb.png)

- Add input

![Syslog](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q7pmdzlaa1y6q1igmi18.png)

- Syslog

![Port 514](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3wbh8iv3bnmwtd9j8q4n.png)

- Port 514

##### [Grafana]

[Grafana]: https://grafana.com/grafana/dashboards/5420-pfsense-graylog/

![Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ax9agezz1o5jgptc5ql7.png)

- Use Graylog data to visualize on dashboard

##### [Wireshark]

[Wireshark]: https://www.wireshark.org/#download

Use this for packet capturing on a particular interface.

![Wireshark](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9wjgtmomdtufulwrwvpj.png)

### wap

| | 10.0.1.4 | | 
|-|-|-|
| 1. [Specs](#wap-specs) | 2. [Administration](#administration) | 3. [Config](#basic-config) |
| 4. [Services](#wap-services) | 5. [Wireless](#wap-wireless) | 6. [Security](#wap-security) |
| 7. [VLAN](#wap-vlan) | 8. [Networking](#wap-networking) | 9. [Debug](#wap-debug) |

Make sure you are on the latest firmware to enable this feature. Use Firefox or chrome.

There are 2 different frequencies to understand.

##### 5.0 GHZ

Provide higher speeds, has multiple channels to use, and radio waves dissipate in shorter distances. 

##### 2.4 GHZ

Can provide reasonable speeds for IOT devices, has 3 usable channels in the USA, and radio waves can travel further distances.

#### wap Specs

| Software: [dd-wrt] | | | | Hardware: [linksys wrt3200acm]  |
| :- | :- | :- | :- | :- |
| Dual Core | 4 Switch Port  | 2 USB | 802.11a/b/g/n/ac | 4 Dual-Band Antennas |

- There are many hardware alternatives
- The WAN port will be untagging the INFRA network to access admin console
- The LAN port will be carrying the tagged traffic
- Once VLANS are set up, you can remove WAN port and plug into LAN

[dd-wrt]: https://download1.dd-wrt.com/dd-wrtv2/downloads/betas/
[linksys wrt3200acm]: https://a.co/d/9bAPfvt

#### Administration

![Management](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2s9n41h1mfurgykwscp6.png)

- Click Administration/Management

![Protocols](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g6lqm347qv7qstp9y9l6.png)

- Enable Protocols

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/subiwp3weh6u3p92v7bl.png)

- Save

#### Basic Config

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5p2znqiz0p3u66g65hxf.png)

- Click Setup/Basic Setup

![Disable WAN](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/52hfrew10b6brjueh7xe.png)

- Disable WAN

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hiafvt5dwqb0td12idwk.png)

- Assign IP information
- Disable DHCP

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/subiwp3weh6u3p92v7bl.png)

- Save

#### wap Services

![Click Services/Services](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kn09hmfv20hqsvk2ug8v.png)

- Click Services/Services

![Disable Services](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/70vn99k32wspifanlpsw.png)

- Disable Services

![SSH](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8r68zl12nd0s6pul77xv.png)

- Enable SSH

![Syslog](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pw7ma462optpk7qwljbt.png)

- Enable Syslog

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/subiwp3weh6u3p92v7bl.png)

- Save

#### wap Wireless

Your wireless connection might be different.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ybngcerv88rikqnhzqyz.png)

- Click Wireless/Basic Setting

![Add 5.0 GHZ Virtual Access Points](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hsf9i26pv90zw7v05jja.png)

- Add 5.0 GHZ Virtual Access Points

![Add 2.4 GHZ Virtual Access Points](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/51lgl7wxtjvxsxp3t1n4.png)

- Add 2.4 GHZ Virtual Access Points

![Disable Mixed Connection](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gcswjpczftyt9kkuim9y.png)

- Disable Mixed Connection

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/subiwp3weh6u3p92v7bl.png)

- Save

#### wap Security

![Click Wireless/Wireless Security](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5mnecx53rt6aqrutymi5.png)

- Click Wireless/Wireless Security

![Set Mode](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ja406gnpyt9d3ovsujdp.png)

- Set Mode

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/subiwp3weh6u3p92v7bl.png)

- Save

#### wap VLAN

You will need to use 2 ports on wap (WAN and LAN) when configuring your VLANs. You can use one, but you will be unplug and plug between these interfaces. Once configuration is complete you will only need to connect LAN port, but you will lose access to the router console.

![Click Setup/Switch Config](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6tgc8xu9yc06qsjvdq07.png)

- Click Setup/Switch Config

![Table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yj6rhb3cv9qtihhpwcpf.png)

- Configure your VLAN Table

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/subiwp3weh6u3p92v7bl.png)

- Save

#### wap Networking

![Click Setup/Networking](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/36xgfl764cfhyr6jlhi4.png)

- Click Setup/Networking

![Add Bridges and map to your VLANs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/egjxsz7c2cfsw2obt5vd.png)

- Add Bridges and map to your VLANs

![Save](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/subiwp3weh6u3p92v7bl.png)

- Save

#### wap Debug

Use the SIEM to read SYSlogs and Wireshark to analyze traffic

![Reboot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qkjh07hgho24wl0l1r35.png)

- Reboot if all fails

### [TPLink Switch]
[TpLink Switch]: https://a.co/d/aK6GsXL

These switch help expand the network by carrying VLAN IDs. You will enable VLANS and set PVIDs through the admin console.

![802.1Q](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2wpviihyk3k9bzhyyjui.png)

- 802.1Q

![Enable](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vhxikl6jqrvyo5wwfi8s.png)

- Enable

![PVID](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vq9astwrvonlxn8p0slc.png)

- Use when a port needs to be untagged and allow DHCP to assign IPs for that VLAN


### TL-1

#### 10.0.1.11

![VLAN Table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qacxhez3vkjpq0z2vbu1.png)

- VLAN Table

![PVID](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6zec5t9f2tcn3s3tl4x7.png)

- PVID

### TL-2

#### 10.0.1.12

![VLAN Table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vkc0151fms6qeltkdloc.png)

- VLAN Table

![PVID](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/274afs6li3rwulcwhveg.png)

- PVID

### TL-3

#### 10.0.1.13

![VLAN Table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hm87j9mne1iybo50d2pc.png)

- VLAN Table

![PVID](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mwt2e3887qntpk4bvx65.png)

- PVID
