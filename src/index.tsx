import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { StoreProvider } from './app/providers/StoreProvider';

import './app/styles/index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>
    </StrictMode>
);
