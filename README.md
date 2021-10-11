# Reverse Proxy for Orchestrator Sessions

### Forked from https://github.com/wmnnd/nginx-certbot 

Usually, we use GCP's Load Balancer to set up SSL and domains for our servers. Unfortunately, GCP doesn't allow wildcard domains and we need URLs like `*.o.usedevbook.com` for our Orchestrator sessions for running templates.

We are using this nginx + Let's Encrypt boilerplate to deploy our own reverse proxy for the Orchestrator server.

## Installation
1. [Install docker-compose](https://docs.docker.com/compose/install/#install-compose).

2. Clone this repository: `git clone https://github.com/wmnnd/nginx-certbot.git .`

3. Run the init script:
#### **🚨 IMPORTANT 🚨**: Make sure to change the variable `staging` to `1` in the `init-letsencrypt.sh` if you aren't in the production environment

```
./init-letsencrypt.sh
```

4. Run the server:
```
docker-compose up
```        

# Deployment

There isn't a good automated way to deploy this. The current way of deployment is fully manual:
1. SSH to GCE instance
2. Clone repo
3. Run `sudo ./init-letsencrypt.sh` (don't generate new SSL certs if not needed)
4. Start proxy in the background `sudo docker-compose up &`
