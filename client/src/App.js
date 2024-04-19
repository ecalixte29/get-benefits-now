import React from 'react';
import Home from './pages/home';
import Form from './pages/form';
import Plans from './pages/plans';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "./style.css"
import { FormContextProvider } from './context/context';
import TermsAndConditions from './pages/T&C';
import ThankYou from './pages/thank_you';

const App = () => {
    const queryClient = new QueryClient()
    return (
        <Router>
            <div className="bg-[#f5f5f5] overflow-y-auto">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/form" element={
                        <FormContextProvider>
                            <Form />
                        </FormContextProvider>
                    } />
                    <Route path="/plans" element={
                        <QueryClientProvider client={queryClient}>
                            <Plans />
                        </QueryClientProvider>
                    } />
                    <Route path="/terms-and-conditions" element={
                        <TermsAndConditions />
                    } />
                    <Route path="/thank-you" element={
                        <ThankYou />
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
