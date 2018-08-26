import React from 'react'
import hljs from 'highlight.js'
// 风格主题样式
// import 'highlight.js/styles/default.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/styles/tomorrow-night-eighties.css'

// hljs.initHighlightingOnLoad()

class Code extends React.Component {
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
    const dom = hljs.highlight(type, code)
    return (
      <pre>
         <code ref={this.codeBlock} className={`hljs ${type}`} dangerouslySetInnerHTML={{ __html: dom.value }} />
      </pre>
    )
  }
}

export default Code
