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

![High Availability](./img/high_availability.png)

- High Availability
- Failover

![Reliability](./img/reliability.png)

- Reliability
- RPO/RTO

### Key Performance Indicators 

![Performance](./img/performance.png)

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

![QPS](./img/qps.png)

- Queries Per Second
- Daily Active Users
- Time = Round up (86,400 seconds in day)

#### Max QPS

![Max QPS](./img/max_qps.png)

- Double Queries Per Second
- Calculate (Read % : Write %) Ratio
  - 1 Read : 10 Write
  - Read %  = 1  * Queries Per Second
  - Write % = 10 * Queries Per Second

#### Storage Bytes

![Storage Bytes](./img/storage_bytes.png)

- Storage Bytes
- Daily Active Users
- File Bytes

#### Retention Bytes

![Retention Bytes](./img/retention_bytes.png)

- Retention Bytes
- Storage Bytes
- Retention Time
  - 365 days in year

#### In E Gress Bytes

![In/E-Gress Bytes](./img/in-e-gress_bytes.png)

- In-gress
- E-gress
- 1 Byte / 8 Bits
- Queries Per Second
- File Bytes

## Network

### Wide Area Network

![Wide Area Network](./img/wide_area_network.png)

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

![Payload](./img/payload.png)

- API
- Request Lines
- Authentication/Authorization
- Protocols

### Public Gateway

![Public Gateway](./img/public_gateway.png)

- Firewall
- Rate Limiter
- Authentication/Authorization
- Reverse Proxy
- Forward Proxy

### Virtual Private Cloud

![Virtual Private Cloud](./img/virtual_private_cloud.png)

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

![Load Balancer](./img/load_balancer.png)

- Layer 3/4/7 OSI
- Strategy
- Use cases

### Service Discovery

![Service Discovery](./img/service_discovery.png)

- Auto Scale
  - DevOps
- Protocols
- Zeekeeper/etcd

### Consensus

![Consensus](./img/consensus.png)

- Raft Consensus
- Replicated State Machine

### Compute

![Compute](./img/compute.png)

- Session(less)
- State(full)/(less)
- Server(less)

### Message Queue

![Message Queue](./img/message_queue.png)

- Producer
- Consumer

### Cache

![Cache](./img/cache.png)

- Eviction Strategy

## Database

### SQL

![SQL](./img/sql.png)

- Relational Data
- Transactions

### NoSQL

![NoSQL](./img/nosql.png)

- Key Value
- Document
- Wide Column
- Graph
- TimeSeries
- Spatial

### CAP PACELC

![CAP](./img/cap.png)

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

![Partition](./img/partition.png)

- Consistent Hashing
- Range Partition
- Vertical Partition

### Index

![Index](./img/index.png)

- B Tree
- Skip List
- Hash
- Inverted

### ACID

#### Atomicity

![Atomicity](./img/atomicity.png)

- Transactions
- Rollbacks

#### Consistency

##### SQL Consistency

![SQL Consistency](./img/sql_consistency.png)

- Schema
- Constraint
- Fan Trap

##### NoSQL Consistency

![NoSQL Consistency](./img/nosql_consistency.png)

- Eventual Consistency
- Sequential Consistency
- Strong Consistency

![Strong Eventual Consistency](./img/strong_eventual_consistency.png)

- Strong Eventual Consistency
- Quorum Replication
- (Dotted) Vector Clocks
- Chain Replication

#### Isolation

![Isolation](./img/isolation.png)

- Race Conditions
- Lock
- Concurrency

#### Durability

![Durability](./img/durability.png)

- High Watermark
- Checkpoint
- Write Ahead Log