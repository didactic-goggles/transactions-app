import React, { Suspense } from "react"
import Header from "features/Header"
import Footer from "features/Footer"
import { Outlet, useRoutes } from "react-router-dom"
import routes from "router"
import LoadingSpinner from "features/LoadingSpinner"
const App: React.FC = () => {
  const routesElement = useRoutes(routes)
  return (
    <div className="container d-flex flex-column min-h-100">
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
        {routesElement}
        <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
