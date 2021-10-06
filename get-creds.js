// This script generates the `credentials.ini` file required by Certbot to successfully generate certificates.
// Requires a env variable GOOGLE_APPLICATION_CREDENTIALS to be set.

import fs, { mkdirSync } from 'fs'
import path from 'path'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { cwd } from 'process'

const secretManager = new SecretManagerServiceClient()

async function getSecret(name) {
  const [secretVersion] = await secretManager.accessSecretVersion({
    name: `${name}/versions/latest`,
  })

  const secretValue = secretVersion.payload.data.toString()
  if (!secretValue) throw new Error(`'Cannot retrive secret "${name}" from the Google Secret Manager.'`)
  return secretValue
}

// Get Cloudflare API token.
const cloudflareTokenSecretName = 'projects/424909584475/secrets/cloudflare-api-token-ssl-orchestrator'
const cloudflareToken = await getSecret(cloudflareTokenSecretName)

// Create the `credentials.ini` file.
// Reference - https://certbot-dns-cloudflare.readthedocs.io/en/stable/
const dirPath = path.join(process.cwd(), 'data', 'certbot', 'conf')
const filename = 'cloudflare.ini'
const content =`
dns_cloudflare_api_token = ${cloudflareToken}
`
mkdirSync(dirPath, { recursive: true })
fs.writeFileSync(path.join(dirPath, filename), content)
