import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import CourseBrowser from '@/pages/CourseBrowser';
import CreatorPanel from '@/pages/CreatorPanel';
import AdminPanel from '@/pages/AdminPanel';
import { Toaster } from '@/components/ui/sonner';
import '@/App.css';
import { ThemeProvider } from './context/ThemeContext';
import CourseDetail from './pages/CourseDetails';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<CourseBrowser />} />
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route path="creator" element={<CreatorPanel />} />
              <Route path="admin" element={<AdminPanel />} />
            </Route>
          </Routes>
          <Toaster position="top-right" richColors />
        </div>
      </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;