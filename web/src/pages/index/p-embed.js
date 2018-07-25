import * as React from 'react'
import Code from 'components/code'
import { Part } from 'components/markdown'
import dealFunc from './dealBase64'

class Page extends React.Component {
  state = {
    url: null,
  }
  initUrl () {
    const that = this
    const {
      type,
      url
    } = that.props
    const { url: oldUrl } = this.state
    if (oldUrl === url) {
      return
    }
    if (type === 'base64') {
      // 进入base64处理模式
      dealFunc(url).then(res => {
        const { success, data } = res
        if (success) {
          that.setState({ url: `data:application/pdf;base64,${data}` })
        }
      })
    } else {
      that.setState({ url })
    }
  }
  componentDidMount () {
    this.initUrl()
  }
  componentDidUpdate () {
    this.initUrl()
  }
  render () {
    const {
      url,
    } = this.state
    return (
      <Part>
        <embed
          src={url}
          type="application/pdf"
          width="100%"
          height="500px"
        />
        <Code
          type="html"
          code={`<embed
  src="${url}"
  type="application/pdf"
  width="100%"
  height="500px"
/>`}
        />
      </Part>
    )
  }
}

export default Page
