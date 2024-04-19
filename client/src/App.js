import React from 'react';
import Home from './pages/home';
import Form from './pages/form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./style.css"
import { FormContextProvider } from './context/context';

const App = () => {
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
