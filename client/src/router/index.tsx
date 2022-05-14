import React from "react"
import { RouteObject } from "react-router-dom"
const Transactions = React.lazy(
  () => import("features/transactions/Transactions")
)
const TransactionForm = React.lazy(
  () => import("features/transactions/TransactionForm")
)

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Transactions />,
  },
  {
    path: "/add",
    element: <TransactionForm key={new Date().toString()}/>,
  },
  {
    path: "/:id",
    element: <TransactionForm />,
  },
]

export default routes
