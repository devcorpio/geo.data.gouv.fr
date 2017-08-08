import { _get, _put, _post, _delete } from '../helpers/super'

export function fetchCatalog(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return _get(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}`)
}

export function fetchCatalogs() {
  return _get('https://inspire.data.gouv.fr/api/geogw/catalogs')
}

export function getUser() {
  return _get('https://inspire.data.gouv.fr/dgv/api/me')
}

export function getOrganization(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}`)
}

export function getOrganizationDetail(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/profile`)
}

export function fetchOrganizationMetrics(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/metrics`)
}

export function fetchOrganizationPublished(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/published`)
}

export function fetchOrganizationNotPublishedYet(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/not-published-yet`)
}

export function fetchOrganizationPublishedByOthers(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/published-by-others`)
}

export function publishDataset(datasetId, organizationId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  const url = `https://inspire.data.gouv.fr/dgv/api/datasets/${datasetId}/publication`

  return _put(url, { organization: organizationId })
}

export function updateOrganizationAccount(organizationId, organization = {}) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  const url = `https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}`
  return _put(url, organization)
}

export function getOrganizationProducers(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/producers`)
}

export function dissociateProducer(producerId, organizationId) {
  if (!producerId && organizationId) return Promise.reject(new Error('producerId and organizationId is required'))
  const url = `https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/producers/${producerId}`

  return _delete(url)
}

export function associateProducer(producerId, organizationId) {
  if (!producerId && organizationId) return Promise.reject(new Error('producerId and organizationId is required'))
  const url = `https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/producers`
  const params = { '_id': producerId }

  return _post(url, params)
}

export function getProducersToAssociate(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  const url = `https://inspire.data.gouv.fr/api/geogw/services/${catalogId}/records?resultParts=facets&opendata=yes&availability=yes&facets[keyword]=0`

  return _get(url)
}

export function getOrganizations(organizationsId) {
  return Promise.all(organizationsId.map(id => getOrganization(id)))
}

// DATA.GOUV.FR
export function getDiscussions(datasetId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  const url = `https://inspire.data.gouv.fr/dgv/proxy-api/1/discussions/?for=${datasetId}`

  return _get(url)
}

export function createNewDiscussion(discussion) {
  const url = 'https://inspire.data.gouv.fr/dgv/proxy-api/1/discussions/'

  return _post(url, discussion)
}

export function createNewReply(content, discussionId) {
  const url = 'https://inspire.data.gouv.fr/dgv/proxy-api/1/discussions/' + discussionId + '/'

  return _post(url, content)
}
