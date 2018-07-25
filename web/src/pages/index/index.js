import * as React from 'react'
import { Row, Col, Select } from 'antd'
import Page from 'components/page'
import Code from 'components/code'
import { Part, Block } from 'components/markdown'
import les from './index.less'
import PDFViewer from 'components/pdf.js'

const Option = Select.Option

class Layout extends React.Component {
  state = {
    showUrl: '/static/normal.pdf',
  }
  changeUrl = (url) => {
    this.setState({ showUrl: url })
  }
  render() {
    const { showUrl } = this.state
    const viewList = [
      { key: 'normal', href: '/static/normal.pdf', label: '静态文件' },
      { key: 'noFont', href: '/static/noFont.pdf', label: '静态文件-无内嵌字体' },
      { key: 'needPwd', href: '/static/needPwd.pdf', label: '静态文件-加密文档' },
      { key: 'outsideStatic', href: 'http://localhost:3000/dist/test.pdf', label: '跨域静态文件' }
    ]
    const mapView = (list) => {
      return list.map(d => {
        return (
          <div key={d.key}>
            <a href={d.href} target="_blank" rel="noopener noreferrer">{d.label}</a>
            <Code
              type="html"
              code={`<a href="${d.href}" target="_blank" rel="noopener noreferrer">${d.label}</a>`}
            />
          </div>
        )
      })
    }
    return (
      <Page>
        <Row gutter={16}>
          <Col span={4}>
            <h2>目录</h2>
            <div>
              <p><a href="#p1">利用浏览器的自带插件实现预览</a></p>
              <p><a href="#p2">JS 插件自行实现预览</a></p>
            </div>
            <div>
              <Select style={{ width: '100%' }} value={showUrl} onChange={this.changeUrl}>
                <Option key={1} value={'/static/normal.pdf'}>静态文件</Option>
                <Option key={2} value={'/static/noFont.pdf'}>静态文件-无内嵌字体</Option>
                <Option key={3} value={'/static/needPwd.pdf'}>静态文件-加密文档</Option>
              </Select>
            </div>
          </Col>
          <Col span={20} className={les.container}>
            <h2>PDF 预览实现的两种方式</h2>
            <h3><a name="p1">利用浏览器的自带插件实现预览</a></h3>
  
            <Part>
              <div><Block>缺点：</Block></div>
              <ul>
                <li>不是所有浏览器都有实现pdf文件预览，而且预览器的实现效果和浏览器的实现和版本有关</li>
              </ul>

              <div><Block>优点：</Block></div>
              <ul>
                <li>简单、不依赖前端</li>
              </ul>
            </Part>
  
            <Part>
              在浏览器中直接输入 pdf 地址时，个别浏览器（如Chrome）会不下载该PDf而是直接在浏览器打开PDF
              <span>如Chrome中可以在<Block>“设置”</Block>-<Block>“内容设置”</Block>-<Block>“PDF文档”</Block>中对这种行为进行设置</span>
              {/* <img src={require('./img/chrome-pdf.png')} alt="" className={les.img} /> */}
            </Part>
  
            <Part>
              <div><Block>例子：</Block></div>
              {mapView(viewList)}
            </Part>
  
            <Part>
              <div><Block>利用浏览器自带插件实现预览需要进行以下操作：</Block></div>
              一、{'<a>'}标签的 href 为 pdf 的地址，此时点击 a 标签即可触发浏览器对 pdf 文件的处理<br/>
              二、pdf 请求结果中的 Content-Type 需要为 application/pdf<br/>
  
              ...未完待续
            </Part>
  
            <Part>
              <div><Block>变种实现:</Block></div>
              <h3>1.iframe 内嵌</h3>
              <Part>
                <iframe title="iframe" src={showUrl} width="100%" height="500px">
                  This browser does not support PDFs. Please download the PDF to view it: <a href={showUrl}>Download PDF</a>
                </iframe>
                <Code
                  type="html"
                  code={`<iframe src=${showUrl} width="100%" height="500px">
                
  This browser does not support PDFs. Please download the PDF to view it: <a href=${showUrl}>Download PDF</a>
                    
</iframe>`}
                />
              </Part>
  
              <h3>2.embed 标签</h3>
              <Part>
                <embed src={showUrl} type="application/pdf" width="100%" height="500px" />
                <Code
                  type="html"
                  code={`<embed src=${showUrl} type="application/pdf" width="100%" height="500px" />`}
                />
              </Part>
  
              <h3>3.object 标签</h3>
              <Part>
                <object data={showUrl} type="application/pdf" width="100%" height="500px">
                  This browser does not support PDFs. Please download the PDF to view it: <a href={showUrl}>Download PDF</a>
                </object>
                <Code
                  type="html"
                  code={`<object data=${showUrl} type="application/pdf" width="100%" height="500px">
  
  This browser does not support PDFs. Please download the PDF to view it: <a href=${showUrl}>Download PDF</a>
  
</object>`}
                />
              </Part>
            </Part>
            <h3><a name="p2">JS 插件自行实现预览</a></h3>
            <Part>
              <h4>mozilla/pdf.js</h4>
              <Part>
                <div>
                  <div><Block>缺点：</Block></div>
                  <ul>
                    <li>不支持低版本IE(9以下)</li>
                    <li>体积约 3m (gzip前)</li>
                  </ul>
                  <div><Block>优点：</Block></div>
                  <ul>
                    <li>mozilla出品，现在仍在更新</li>
                    <li>不依赖浏览器的PDF预览插件，大概实现原理是利用算法将 pdf 转换为数据结构，然后在 canvas 上输出</li>
                    <li>提供若干 API 接口，可以自行封装换页等插件</li>
                  </ul>
                </div>
                <PDFViewer
                  url={showUrl}
                />
              </Part>
            </Part>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default Layout
