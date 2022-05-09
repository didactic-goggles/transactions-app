import Pagination from "react-bootstrap/Pagination"

const TransactionPagination: React.FC = () => {
  let active = 2
  let items = []
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    )
  }
  return (
    <div>
      <input type="text" />
      <Pagination>{items}</Pagination>
    </div>
  )
}

export default TransactionPagination
