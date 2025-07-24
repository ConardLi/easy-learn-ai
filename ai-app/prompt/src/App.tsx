import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <AppRouter />
        <Toaster 
          position="top-right" 
          richColors 
          closeButton
          duration={3000}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
