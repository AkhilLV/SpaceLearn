// import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Your tasks</h2>
      <ul className="sort-by-list">
        <li>Today</li>
        <li>Late</li>
        <li>All</li>
      </ul>
      <div className="todolist">
        <div className="list-item">Walk cat</div>
        <div className="list-item">Walk cat</div>
        <div className="list-item">Walk cat</div>
        <div className="list-item">Walk cat</div>
      </div>
    </div>
  )
}

export default Sidebar