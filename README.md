# Reverse Proxy for Orchestrator Sessions

### Forked from https://github.com/wmnnd/nginx-certbot 

Usually, we use GCP's Load Balancer to set up SSL and domains for our servers. Unfortunately, GCP doesn't allow wildcard domains and we need URLs like `*.orch.usedevbook.com` for our Orchestrator sessions.

We are using this nginx + Let's Encrypt boilerplate to deploy our own reverse proxy on GCE instance.

Full cycle of the HTTP request to `*.orch.usedevbook.com` URL:

1) Client sends HTTPS request to \*.orch.usedevbook.com
2) Reverse Proxy GCE instance receives the request and proxies it as HTTP request to GCP Load Balancer
3) GCP Load Balancer receives the request and proxies it as HTTP request to the actual GCE Orchestrator instance

## Installation
1. [Install docker-compose](https://docs.docker.com/compose/install/#install-compose).

2. Clone this repository: `git clone https://github.com/wmnnd/nginx-certbot.git .`

3. Run the init script:

```
npm run init-letsencrypt
```

4. Run the server:
```
npm run start
```        