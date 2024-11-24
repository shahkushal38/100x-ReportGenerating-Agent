// src/App.js

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ReportGenerator from "./components/ReportGenerator";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";

function App() {
  return (
    <GoogleOAuthProvider clientId="462368352179-j6uaegijl067a1meqkc5lr94qnnn0evl.apps.googleusercontent.com">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ReportGenerator />
              </ProtectedRoute>
            }
          />
          <Route path="/table" element={<Table />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
