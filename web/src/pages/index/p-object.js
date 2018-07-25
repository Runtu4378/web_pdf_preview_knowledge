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
        <object
          data={url}
          type="application/pdf"
          width="100%"
          height="500px"
        >
          This browser does not support PDFs. Please download the PDF to view it: <a href={url}>Download PDF</a>
        </object>
        <Code
          type="html"
          code={`<object
  data="${url}"
  type="application/pdf"
  width="100%"
  height="500px"
>

  This browser does not support PDFs. Please download the PDF to view it: <a href=${url}>Download PDF</a>

</object>`}
        />
      </Part>
    )
  }
}

export default Page
