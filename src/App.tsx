import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Theme from '@/components/template/Theme';
import Layout from '@/components/layouts';
import { AuthProvider, useAuth } from '@/auth';  // Ensure you are using useAuth from AuthContext
import Views from '@/views';
import appConfig from './configs/app.config';
import './locales';

if (appConfig.enableMock) {
    import('./mock');
}

function App() {
    const { authenticated } = useAuth(); // Get the authentication state from AuthContext

    return (
        <Theme>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            {/* If the user is authenticated, navigate to authenticated entry path */}
                            <Route
                                path={appConfig.authenticatedEntryPath}
                                element={authenticated ? <Views /> : <Navigate to={appConfig.unAuthenticatedEntryPath} />}
                            />
                            
                            {/* If the user is not authenticated, navigate to unauthenticated entry path */}
                            <Route
                                path={appConfig.unAuthenticatedEntryPath}
                                element={!authenticated ? <Views /> : <Navigate to={appConfig.authenticatedEntryPath} />}
                            />
                            
                            {/* Default catch-all route to handle any other undefined paths */}
                            <Route path="*" element={<Navigate to={appConfig.authenticatedEntryPath} />} />
                        </Routes>
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </Theme>
    );
}

export default App;
