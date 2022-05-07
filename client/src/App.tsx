import React from "react"
import Transactions from "features/transactions/Transactions"
import Header from "features/Header"
const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <section className="container">
          <Transactions />
        </section>
      </main>
    </>
  )
}

export default App
