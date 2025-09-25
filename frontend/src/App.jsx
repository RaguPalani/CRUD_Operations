import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

// Animated Background Component
const AnimatedBackground = () => {
  useEffect(() => {
    const createFloatingShapes = () => {
      const container = document.createElement('div');
      container.className = 'floating-shapes';
      
      // Create floating shapes
      const shapes = ['circle', 'square', 'triangle', 'blob'];
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
      
      for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.className = `floating-shape ${shapeType}`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.animationDelay = `${Math.random() * 20}s`;
        shape.style.background = color;
        shape.style.setProperty('--color', color);
        
        container.appendChild(shape);
      }
      
      document.body.appendChild(container);
      
      return () => {
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      };
    };

    createFloatingShapes();
  }, []);

  return null;
};

// Page Transition Component
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    setTransitionStage('fadeOut');
    
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage('fadeIn');
    }, 300);

    return () => clearTimeout(timer);
  }, [children, location.key]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      {displayChildren}
    </div>
  );
};

// Glassmorphism Container
const GlassContainer = ({ children, className = '' }) => {
  return (
    <div className={`glass-container ${className}`}>
      {children}
    </div>
  );
};

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner">
          <div className="spinner-circle"></div>
          <div className="spinner-text">Loading...</div>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner">
          <div className="spinner-circle"></div>
          <div className="spinner-text">Loading...</div>
        </div>
      </div>
    );
  }
  
  return !user ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <AnimatedBackground />
          
          {/* Animated Background Elements */}
          <div className="floating-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
          
          <GlassContainer className="main-content">
            <Routes>
              <Route path="/login" element={
                <PublicRoute>
                  <PageTransition>
                    <Login />
                  </PageTransition>
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <PageTransition>
                    <Register />
                  </PageTransition>
                </PublicRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <PageTransition>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </PageTransition>
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </GlassContainer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;