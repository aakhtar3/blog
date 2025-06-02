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

![4 Network](./img/4_network.png)

- Final mesh network topology architecture

## AWS

![AWS](./img/aws.png)

### Network

![VPC](./img/vpc.png)

- Create a Virtual Private Cloud Network in AWS

![VPC config-a](./img/vpc_config-a.png)

![VPC config-b](./img/vpc_config-b.png)

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

![Gateway](./img/gateway.png)

- Identify the IP address of the ISP
- Point to Point Identification and traffic passthrough

#### Customer Gateway

![Customer Gateway](./img/customer_gateway.png)

|||
|:-:|:-:|
|Name|pfsense|
|BGP ASN|65000|
|IP address|4.4.4.4|

#### Transit Gateway

![Transit Gateway config-a](./img/transit_gateway_config-a.png)

![Transit Gateway config-b](./img/transit_gateway_config-b.png)

|||
|:-:|:-:|
|Name|tg-aws|
|Description|tg-aws|
|ASN|64512|

#### Route Table

![Update Route Table](./img/update_route_table.png)

- Update routes to TGW

### DNS

![DNS](./img/dns.png)

- AWS will dedicate a reserved IP address x.x.x.2 for a VPC resolver
- Outbound Endpoints will allow you to forward DNS requests for resolvers on other networks
- Inbound Endpoints will allow resolvers on other networks to forward requests to AWS

#### Outbound Endpoint

![Outbound Endpoint config-a](./img/outbound_endpoint_config-a.png)

![Outbound Endpoint config-b](./img/outbound_endpoint_config-b.png)

![Outbound Endpoint config-c](./img/outbound_endpoint_config-c.png)

![Outbound Endpoint config-d](./img/outbound_endpoint_config-d.png)

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

![Inbound Endpoint config-a](./img/inbound_endpoint_config-a.png)

![Inbound Endpoint config-b](./img/inbound_endpoint_config-b.png)

|||
|:-:|:-:|
|Endpoint Name|ie-aws|
|VPC|vpc-aws-vpc|
|Security Group|Default|
|Endpoint Type|IPv4|
|IP Address #1|AZ us-east-1, subnet 1, IPv4|
|IP Address #2|AZ us-east-2, subnet 2, IPv4|

### Site to Site

![Site to Site](./img/site_to_site.png)

- Use IPsec tunnels to connect AWS to another datacenter
- Have a failover connection for High availability

![Site to Site config-a](./img/site_to_site_config-a.png)

![Site to Site config-b](./img/site_to_site_config-b.png)

![Site to Site config-c](./img/site_to_site_config-c.png)

![Site to Site config-d](./img/site_to_site_config-d.png)

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

![Status](./img/status.png)

- When BGP session is established, the status will go from down to up


### SSM

![AWS-SSM](./img/aws-ssm.png)

- Using AWS System Manager will allow remote access without opening any ssh ports
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

![ssm Endpoint config-a](./img/ssm_endpoint_config-a.png)

![ssm Endpoint config-b](./img/ssm_endpoint_config-b.png)

![ssm Endpoint config-c](./img/ssm_endpoint_config-c.png)

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

![Image description a](./img/image_description_a.png)

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

![Image description b](./img/image_description_b.png)

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

![Azure](./img/azure.png)

### VNET

![VNET](./img/vnet.png)

- Create a Virtual Network on Azure

#### Resource Group

![RG Review](./img/rg_review.png)

- Resource Group provides a single detailed view of all resources in a groups stack

|||
|:-:|:-:|
|Resource group|rg-aws-azure|
|Region|East US|

#### Virtual Network

![Vnet Review](./img/vnet_review.png)

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

![VWAN](./img/vwan.png)

- TODO: [Azure VWAN]
- Have a AWS site-to-site connection config to populate data

[Azure VWAN]: https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about

#### Local Network Gateway

![LNG Review](./img/lng_review.png)

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

![VNG Review](./img/vng_review.png)

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

![Private Resolver](./img/private_resolver.png)

- TODO: [Azure DNS]

[Azure DNS]: https://learn.microsoft.com/en-us/azure/dns/dns-overview

### Connection

![Connection](./img/connection.png)

- Use to create an IPsec connection using BGP
- Create a second connection for failover

![Conn Review](./img/conn_review.png)

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

![VNG Sidebar](./img/vng_sidebar.png)

![Connection Status](./img/connection_status.png)

- Verify Connection is enabled
- Create second connection for failover

![BGB Status](./img/bgb_status.png)

- Verify Route propagation from BGP

### Azure VM

![Ping](./img/ping.png)

- Azure -> AWS

## GCP

![GCP](./img/gcp.png)

### VPC

![VPC](./img/vpc.png)

- Create a Virtual Private Cloud on Google

![VPC config-a](./img/vpc_config-a.png)

![VPC config-b](./img/vpc_config-b.png)

![VPC config-c](./img/vpc_config-c.png)

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

![Network Connectivity](./img/network_connectivity.png)

- TODO: [GCP Network Connectivity]
- Have a AWS site-to-site connection config to populate data

[GCP Network Connectivity]: https://cloud.google.com/network-connectivity/docs/concepts

#### Cloud Router

![Cloud Router](./img/cloud_router.png)

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

![VPN Gateway](./img/vpn_gateway.png)

|||
|:-:|:-:|
|Name|vpn-gcp-aws|
|Network|vpc-gcp-aws|
|Region|us-east-1|
|IP stack|IPv4|

### Cloud DNS

![Cloud DNS](./img/cloud_dns.png)

- TODO: [GCP DNS]

[GCP DNS]: https://cloud.google.com/dns

### Peer VPN

![Peer VPN](./img/peer_vpn_config.png)

- Set up the infrastructure for GCP VPN

![Peer VPN config-a](./img/peer_vpn_config-a.png)

![Peer VPN config-b](./img/peer_vpn_config-b.png)

![Peer VPN config-c](./img/peer_vpn_config-c.png)

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

![BGP](./img/bgp.png)

|||
|:-:|:-:|
|Name|conn1|
|Peer ASN|64512|
|BGB IPv4 address|Manually|
|Cloud Router BGP|169.254.250.138|
|BGP Peer Address|169.254.250.137|

![BGP Status](./img/bgp_status.png)

- Verify Dynamic Route update

### GCP vm

![Image description](./img/image_description_ping.png)

- GCP -> AWS

## PFSense

![Pfsense](./img/pfsense.png)

### VLAN

Check out this write-up on how to configure [VLANs] with pfsense

[VLANs]: https://dev.to/aakhtar3/build-networks-with-vlans-1ldd

### ISP

TODO: Check out this write-up on how to configure a VPN Server with pfsense

### PiHole

TODO: Check out this write-up on how to configure a DNS server with PiHole

### IPSec

#### Phase 1

![Edit Tunnel 1](./img/edit_tunnel_1.png)

- Start by creating a primary tunnel and repeat the below steps for the failover connection tunnel 2

![Tunnel1 Config-a](./img/tunnel1_config-a.png)

![Tunnel1 Config-b](./img/tunnel1_config-b.png)

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

![Edit Tunnel 2](./img/edit_tunnel_2.png)

- Start by creating a primary tunnel and repeat the below steps for the failover connection tunnel 2

![Tunnel1 Config-a](./img/tunnel1_config-a.png)

![Tunnel1 Config-b](./img/tunnel1_config-b.png)

![Tunnel1 Config-c](./img/tunnel1_config-c.png)

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

![Image description](./img/image_description_ipsec.png)

- Both primary and failover tunnels connected with IPSec

#### BGP

##### FRR Global Settings

![Global Settings](./img/global_settings.png)

|||
|:-:|:-:|
|Enabled|true|
|Master Password|strong password|

##### FRR Route Maps

![Route Maps](./img/route_maps.png)

![Route Maps config](./img/route_maps_config.png)

|||
|:-:|:-:|
|Name|Allow-all|
|Action|Permit|
|Sequence|100|

##### FRR BGB

![FRR BGB](./img/frr_bgb.png)

![BGB-config-a](./img/bgb-config-a.png)

![BGB-config-b](./img/bgb-config-b.png)

|||
|:-:|:-:|
|Enabled|true|
|Local AS|65000|
|Router ID|10.0.1.1|
|Networks to distrbute|10.0.1.0/28, 10.0.2.0/29, 10.0.4.0/28|

##### FRR Neighbors

![FRR Neighbors](./img/frr_neighbors.png)

- Start with the primary tunnel and repeat the steps for the failover tunnel

![FRR Neighbors config-a](./img/frr_neighbors_config-a.png)

![FRR Neighbors config-b](./img/frr_neighbors_config-b.png)

![FRR Neighbors config-c](./img/frr_neighbors_config-c.png)

|||
|:-:|:-:|
|Name/Address|169.254.11.12|
|Description|conn1-aws-pfsense|
|Remote AS|64512|
|Inbound Route Map Filters|Allow-all|
|Outbound Route Map Filters|Allow-all|

##### FRR Status

![Status Routes](./img/status_routes.png)

- Verify Dynamic Routes have been updated

![Status Summary](./img/status_summary.png)

- View the BGP Summary

### Mac

![Mac](./img/mac.png)

- Mac -> AWS
