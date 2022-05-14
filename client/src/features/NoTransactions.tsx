import { Link } from "react-router-dom"

const NoTransactions: React.FC = () => {
  return (
    <div className="alert alert-warning" role="alert">
      You don't have any transaction. Try to{" "}
      <Link to={"/add"} className="alert-link">
        add a transaction
      </Link>
      .
    </div>
  )
}

export default NoTransactions
