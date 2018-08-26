import React from 'react'
import les from './index.less'

const Example = ({
  title,
  example,
  label,
  ...otherProps,
}) => {
  return (
    <div className={les.container} {...otherProps}>
      {
        title ?
        <div className={les.title}>{title}</div> :
        null
      }
      <div className={les.content}>
        <div className={les.example}>{example}</div>
        <div className={les.label}>{label}</div>
      </div>
    </div>
  )
}

export default Example
