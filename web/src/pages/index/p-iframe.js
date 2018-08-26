import * as React from 'react'
import Code from 'components/code'
import Example from 'components/example'

class Page extends React.Component {
  state = {
    url: null,
    data: null,
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
      that.setState({ url, data: `data:application/pdf;base64,${url}` })
    } else {
      that.setState({ url, data: url })
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
      data,
    } = this.state
    return (
      <Example
        title='1.iframe 内嵌'
        example={(
          <iframe
            title="iframe"
            src={data}
            width="100%"
            height="500px"
          >
            This browser does not support PDFs. Please download the PDF to view it: <a href={data}>Download PDF</a>
          </iframe>
        )}
        label={(
          <Code
            type="html"
            code={`<iframe
  src="${data}"
  width="100%"
  height="500px"
>
      
This browser does not support PDFs. Please download the PDF to view it: <a href="${data}">Download PDF</a>
          
</iframe>`}
          />
        )}
      />
    )
  }
}

export default Page
