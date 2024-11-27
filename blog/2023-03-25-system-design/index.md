---
slug: system-design
title: System Design
authors: aakhtar3
tags: [tutorial, systems, computerscience, architecture]
image: https://blog.ayyazakhtar.com/assets/images/cover-8f723e970de0fe6ef0966b888cec5c45.png
---

![cover](./cover.jpeg)

A high level break down of key components when doing a system design problem.

| [Requirements](#requirements)| [Estimations](#estimations) | [Network](#network) | [Application](#application) | [Database](#database) |
| - | - | - | - | - |
| [Functional](#functional) | [Calculations](#calculations) | [WAN](#wide-area-network) | [Load Balancer](#load-balancer) | [SQL](#sql) |
| [Non-Functional](#non-functional) | [QPS](#qps) | [Payload](#payload) | [Service Discovery](#service-discovery) | [NoSQL](#nosql) |
| [Architecture](#architecture) | [Max QPS](#max-qps) | [Gateway](#public-gateway) | [Consensus](#consensus) | [CAP PACELC](#cap-pacelc) |
| [Key Performance Indicators](#key-performance-indicators) | [Storage Bytes](#storage-bytes) | [VPC](#virtual-private-cloud) | [Compute](#compute) | [Partition](#partition) |
| - | [Retention Bytes](#retention-bytes) | - | [Message Queue](#message-queue) | [Index](#index) |
| - | [In E Gress Bytes](#in-e-gress-bytes) | - | [Cache](#cache) | [ACID](#acid) |

<!-- truncate -->

## Requirements

Get requirements and estimations to scope your system design.

### Functional

Identity what you are trying to build.
 
| Features    | System        |
| ----------- | ------------- |
| 1 on 1 chat | Mobile/Web    |
| News feed   | Notifications |

### Non Functional

Identify how your system will behave.

| User Experience            | System            |
| -------------------------- | ----------------- |
| Full end to end encryption | High Availability |
| See new post fast          | Reliability       |


### Architecture

![High Availability](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2u612jtqk4pe4mdtujmv.png)

- High Availability
- Failover

![Reliability](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f9yy7yrkbiih79wouwh7.png)

- Reliability
- RPO/RTO

### Key Performance Indicators 

![Performance](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zs4ad6f7z2976vawivj5.png)

- Observability
- Metrics

## Estimations

| Value | Number | Byte |
| - | - | - |
| Hundred | - | B |
| Thousand | K | KB |
| Million  | M | MB |
| Billion  | B | GB |
| Trillion | T | TB |
| Quadrillion | Q | PB |
| Quintillion | Qu | EB |
| Sextillion | S | ZB |
| Septillion | Se | YB |

Estimate the scope of your users and data points.

| Users (DAU)       | File Type (File Bytes) | Storage (Retention Time) |
| ----------------- | ---------------------- | -------- |
| 100 B Message/day | 1 KB (avg)               | 10 years |
| 10 B Post/day     | 10 KB (max)              | 10% new data per year |

### Calculations

Using your estimations do some back of envelope.

| [QPS](#qps) | [Max QPS](#max-qps) | [Storage-Bytes](#storage-bytes) | [Retention Bytes](#retention-bytes) | [In/E Gress Bytes](#in-e-gress-bytes)|
| ----------- | ------------------- | - | - | - |
| DAU / ~100K | 2 * QPS             | DAU * FileBytes   | StorageBytes * Retention Time | (QPS * FileBytes) / 8 Bit |

#### QPS

![QPS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e43p1umloizfnfvnqaeq.png)

- Queries Per Second
- Daily Active Users
- Time = Round up (86,400 seconds in day)

#### Max QPS

![Max QPS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d8ddm4xz1craxozw1soa.png)

- Double Queries Per Second
- Calculate (Read % : Write %) Ratio
  - 1 Read : 10 Write
  - Read %  = 1  * Queries Per Second
  - Write % = 10 * Queries Per Second

#### Storage Bytes

![Storage Bytes](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y6c30qmhnhqtpnz10297.png)

- Storage Bytes
- Daily Active Users
- File Bytes

#### Retention Bytes

![Retention Bytes](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vkjtt3cqqerya9q9tc34.png)

- Retention Bytes
- Storage Bytes
- Retention Time
  - 365 days in year

#### In E Gress Bytes

![In/E-Gress Bytes](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j441wkjmvg8n61xgenbm.png)

- In-gress
- E-gress
- 1 Byte / 8 Bits
- Queries Per Second
- File Bytes

## Network

### Wide Area Network

![Wide Area Network](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rl24ty28zxcpbg345rls.png)

- Clients
  - Mobile
  - Browser
  - CLI
- DNS
  - DNSSec (Signed Registries)
  - DNS over HTTPS (Privacy)
- CDN
- APN

### Payload

![Payload](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/59gz3wfs07cuy8kmaiap.png)

- API
- Request Lines
- Authentication/Authorization
- Protocols

### Public Gateway

![Public Gateway](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/342ua3gptnfmkfs52wty.png)

- Firewall
- Rate Limiter
- Authentication/Authorization
- Reverse Proxy
- Forward Proxy

### Virtual Private Cloud

![Virtual Private Cloud](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qdim8qe9170g4yr6asn5.png)

- Access Control List
- Security Group
- Route Table
- Classless Inter-Domain Routing
- Gateway
  - Internet
  - Network Adress Translation
  - VPC Peering

## Application

### Load Balancer

![Load Balancer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fbh09c9k819bzlcoa5hs.png)

- Layer 3/4/7 OSI
- Strategy
- Use cases

### Service Discovery

![Service Discovery](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yrptpsgok3ordm1qguaa.png)

- Auto Scale
  - DevOps
- Protocols
- Zeekeeper/etcd

### Consensus

![Consensus](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6rg0s8bp50onllzbolet.png)

- Raft Consensus
- Replicated State Machine

### Compute

![Compute](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kl7anmanpofht9hhcgiq.png)

- Session(less)
- State(full)/(less)
- Server(less)

### Message Queue

![Message Queue](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xcsxujos0zrera1ct0ue.png)

- Producer
- Consumer

### Cache

![Cache](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8ohynydr2eltygrewues.png)

- Eviction Strategy

## Database

### SQL

![SQL](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uet7cdj1o8252zgt03nk.png)

- Relational Data
- Transactions

### NoSQL

![NoSQL](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ptmx7z4epnptmpi7cq3f.png)

- Key Value
- Document
- Wide Column
- Graph
- TimeSeries
- Spatial

### CAP PACELC

![CAP](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/utj407jznb4qt0cb56ny.png)

- CAP
  - Consistency
  - Availability
  - Partition
- PACELC
  - Partition == true
      - IF
  - Availability
      - or
  - Consistency
      - ELSE
  - Latency
      - or
  - Consistency

### Partition

![Partition](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q55pywi48nzr267n71mr.png)

- Consistent Hashing
- Range Partition
- Vertical Partition

### Index

![Index](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/95xy383preljy7njqj69.png)

- B Tree
- Skip List
- Hash
- Inverted

### ACID

#### Atomicity

![Atomicity](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/12fvaddtvqxirlqph2q5.png)

- Transactions
- Rollbacks

#### Consistency

##### SQL Consistency

![SQL Consistency](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ragocvaxsykmxifqry3y.png)

- Schema
- Constraint
- Fan Trap

##### NoSQL Consistency

![NoSQL Consistency](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/btog6mwmbcmqiftksc3u.png)

- Eventual Consistency
- Sequential Consistency
- Strong Consistency

![Strong Eventual Consistency](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zdhmt9m671mjd8gqd29m.png)

- Strong Eventual Consistency
- Quorum Replication
- (Dotted) Vector Clocks
- Chain Replication

#### Isolation

![Isolation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sy3kkm99dx4x67efl5r4.png)

- Race Conditions
- Lock
- Concurrency

#### Durability

![Durability](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g9i34wwhnhsl1y6yqkhp.png)

- High Watermark
- Checkpoint
- Write Ahead Log