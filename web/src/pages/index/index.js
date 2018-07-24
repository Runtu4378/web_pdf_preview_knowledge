import Code from '../../components/code'

const innerPDF = require('../../static/test.pdf')

const Pages = () => {
  const viewList = [
    { key: 'inner', href: innerPDF, label: '网页内部静态pdf' },
    { key: 'outsideStatic', href: 'http://localhost:3000/dist/test.pdf', label: '跨域静态文件' }
  ]
  const mapView = (list) => {
    return list.map(d => {
      return (
        <div key={d.key}>
          <a href={d.href} target="_blank" rel="noopener noreferrer">{d.label}</a>
          <Code
            type="html"
            code={`<a href=${d.href} target="_blank" rel="noopener noreferrer">${d.label}</a>`}
          />
        </div>
      )
    })
  }
  return (
    <div>
      {mapView(viewList)}
    </div>
  )
}

export default Pages
