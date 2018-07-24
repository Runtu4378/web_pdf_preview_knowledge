import les from './index.less'

const Pages = ({
  children,
}) => {
  return (
    <div className={les.container}>{children}</div>
  )
}

export default Pages
