import { Row, Col } from 'antd'
import Page from 'components/page'
import Code from 'components/code'
import { Part, Block } from 'components/markdown'
import les from './index.less'
import PDFViewer from 'components/pdf.js'

const innerPDF = require('../../resource/test.pdf')

const Layout = () => {
  const viewList = [
    { key: 'inner', href: innerPDF, label: '网页内部静态pdf（pdf文件随web项目打包变成同域静态文件）' },
    { key: 'outsideStatic', href: 'http://localhost:3000/dist/test.pdf', label: '静态文件' }
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
      <Row>
        <Col span={4}>
          <h2>目录</h2>
          <div>
            <p><a href="#p1">利用浏览器的自带插件实现预览</a></p>
            <p><a href="#p2">JS 插件自行实现预览</a></p>
          </div>
        </Col>
        <Col span={20}>
          <h2>PDF 预览实现的两种方式</h2>
          <h3><a name="p1">利用浏览器的自带插件实现预览</a></h3>

          <Part>
            <div><Block>优点：</Block></div>
            <div>简单、不依赖前端</div>

            <div><Block>缺点：</Block></div>
            <div>不是所有浏览器都有实现pdf文件预览，而且预览器的实现效果和浏览器的实现和版本有关</div>
          </Part>

          <Part>
            在浏览器中直接输入 pdf 地址时，个别浏览器（如Chrome）会不下载该PDf而是直接在浏览器打开PDF
            <span>如Chrome中可以在<Block>“设置”</Block>-<Block>“内容设置”</Block>-<Block>“PDF文档”</Block>中对这种行为进行设置</span>
            <img src={require('./img/chrome-pdf.png')} alt="" className={les.img} />
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
              <iframe title="iframe" src="http://localhost:3000/dist/test.pdf" width="100%" height="500px">
                This browser does not support PDFs. Please download the PDF to view it: <a href="http://localhost:3000/dist/test.pdf">Download PDF</a>
              </iframe>
              <Code
                type="html"
                code={`<iframe src="http://localhost:3000/dist/test.pdf" width="100%" height="500px">
              
  This browser does not support PDFs. Please download the PDF to view it: <a href="http://localhost:3000/dist/test.pdf">Download PDF</a>
                  
</iframe>`}
              />
            </Part>

            <h3>2.embed 标签</h3>
            <Part>
              <embed src="http://localhost:3000/dist/test.pdf" type="application/pdf" width="100%" height="500px" />
              <Code
                type="html"
                code={`<embed src="http://localhost:3000/dist/test.pdf" type="application/pdf" width="100%" height="500px" />`}
              />
            </Part>

            <h3>3.object 标签</h3>
            <Part>
              <object data="http://localhost:3000/dist/test.pdf" type="application/pdf" width="100%" height="500px">
                This browser does not support PDFs. Please download the PDF to view it: <a href="http://localhost:3000/dist/test.pdf">Download PDF</a>
              </object>
              <Code
                type="html"
                code={`<object data="http://localhost:3000/dist/test.pdf" type="application/pdf" width="100%" height="500px">

    This browser does not support PDFs. Please download the PDF to view it: <a href="http://localhost:3000/dist/test.pdf">Download PDF</a>

</object>`}
              />
            </Part>
          </Part>
          <h3><a name="p2">JS 插件自行实现预览</a></h3>
          <Part>
            <h4>mozilla/pdf.js</h4>
            <Part>
              <PDFViewer
                url='/static/test.pdf'
              />
            </Part>
          </Part>
        </Col>
      </Row>
    </Page>
  )
}

export default Layout
