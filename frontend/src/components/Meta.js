import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, desciption, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={desciption} />
      <keyword name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to Proshop',
}

export default Meta
