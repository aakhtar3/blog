---
slug: build-multi-cloud-&-hybrid-networks
title: Build multi-cloud & hybrid networks
authors: aakhtar3
tags: [networking, cloud, security, tutorial]
image: https://blog.ayyazakhtar.com/assets/images/cover-695e55483e1629b9485a4cfc89c20cbe.png
---

![cover](./cover.png)

## Goals

The purpose of this guide is to create four distributed networks and combine them into one highly available logically connected network.

- Build with the top three cloud vendors ([aws.amazon.com], [azure.microsoft.com], [cloud.google.com]) and one On-Premise ([pfsense.org]) network
- Scale [Mesh] network topology to allow additional point-to-point connections
- Dynamic routing between Autonomous Systems ([AS]) using Border Gateway Protocol ([BGP])
- Encrypt network traversal over Virtual Private Network (VPN) tunnels using Internet Protocol Security ([IPSec])

[aws.amazon.com]: https://aws.amazon.com
[azure.microsoft.com]: https://azure.microsoft.com
[cloud.google.com]: https://cloud.google.com
[pfsense.org]: https://pfsense.org

[Mesh]: https://www.computerhope.com/jargon/m/mesh.htm
[AS]: https://en.wikipedia.org/wiki/Autonomous_system_(Internet)#:~:text=An%20autonomous%20system%20(AS)%20is,routing%20policy%20to%20the%20Internet.
[BGP]: https://www.cloudflare.com/learning/security/glossary/what-is-bgp/
[IPSec]: https://www.geeksforgeeks.org/ip-security-ipsec/

|[AWS](#aws)|[Azure](#azure)|[CGP](#gcp)|[PFSense](#pfsense)|
|:-:|:-:|:-:|:-:|
|[Network](#network)|[VNET](#vnet)|[VPC](#vpc)|[VLAN](#vlan)|
|[Gateway](#gateway)|[VWAN](#vwan)|[NCC](#network-connectivity-center)|[ISP](#isp)|
|[DNS](#dns)|[Private Resolver](#private-resolver)|[Cloud DNS](#cloud-dns)|[Pihole](#pihole)|
|[S2S](#site-to-site)|[Connection](#connection)|[Peer VPN](#peer-vpn)|[IPSec](#ipsec)|
|[SSM](#ssm)|[Azure vm](#azure-vm)|[GCP vm](#gcp-vm)|[Mac](#mac)|

<!-- truncate -->

## Network

![4 Network](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q7wp1jzytvr8btja9yul.png)

- Final mesh network topology architecture

## AWS

![AWS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/697l12huib89i2ofgeth.png)

### Network

![VPC](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zmju7bcyhseef1la2217.png)

- Create a Virtual Private Cloud Network in AWS

![VPC config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bouldzfosi9m03ptyerh.png)

![VPC config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/falc4m92wrcynjzz9nrb.png)

|||
|:-:|:-:|
|Resource to Create|VPC and more|
|Name|vpc-aws|
|IPv4 CIDR block|172.16.11.0/24|
|Num of AZs|2|
|Public|0|
|Private|2|
|NAT|None|
|Endpoint|None|

### Gateway

![Gateway](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zj86i09i940cj3c316i8.png)

- Identify the IP address of the ISP
- Point to Point Identification and traffic passthrough

#### Customer Gateway

![Customer Gateway](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7tkbbt0ee03g7nscicn3.png)

|||
|:-:|:-:|
|Name|pfsense|
|BGP ASN|65000|
|IP address|4.4.4.4|

#### Transit Gateway

![Transit Gateway config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w6d76bu8jt1t382hunjl.png)

![Transit Gateway config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hf6wo5k1kqu0zjqyot8d.png)

|||
|:-:|:-:|
|Name|tg-aws|
|Description|tg-aws|
|ASN|64512|

#### Route Table

![Update Route Table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9fd5549wyk1ktmyjuuxb.png)

- Update routes to TGW

### DNS

![DNS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8bpgftevhb2v9zpwsy0d.png)

- AWS will dedicate a reserved IP address x.x.x.2 for a VPC resolver
- Outbound Endpoints will allow you to forward DNS requests for resolvers on other networks
- Inbound Endpoints will allow resolvers on other networks to forward requests to AWS

#### Outbound Endpoint

![Outbound Endpoint config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g3k1lc38zpglx389culp.png)

![Outbound Endpoint config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0mhog1yl8k4hq9n6mbe0.png)

![Outbound Endpoint config-c](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h6kui5ocwmrkraravdld.png)

![Outbound Endpoint config-d](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ozz91frj9shmpaqqxxcd.png)

|||
|:-:|:-:|
|Endpoint Name|oe-aws|
|VPC|vpc-aws-vpc|
|Security Group|Default|
|Endpoint Type|IPv4|
|IP Address #1|AZ us-east-1, subnet 1, IPv4|
|IP Address #2|AZ us-east-2, subnet 2, IPv4|
|Rule Name|onpremise|
|Rule Rule Type|Forward|
|Domain Name|firewall.lan|
|VPC Rule|vpc-aws-vpc|
|Target IP #1|10.0.1.2:53|
|Target IP #2|10.0.4.2:53|

#### Inbound Endpoint

![Inbound Endpoint config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8uwh29flgy2i2sdim49o.png)

![Inbound Endpoint config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/326yx45whx12fnlhh2mp.png)

|||
|:-:|:-:|
|Endpoint Name|ie-aws|
|VPC|vpc-aws-vpc|
|Security Group|Default|
|Endpoint Type|IPv4|
|IP Address #1|AZ us-east-1, subnet 1, IPv4|
|IP Address #2|AZ us-east-2, subnet 2, IPv4|

### Site to Site

![Site to Site](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zvt915qdj5p5i0ugt6fa.png)

- Use IPsec tunnels to connect AWS to another datacenter
- Have a failover connection for High availability

![Site to Site config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h8tncl9iyayrf9jkrtmo.png)

![Site to Site config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vhe52yfhn1yh3c11uyox.png)

![Site to Site config-c](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/weqymsoyfd85gc6m4mrj.png)

![Site to Site config-d](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gxlsfa7g6wfbuxba512e.png)

|||
|:-:|:-:|:-:|
|AWS|s2s-aws-pfsense|
|Target gateway type|Transit Gateway|
|Transit Gateway|TGW|
|Customer Gateway|CGW|
|Routing Options|Dynamic|
|Tunnel inside IP|IPv4|
|Inside IPv4 CIDR for tunnel 1|169.254.11.0/30|
|Pre-shared key for tunnel 1|strong password|
|Inside IPv4 CIDR for tunnel 2|169.254.12.0/30|
|Pre-shared key for tunnel 2|strong password|

#### Status

![Status](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/55xwocp466bo0mengyqo.png)

- When BGP session is established, the status will go from down to up


### SSM

![SSMa](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xzleognbsktx6j3q9b80.png)

- Using [AWS System Manager](SSMa) will allow remote access without opening any ssh ports
- Use to keep your network private
- Use to debug any connectivity issues

[AWS System Manager]: https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html

#### IAM Role Policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "ssm:DescribeAssociation",
                "ssm:GetDeployablePatchSnapshotForInstance",
                "ssm:GetDocument",
                "ssm:DescribeDocument",
                "ssm:GetManifest",
                "ssm:GetParameter",
                "ssm:GetParameters",
                "ssm:ListAssociations",
                "ssm:ListInstanceAssociations",
                "ssm:PutInventory",
                "ssm:PutComplianceItems",
                "ssm:PutConfigurePackageResult",
                "ssm:UpdateAssociationStatus",
                "ssm:UpdateInstanceAssociationStatus",
                "ssm:UpdateInstanceInformation"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "ssmmessages:CreateControlChannel",
                "ssmmessages:CreateDataChannel",
                "ssmmessages:OpenControlChannel",
                "ssmmessages:OpenDataChannel"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "ec2messages:AcknowledgeMessage",
                "ec2messages:DeleteMessage",
                "ec2messages:FailMessage",
                "ec2messages:GetEndpoint",
                "ec2messages:GetMessages",
                "ec2messages:SendReply"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}
```

#### Endpoint

##### SSM Endpoint

![ssm Endpoint config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wkh0q1ahdiblg87z9c6m.png)

![ssm Endpoint config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2k2n9q45rahm3pskg0s3.png)

![ssm Endpoint config-c](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vbfwis5nqdi68l21tm1m.png)

|||
|:-:|:-:|:-:|
|Name|ssm-endpoint|
|Service Category|AWS Service|
|Service|SSM|
|VPC|vpc-aws-vpc|
|Subnets|us-east-1, us-east-2|
|Security Group|Default|
|Policy|Full Access|

##### SSMMessage Endpoint

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3kzvt0k6sj86w03rqnbj.png)

|||
|:-:|:-:|:-:|
|Name|ssmmessage-endpoint|
|Service Category|AWS Service|
|Service|SSMmessages|
|VPC|vpc-aws-vpc|
|Subnets|us-east-1, us-east-2|
|Security Group|Default|
|Policy|Full Access|

##### EC2Message Endpoint

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pqia31zmsm1pd2za934o.png)

|||
|:-:|:-:|:-:|
|Name|ec2message-endpoint|
|Service Category|AWS Service|
|Service|ec2messages|
|VPC|vpc-aws-vpc|
|Subnets|us-east-1, us-east-2|
|Security Group|Default|
|Policy|Full Access|

## Azure

![Azure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vbr5nl499mtvwx1djmkq.png)

### VNET

![VNET](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c65xu4a3pd1pqgdy6uac.png)

- Create a Virtual Network on Azure

#### Resource Group

![RG Review](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/myk351gqo2ldxuhfcvk8.png)

- Resource Group provides a single detailed view of all resources in a groups stack

|||
|:-:|:-:|
|Resource group|rg-aws-azure|
|Region|East US|

#### Virtual Network

![Vnet Review](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dq967ke7q4ku0fp9v02t.png)

- This Iaas will build a virtual network similar to a VPC
- Create 1 network /24 CIDR to create 4 subnets with /26 CIDR

|||
|:-:|:-:|
|Resource group|rg-aws-azure|
|Name|vnet-aws-azure|
|Region|East US|
|Bastion|Disabled|
|Firewall|Disabled|
|DDoS|Disabled|
|Adress Space|172.16.12.0/24|
|Subnet|172.16.12.0/26|

### VWAN

![VWAN](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nnu1z9efs3leu9g49v7q.png)

- TODO: [Azure VWAN]
- Have a AWS site-to-site connection config to populate data

[Azure VWAN]: https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about

#### Local Network Gateway

![LNG Review](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/90r6o6889ts0akg90hct.png)

- IP of the customer/data center Gateway

|||
|:-:|:-:|
|Resource group|rg-aws-azure|
|Region|East US|
|Endpoint|IP Address|
|IP Address|1.1.1.1|
|Address Space(s)|None|
|ASN|64512|
|BGP|169.254.21.1|

##### Reserved APIPA

|||
|:-:|:-:|:-:|
|AWS|169.254.0.0/16|
|Azure|169.254.21.0/24 - 169.254.22.0/24|

#### Virtual Network Gateway

![VNG Review](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k6n8mn3h5lnvqsvnc8sv.png)

|||
|:-:|:-:|
|Resource group|rg-aws-azure|
|Region|East US|
|SKU|VPNGw2AZ|
|Generation|2|
|VNET|vnet-aws-azure|
|Subnet|172.16.12.64/27|
|Gateway Type|VPN|
|VPN Type|Route Based|
|Active-active|Disabled|
|BGB|Enabled|
|ASN|65000|
|Custom APIPA|169.254.21.2, 169.254.22.2|
|Public IP adress|vng-aws-azure-pip|

### Private Resolver

![Private Resolver](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m40y49nvzpjznb6q1buw.png)

- TODO: [Azure DNS]

[Azure DNS]: https://learn.microsoft.com/en-us/azure/dns/dns-overview

### Connection

![Connection](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4ga0o6s6zc7nfxw26z0y.png)

- Use to create an IPsec connection using BGP
- Create a second connection for failover

![Conn Review](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/um859zokwejxyggfeyxx.png)

|||
|:-:|:-:|
|Resource group|rg-aws-azure|
|Region|East US|
|Connection type|Site-to-site(IPsec)|
|Connection name|conn-1-aws-azure|
|Virtual Network Gateway|vng-aws-azure|
|Local Network Gateway|lng-aws-azure|
|IKE Protocol|IKEv2|
|IpSec / IKE policy|Default|
|Use Policy based traffic selector|Disable|
|DPD timeout|45|
|Connection Mode|Default|
|BGP|169.254.21.2|

### BGP

![VNG Sidebar](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xlp7bpkhygtb32pqplph.png)

![Connection Status](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1962g1nxxsqjpjrq207t.png)

- Verify Connection is enabled
- Create second connection for failover

![BGB Status](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iv6lwo3oj9dwck4um70a.png)

- Verify Route propagation from BGP

### Azure VM

![Ping](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kix89c8b312ibq558rbh.png)

- Azure -> AWS

## GCP

![GCP](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zpi9kof5vwdq6k6btuo1.png)

### VPC

![VPC](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gnokqgvsdu0aue2phtch.png)

- Create a Virtual Private Cloud on Google

![VPC config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/smmge708i9ddbr1idf2m.png)

![VPC config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kgx7g46bq6isnepxjhkb.png)

![VPC config-c](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w1x49do350vi86kupynx.png)

|||
|:-:|:-:|
|Name|vpc-gcp-aws|
|Description|VPC|
|IPv6|Disabled|
|Subnet|Custom|
|Subnet Name|Private|
|Subnet Region|us-east-1|
|IP stack|IPv4|
|IP range|172.16.13.0/24|
|Private Google Access|off|
|Flow Logs|off|
|IPv4 Firewall Rule|Ingress Apply to all 0.0.0.0/0 ICMP Allow|
|Dynamic Routing|Regional|

### Network Connectivity Center

![Network Connectivity](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c7ci2tfg9kbnjveh9t8c.png)

- TODO: [GCP Network Connectivity]
- Have a AWS site-to-site connection config to populate data

[GCP Network Connectivity]: https://cloud.google.com/network-connectivity/docs/concepts

#### Cloud Router

![Cloud Router](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mxv950kiznd814sbgm8j.png)

|||
|:-:|:-:|
|Name|cr-gcp|
|Description|route|
|Network|vpc-gcp-aws|
|Region|us-east-1|
|ASN|65000|
|Interval|20|
|Routes|Advertise all subnets to CR|

#### VPN Gateway

![VPN Gateway](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jyniv99nbqpcidavx7ku.png)

|||
|:-:|:-:|
|Name|vpn-gcp-aws|
|Network|vpc-gcp-aws|
|Region|us-east-1|
|IP stack|IPv4|

### Cloud DNS

![Cloud DNS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nju39yq0sf2xh7uoyulz.png)

- TODO: [GCP DNS]

[GCP DNS]: https://cloud.google.com/dns

### Peer VPN

![Peer VPN](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/590dnq3l3u5w7bep8qhp.png)

- Set up the infrastructure for GCP VPN

![Peer VPN config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ishpqglp42j4w0f9zed6.png)

![Peer VPN config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sgiui3fpk8hehn9bvl3k.png)

![Peer VPN config-c](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/njlat3b92ucc2m3f48sf.png)

- Repeats these steps on interface 1 (failover)

|||
|:-:|:-:|
|Name|vpng-gcp-aws|
|Interfaces|two interfaces|
|Interface 0|3.3.3.3|
|Interface 1|3.3.3.2|
|Peer VPN Gateway|On-Prem or Non Google|
|Peer VPNG Name|vpng-gcp-aws|
|High Availability|Create a pair of VPN tunnles|
|Cloud Router|cr-gcp|
|Associated Peer VPNG interface|0: 1.1.1.1|
|Name|conn1-gcp-aws|
|pre-shared key|strong password|
|Peer ASN|64512|

#### BGP

![BGP](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/26zci26bkwbirpqzs78q.png)

|||
|:-:|:-:|
|Name|conn1|
|Peer ASN|64512|
|BGB IPv4 address|Manually|
|Cloud Router BGP|169.254.250.138|
|BGP Peer Address|169.254.250.137|

![BGP Status](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4o9vcsc2o1alwqyjyn4a.png)

- Verify Dynamic Route update

### GCP vm

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uz6ag27wptmzhqurw9ug.png)

- GCP -> AWS

## PFSense

![Pfsense](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1xdc2bhflycjdd7lq793.png)

### VLAN

Check out this write-up on how to configure [VLANs] with pfsense

[VLANs]: https://dev.to/aakhtar3/build-networks-with-vlans-1ldd

### ISP

TODO: Check out this write-up on how to configure a VPN Server with pfsense

### PiHole

TODO: Check out this write-up on how to configure a DNS server with PiHole

### IPSec

#### Phase 1

![Edit Tunnel 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mzbj3nzbgg83ti4o148e.png)

- Start by creating a primary tunnel and repeat the below steps for the failover connection tunnel 2

![Tunnel1 Config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3lthkei3omh9raqpyek2.png)

![Tunnel1 Config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bjxsc74njx61x91isf73.png)

|||
|:-:|:-:|
|Description|conn1-aws-pfsense|
|Key Exchange version|IKEv2|
|Remote Gateway|1.1.1.1|
|Pre-Shared Key|strong password key token|
|Algorithm|AES|
|Key Length|128 bits|
|Hash|SHA256|
|DH Group|14 (2048 bit)|
|Max failures|3|

#### Phase 2

![Edit Tunnel 2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jiq9viiyz10cavsjeoi8.png)

- Start by creating a primary tunnel and repeat the below steps for the failover connection tunnel 2

![Tunnel1 Config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8ow5oi43p05y5kjair4c.png)

![Tunnel1 Config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/852jnz1ksdhy07jvkvuq.png)

![Tunnel1 Config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d3nxfb99zm3shdedjv9i.png)

|||
|:-:|:-:|
|Description|conn1-aws-pfsense|
|Mode|Routed (VTI)|
|Local Network|address: 169.254.11.12|
|Remote Network|address: 169.254.11.11|
|Encryption Algorithm|AES256-CGM 128bits|
|Ping Host|172.16.11.11|
|Keep Alive|Enabled|

#### Status

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pe5xkwki6eob6vzkgur3.png)

- Both primary and failover tunnels connected with IPSec

#### BGP

##### FRR Global Settings

![Global Settings](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i1mkyb4se39xify2uxes.png)

|||
|:-:|:-:|
|Enabled|true|
|Master Password|strong password|

##### FRR Route Maps

![Route Maps](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z809hxlbakdtfj134v3b.png)

![Route Maps config](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/40osc3et5u4ab2rtwv7k.png)

|||
|:-:|:-:|
|Name|Allow-all|
|Action|Permit|
|Sequence|100|

##### FRR BGB

![FRR BGB](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/02esh1j6lv7i6ad90z0x.png)

![BGB-config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5swktgpids18yiq6y331.png)

![BGB-config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1vvt8x3nvfstv8o7iczp.png)

|||
|:-:|:-:|
|Enabled|true|
|Local AS|65000|
|Router ID|10.0.1.1|
|Networks to distrbute|10.0.1.0/28, 10.0.2.0/29, 10.0.4.0/28|

##### FRR Neighbors

![FRR Neighbors](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5it5y8pn3jp6jpdg8zbm.png)

- Start with the primary tunnel and repeat the steps for the failover tunnel

![FRR Neighbors config-a](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vhuo4jyfnc4d1n3n9qbn.png)

![FRR Neighbors config-b](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zoibrsqcr8mqkyl35ysy.png)

![FRR Neighbors config-c](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i6esdduluf9k4cwevyv6.png)

|||
|:-:|:-:|
|Name/Address|169.254.11.12|
|Description|conn1-aws-pfsense|
|Remote AS|64512|
|Inbound Route Map Filters|Allow-all|
|Outbound Route Map Filters|Allow-all|

##### FRR Status

![Status Routes](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tksb3luy5w102vvn17cl.png)

- Verify Dynamic Routes have been updated

![Status Summary](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w1ur8ijpyexg0c2r4cqt.png)

- View the BGP Summary

### Mac

![Mac](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h40us3nz4j47c9bb32eg.png)

- Mac -> AWS
