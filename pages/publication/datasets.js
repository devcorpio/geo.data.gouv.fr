import React from 'react'
import PropTypes from 'prop-types'
import {flowRight} from 'lodash'
import getConfig from 'next/config'

import {_get, _put} from '../../lib/fetch'

import attachI18n from '../../components/hoc/attach-i18n'
import withSession from '../../components/hoc/with-session'

import Page from '../../components/page'
import Meta from '../../components/meta'
import Content from '../../components/content'
import Container from '../../components/container'
import RequireAuth from '../../components/require-auth'

import Header from '../../components/publication/header'
import Breadcrumbs from '../../components/publication/breadcrumbs'
import Datasets from '../../components/publication/datasets'

const {publicRuntimeConfig: {
  PUBLICATION_BASE_URL
}} = getConfig()

class DatasetsPublicationPage extends React.Component {
  static propTypes = {
    organizationId: PropTypes.string.isRequired,
    session: PropTypes.shape({
      user: PropTypes.object
    }),

    tReady: PropTypes.bool.isRequired
  }

  static defaultProps = {
    session: null
  }

  static getInitialProps({query}) {
    return {
      organizationId: query.oid
    }
  }

  state = {}

  componentDidMount() {
    this.setState({
      datasetsPromise: this.fetchDatasets()
    })
  }

  fetchDatasets = () => {
    const {organizationId} = this.props

    return Promise.all([
      _get(`${PUBLICATION_BASE_URL}/api/organizations/${organizationId}/datasets/published`),
      _get(`${PUBLICATION_BASE_URL}/api/organizations/${organizationId}/datasets/not-published-yet`),
      _get(`${PUBLICATION_BASE_URL}/api/organizations/${organizationId}/datasets/published-by-others`)
    ])
  }

  _getPublishDatasetsPromise = async datasets => {
    const {organizationId} = this.props

    await Promise.all(
      datasets.map(datasetId => _put(`${PUBLICATION_BASE_URL}/api/datasets/${datasetId}/publication`, {
        organization: organizationId
      }))
    )

    return this.fetchDatasets()
  }

  publishDatasets = datasets => {
    this.setState({
      datasetsPromise: this._getPublishDatasetsPromise(datasets)
    })
  }

  renderAuth = user => {
    const {organizationId} = this.props
    const organization = user.organizations.find(org => org.id === organizationId)

    const {datasetsPromise} = this.state

    return (
      <div>
        <Meta title={`Jeux de données | ${organization.name} | Publication`} />

        <Header user={user} organization={organization} />
        <Breadcrumbs organization={organization} page='datasets' />
        <Datasets
          promise={datasetsPromise}
          publishDatasets={this.publishDatasets}
        />
      </div>
    )
  }

  render() {
    const {tReady} = this.props

    return (
      <Page ready={tReady}>
        {() => (
          <React.Fragment>
            <Meta title='Publication' />
            <Content>
              <Container fluid>
                <RequireAuth
                  message='Vous devez être connecté pour accéder à l’interface de publication.'
                  render={this.renderAuth}
                />
              </Container>
            </Content>
          </React.Fragment>
        )}
      </Page>
    )
  }
}

export default flowRight(
  attachI18n(),
  withSession
)(DatasetsPublicationPage)
