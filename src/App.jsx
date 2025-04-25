import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DynamicPage from "./pages/DynamicPage";
import Layout from "./components/Layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/:role" element={<Dashboard />} />
        <Route path="/page/:pageKey" element={<DynamicPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
