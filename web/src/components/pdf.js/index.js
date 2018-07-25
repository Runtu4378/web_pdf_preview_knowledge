import * as React from 'react'
import { Spin, Pagination } from 'antd'
import les from './index.less'

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
    loading: true,
    pageNum: 0,
    currentPage: 1,
    canvas: null,
    ctx: null,
    scale: 1.3,
  }

  initPDF () {
    const that = this
    const { url } = that.props
    const { currentPage } = this.state
    const loadingTask = pdfjsLib.getDocument(url)
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

  componentDidMount () {
    const canvas = document.getElementById('the-canvas')
    this.setState({
      canvas,
      ctx: canvas.getContext('2d'),
    })
    this.initPDF()
  }

  changePage = (page) => {
    this.setState({
      loading: true,
      currentPage: page,
    })
    this.renderPage(page)
  }

  render () {
    const { loading, currentPage, pageNum } = this.state
    return (
      <div className={les.container}>
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
