import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { get } from 'lodash'

import LastHarvestStatus from '../LastHarvestStatus/LastHarvestStatus'
import Counter from '../Statistics/Counter/Counter'
import Percent from '../Statistics/Percent/Percent'

import ObsoleteWarning from './ObsoleteWarning'

import styles from './CatalogPreview.scss'

const CatalogPreview = ({ catalog }) => {
  let metrics = catalog.metrics
  let openness = get(metrics, 'datasets.partitions.openness.yes', 0)
  let download = get(metrics, 'datasets.partitions.download.yes', 0)

  const metricsPreview = !metrics ? (
    <div>Aucun donnée disponible</div>
  ) : (
    <div className={styles.container}>
      <Percent
        value={openness}
        total={metrics.datasets.totalCount}
        size='small'
        label='Données ouvertes'
        icon='unlock alternate icon'
      />
      <Percent
        value={download}
        total={metrics.datasets.totalCount}
        size='small'
        label='Téléchargeable'
        icon='download'
      />
      <Counter value={metrics.records.totalCount} size='small' label='Enregistrements' />
    </div>
  )

  return (
    <Link to={`/catalogs/${catalog._id}`} className={styles.link}>
      <div className={styles.paper}>
        <div className={styles.title}>{catalog.name}</div>
        <LastHarvestStatus harvest={catalog.service.sync}/>
        <ObsoleteWarning catalog={catalog} />
        {metricsPreview}
      </div>
    </Link>
  )
}

CatalogPreview.propTypes = {
  catalog: PropTypes.shape({
    metrics: PropTypes.shape({
      datasets: PropTypes.shape({
        totalCount: PropTypes.number.isRequired
      }).isRequired,

      records: PropTypes.shape({
        totalCount: PropTypes.number.isRequired
      }).isRequired
    }),

    service: PropTypes.shape({
      sync: PropTypes.object.isRequired
    }).isRequired
  })
}

export default CatalogPreview
