import * as React from 'react'
import hljs from 'highlight.js'
// 风格主题样式
// import 'highlight.js/styles/default.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/styles/tomorrow-night-eighties.css'

// hljs.initHighlightingOnLoad()

class Code extends React.Component {
  componentDidMount () {
    hljs.initHighlighting()
  }
  render () {
    const {
      type,
      code,
    } = this.props
    if (!(
      type === 'html'
    )) {
      throw new Error(`type of code is error: ${type}`)
    }
    return (
      <pre>
        <code className={type}>{code}</code>
      </pre>
    )
  }
}

export default Code
