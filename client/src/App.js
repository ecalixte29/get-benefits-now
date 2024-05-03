import React from 'react';
import Home from './pages/home';
import Form from './pages/form';
import Plans from './pages/plans';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FormContextProvider } from './context/FormContext';
import ConsentForm from './pages/consent_form';
import TermsAndConditions from './pages/terms_and_conditions';
import PrivacyPolicy from './pages/privacy_policy';
import ThankYou from './pages/thank_you';
import { BsChevronDoubleUp } from "react-icons/bs";
import useSmoothScroll from './hooks/useSmoothScoll';
import "./style.css"

const App = () => {
    const { sticky, scrollToTop } = useSmoothScroll();
    const queryClient = new QueryClient()

    return (
        <Router>
            <div className="bg-white overflow-y-auto">
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
                    <Route path="/consent" element={
                        <ConsentForm />
                    } />
                    <Route path="/terms-and-conditions" element={
                        <TermsAndConditions />
                    } />
                    <Route path="/privacy-policy" element={
                        <PrivacyPolicy />
                    } />
                    <Route path="/thank-you" element={
                        <ThankYou />
                    } />
                </Routes>
            </div>
            {sticky && (
                <button className="fixed bottom-8 right-8 border-2 border-secondary bg-white text-secondary text-xl w-10 h-10 z-50 flex items-center justify-center" onClick={scrollToTop}>
                    <BsChevronDoubleUp />
                </button>
            )}
        </Router>
    );
}

export default App;
