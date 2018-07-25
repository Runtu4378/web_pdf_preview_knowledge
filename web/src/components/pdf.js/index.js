import * as React from 'react'
import { Spin, Pagination, Modal } from 'antd'
import les from './index.less'
import request from 'utils/request'

// import pdfjsLib from 'pdfjs-dist'
// import 'pdfjs-dist/build/pdf.worker.js'

const pdfjsLib = window['pdfjs-dist/build/pdf']
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '/static/pdfjs/pdf.worker.js'

class Viewer extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  state = {
    pdfDoc: null,
    url: null,
    pwd: null,
    needPwd: null,
    pwdModalShow: false,

    loading: true,
    pageNum: 0,
    currentPage: 1,

    canvas: null,
    ctx: null,
    scale: 1.3,
  }

  componentDidMount () {
    const canvas = document.getElementById('the-canvas')
    this.setState({
      canvas,
      ctx: canvas.getContext('2d'),
    })
    this.initPdfType()
  }

  componentDidUpdate () {
    this.initPdfType()
  }

  initPdfType () {
    const that = this
    const {
      type,
      url
    } = that.props
    const { url: oldUrl } = that.state
    if (oldUrl === url) {
      return
    }
    that.setState({ loading: true, url })
    if (type === 'base64') {
      // 进入base64处理模式
      request({ url }).then(res => {
        const { success, data } = res
        if (success) {
          that.initPDF({ data: atob(data) })
        }
      })
    } else {
      that.initPDF({ url })
    }
  }

  // 清空canvas
  clearCanvas () {
    const { canvas, ctx } = this.state
    if (canvas && ctx) {
      console.log('Clear canvas')
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.closePath()
    }
  }

  initPDF (initObj) {
    const that = this
    const { currentPage, pwd } = this.state
    // 清空canvas
    this.clearCanvas()
    const loadingTask = pdfjsLib.getDocument({
      password: pwd,
      ...initObj,
    })
    loadingTask.onPassword = () => {
      console.log('need pwd')
      that.setState({
        needPwd: true,
        pwdModalShow: true,
        withCredentials: true,
      })
    }
    loadingTask.promise.then(function (pdf) {
      console.log('PDF loaded')
      console.log(`PDF page Num: ${pdf.numPages}`)
      that.setState({ pdfDoc: pdf, pageNum: pdf.numPages })
      // Fetch the first page
      that.renderPage(currentPage)
    }).catch(function (reason) {
      console.error('Error: ' + reason)
    });
  }

  renderPage (num) {
    const that = this
    const { pdfDoc, canvas, ctx, scale } = that.state
    pdfDoc.getPage(num).then(function(page) {
      console.log(`Page ${num} loaded`);
      
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      }
      var renderTask = page.render(renderContext);
      renderTask.then(function () {
        console.log('Page rendered')
        that.setState({
          loading: false,
        })
      });
    });
  }

  changePage = (page) => {
    this.setState({
      loading: true,
      currentPage: page,
    })
    this.renderPage(page)
  }

  render () {
    const that = this
    const {
      loading,
      currentPage,
      pageNum,
      pwdModalShow,
    } = that.state
    const propsOfModalPwd = {
      title: '请输入pdf密码',
      visible: pwdModalShow,
      onOk: () => {
        that.setState({
          pwd: '123456',
          pwdModalShow: false,
        })
        that.initPDF()
      },
      closable: false,
      cancelButtonProps: false,
    }
    return (
      <div className={les.container}>
        {
          pwdModalShow &&
          (
            <Modal {...propsOfModalPwd}>
              输入密码
            </Modal>
          )
        }
        <div className={les.topBar}>
          <Pagination
            current={currentPage}
            pageSize={1}
            total={pageNum}
            onChange={this.changePage}
          />
        </div>
        <Spin spinning={loading} />
        <canvas id="the-canvas"></canvas>
      </div>
    )
  }
}

export default Viewer
