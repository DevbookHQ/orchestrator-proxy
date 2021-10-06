# Reverse Proxy for Orchestrator Sessions

### Forked from https://github.com/wmnnd/nginx-certbot 

Usually, we use GCP's Load Balancer to set up SSL and domains for our servers. Unfortunately, GCP doesn't allow wildcard domains and we need URLs like `*.o.usedevbook.com` for our Orchestrator sessions.

We are using this nginx + Let's Encrypt boilerplate to deploy our own reverse proxy on GCE instance.

Full cycle of the HTTP request to `*.o.usedevbook.com` URL:

1) Client sends HTTPS request to \*.o.usedevbook.com
2) Reverse Proxy GCE instance receives the request and proxies it as HTTP request to GCP Load Balancer
3) GCP Load Balancer receives the request and proxies it as HTTP request to the actual GCE Orchestrator instance

## Installation
1. [Install docker-compose](https://docs.docker.com/compose/install/#install-compose).

2. Clone this repository: `git clone https://github.com/wmnnd/nginx-certbot.git .`

3. Run the init script:

```
./init-letsencrypt.sh
```

4. Run the server:
```
./start.sh
```        

# Deployment

There isn't a good automated way to deploy this. The current way of deployment is fully manual:
1. SSH to GCE instance
2. Clone repo
3. Run `sudo ./init-letsencrypt.sh` (don't generate new SSL certs if not needed)
4. Start proxy in the background `sudo ./start.sh &`