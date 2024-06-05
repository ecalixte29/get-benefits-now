import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { BsChevronDoubleUp } from 'react-icons/bs'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ConsentForm from './components/ConsentForm'
import Form from './components/Form'
import Home from './components/Home'
import Plans from './components/Plans'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsAndConditions from './components/TermsAndConditions'
import ThankYou from './components/ThankYou'
import useForm from './hooks/useForm'
import useSmoothScroll from './hooks/useSmoothScoll'
import './style.css'

const App = () => {
    const { sticky, scrollToTop } = useSmoothScroll()
    const queryClient = new QueryClient()
    const { initializeForm } = useForm()
    useEffect(() => {
        initializeForm()
    }, [])

    return (
        <Router>
            <div className="overflow-y-auto bg-white">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/form" element={<Form />} />
                    <Route
                        path="/plans"
                        element={
                            <QueryClientProvider client={queryClient}>
                                <Plans />
                            </QueryClientProvider>
                        }
                    />
                    <Route path="/consent" element={<ConsentForm />} />
                    <Route
                        path="/terms-and-conditions"
                        element={<TermsAndConditions />}
                    />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                </Routes>
            </div>
            {sticky && (
                <button
                    className="fixed bottom-1.5 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-blue-800 bg-white text-xl text-blue-800"
                    onClick={scrollToTop}
                >
                    <BsChevronDoubleUp />
                </button>
            )}
        </Router>
    )
}

export default App
