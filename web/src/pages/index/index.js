import * as React from 'react'
import { Row, Col, Select } from 'antd'
import Page from 'components/page'
import Code from 'components/code'
import Example from 'components/example'
import { Part, Block } from 'components/markdown'
import les from './index.less'
import PDFViewer from 'components/pdf.js'
import Piframe from './p-iframe'
import Pembed from './p-embed'
import Pobject from './p-object'

const Option = Select.Option

const staticList = [
  { key: 's-normal', href: '/static/normal.pdf', label: '静态文件' },
  { key: 's-noFont', href: '/static/noFont.pdf', label: '静态文件-无内嵌字体' },
  { key: 's-needPwd', href: '/static/needPwd.pdf', label: '静态文件-加密文档' },
]
const staticCORSList = [
  { key: 's-c-normal', href: 'http://localhost:3000/dist/normal.pdf', label: '跨域静态文件' },
  { key: 's-c-noFont', href: 'http://localhost:3000/dist/noFont.pdf', label: '跨域静态文件-无内嵌字体' },
  { key: 's-c-needPwd', href: 'http://localhost:3000/dist/needPwd.pdf', label: '跨域静态文件-加密文档' },
]
const base64List = [
  { key: 'b-normal', href: 'http://localhost:3000/file/normal.pdf', label: '跨域Base64' },
  { key: 'b-noFont', href: 'http://localhost:3000/file/noFont.pdf', label: '跨域Base64-无内嵌字体' },
  { key: 'b-needPwd', href: 'http://localhost:3000/file/needPwd.pdf', label: '跨域Base64-加密文档' },
]

class Layout extends React.Component {
  state = {
    URLType: 'static', // or base64
    showUrl: staticList[0]['href'],
  }
  componentDidMount () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `${PUBLIC_PATH}static/pdfjs/pdf.js`;
    document.body.appendChild(script);
  }
  changeUrl = (url, type) => {
    this.setState({ URLType: type, showUrl: url })
  }
  render() {
    const {
      URLType,
      showUrl,
    } = this.state
    const mapView = (list) => {
      return list.map(d => {
        return (
          <Example
            key={d.key}
            example={(
              <a href={d.href} target="_blank" rel="noopener noreferrer">{d.label}</a>
            )}
            label={(
              <Code
                type="html"
                code={`<a
  href="${d.href}"
  target="_blank"
  rel="noopener noreferrer"
>${d.label}</a>`}
              />
            )}
          />
        )
      })
    }
    const mapSelect = (title, list, type = 'static') => {
      return (
        <div className={les.selectGup}>
          <div className={les.title}>{title}</div>
          <Select style={{ width: '100%' }} defaultValue={null} onChange={(v) => this.changeUrl(v, type)}>
          {
            list.map(d => {
              return (
                <Option
                  key={d.key}
                  value={d.href}
                >{d.label}</Option>
              )
            })
          }
          </Select>
        </div>
      )
    }

    return (
      <Page>
        <Row gutter={16} className={les.container}>
          <Col span={4} className={les.left}>
            <h2>目录</h2>
            <div>
              <p><a href="#p1">后端提供PDF内容的方式</a></p>
              <p><a href="#p2">利用浏览器的自带插件实现预览（第一推荐）</a></p>
              <p><a href="#p3">封装pdf.js实现预览</a></p>
              <p><a href="#p4">使用pdf.js-viewer进行预览（第二推荐）</a></p>
              <p><a href="#p5">参考资料</a></p>
            </div>
            <div>
              {mapSelect('静态文件', staticList)}
              {mapSelect('跨域静态文件', staticCORSList)}
              {mapSelect('跨域Base64', base64List, 'base64')}
            </div>
            <div>现在正在预览的url: {showUrl}</div>
          </Col>
          <Col span={20} className={les.right}>
            <h3><a name="p1">后端提供PDF内容的方式</a></h3>
            <Part>
              <ul>
                <li>
                  <div><Block>二进制（直接返回文件）</Block></div>
                  <Part>
                    此时响应的类型 <Block>Content-Type</Block> 为 <Block>application/pdf</Block>
                    浏览器对此类型的响应的默认处理方式为下载，在使用了预览插件的浏览器会不下载文件而是触发预览行为
                  </Part>
                </li>
                <li>
                  <div><Block>Base64</Block></div>
                  <Part>
                    Base64的处理方式实际是后台将PDF文件的二进制内容转换为Base64编码，此时的文件预览和上述二进制的处理方式基本是一样的，区别在于你需要告诉浏览器这串字符的格式是 base64,需要将其转换为pdf. <Block>data:application/pdf;base64,</Block>
                  </Part>
                </li>
              </ul>
            </Part>

            <h3><a name="p2">利用浏览器的自带插件实现预览（第一推荐）</a></h3>
  
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
              {mapView(staticList)}
            </Part>
  
            <Part>
              <div><Block>利用浏览器自带插件实现预览需要进行以下操作：</Block></div>
              一、{'<a>'}标签的 href 为 pdf 的地址，此时点击 a 标签即可触发浏览器对 pdf 文件的处理<br/>
              二、pdf 请求结果中的 Content-Type 需要为 application/pdf<br/>
  
              ...未完待续
            </Part>
  
            <Part>
              <div><Block>变种实现:</Block></div>
              <Piframe type={URLType} url={showUrl} />
  
              <Pembed type={URLType} url={showUrl} />
  
              <Pobject type={URLType} url={showUrl} />
            </Part>
            <h3><a name="p3">封装pdf.js实现预览</a></h3>
            <Part>
              <h4>mozilla/pdf.js</h4>
              <Part>
                <Example
                  example={(
                    <PDFViewer
                      type={URLType}
                      url={showUrl}
                    />
                  )}
                  label={(
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
                  )}
                />
              </Part>
            </Part>

            <h3><a name="p4">使用pdf.js-viewer进行预览（第二推荐）</a></h3>
            <Part>
              <Example
                example={(
                  <iframe
                    src="/static/pdfjs-viewer/web/viewer.html?file=/static/normal.pdf"
                    width="100%"
                    height="500px"
                  >  
                    This browser does not support PDFs. Please download the PDF to view it: <a href="/static/normal.pdf">Download PDF</a>      
                  </iframe>
                )}
                label={(
                  <div>
                    <Code
                    type="html"
                    code={`<iframe
  src="/static/pdfjs-viewer/web/viewer.html?file=/static/normal.pdf"
  width="100%"
  height="500px"
>  
  This browser does not support PDFs. Please download the PDF to view it: <a href="/static/normal.pdf">Download PDF</a>      
</iframe>`}
                    />
                    <div>
                      pdf.js 官方利用 pdf.js 实现了一个功能强大的单页应用，能够实现丰富的pdf操作，而且依赖性低，可以直接下载下来进行快速移植。
                      <br/>
                      如上述例子便是将 viewer.heml 添加到项目的静态目录下，通过内嵌 iframe 调用该页面，把要预览的 pdf 地址通过 url 参数传递给 viewer.html 即可使用到这个强大的应用。
                    </div>
                  </div>
                  
                )}
              />
            </Part>

            <h3><a name="p5">参考资料</a></h3>
            <Part>
              <ul>
                <li>
                  <a href="https://blog.csdn.net/maweiqi/article/details/7677411">各浏览器对常用或者错误的 Content-Type 类型处理方式不一致</a>
                </li>
                <li>
                  <a href="https://blog.csdn.net/qappleh/article/details/80250492">前端预览PDF总结：iframe、embed、PDFObject、PDF.js</a>
                </li>
                <li>
                  <a href="https://mozilla.github.io/pdf.js/">mozilla/PDF.js 官网</a>
                </li>
                <li>
                  <a href="https://github.com/mozilla/pdf.js">mozilla/PDF.js github仓库</a>
                </li>
                <li>
                  <a href="https://mozilla.github.io/pdf.js/api/draft/index.html">mozilla/PDF.js API文档</a>
                </li>
                <li>
                  <a href="https://mozilla.github.io/pdf.js/web/viewer.html">mozilla/PDF.js 官方实现的pdf阅读器</a>
                </li>
              </ul>
            </Part>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default Layout
