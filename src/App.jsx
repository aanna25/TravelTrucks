import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
// import HomePage from "./pages/HomePage/HomePage";
// import CatalogPage from "./pages/CatalogPage/CatalogPage";
// import CamperDetailsPage from "./pages/CamperDetailsPage/CamperDetailsPage";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const CamperDetailsPage = lazy(() =>
  import("./pages/CamperDetailsPage/CamperDetailsPage")
);

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CamperDetailsPage />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
