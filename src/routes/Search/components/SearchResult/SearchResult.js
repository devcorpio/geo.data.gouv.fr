import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import Filter from 'common/components/Filter'
import MarkdownPreview from 'common/components/MarkdownPreview'

import styles from './SearchResult.scss'

const SearchResult = ({ dataset, addFilter }) => (
  <div className={styles.container}>
    <h4>
      <Link to={`/datasets/${dataset.recordId}`}>{dataset.metadata.title}</Link>
    </h4>

    { dataset.metadata.description && (
      <MarkdownPreview markdown={dataset.metadata.description} />
    )}

    <h5>Mot-clé</h5>
    <div className={styles.list}>
      {dataset.metadata.keywords.map((keyword, idx) => (
        <Filter
          key={idx}
          onClick={addFilter}
          filter={{ value: keyword, name: 'keyword' }}
        />
      ))}
    </div>

    <h5>Organisation</h5>
    <div className={styles.list}>
      {dataset.organizations.map((organization, idx) => (
        <Filter
          key={idx}
          onClick={addFilter}
          filter={{ value: organization, name: 'organization' }}
        />
      ))}
    </div>
  </div>
)

SearchResult.propTypes = {
  dataset: PropTypes.shape({
    recordId: PropTypes.string.isRequired,

    metadata: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      keywords: PropTypes.array.isRequired
    }).isRequired,

    organizations: PropTypes.array.isRequired,
  }).isRequired,

  addFilter: PropTypes.func.isRequired
}

export default SearchResult
