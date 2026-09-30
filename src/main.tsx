import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Automatically register and update the PWA Service Worker in production
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      registerSW({
        immediate: true,
        onNeedRefresh() {
          window.location.reload();
        },
        onOfflineReady() {
          // Ready to operate offline with cached assets
        },
      });
    })
    .catch((err) => {
      console.debug('Service Worker registration skipped:', err);
    });
}

createRoot(document.getElementById('root')!).render(<App />);
