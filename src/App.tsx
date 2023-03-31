import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './style/Darkmode/Themes';
import { GlobalStyle } from "./style/Darkmode/Globalstyle";
import Navigation from './layouts/Navigation/Navigation';
import Footer from './layouts/Footer/Footer';
import Home from './pages/Home/Home';
import Frontend from './pages/Frontend/Frontend';
import Backend from './pages/Backend/Backend';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import "bootstrap/dist/css/bootstrap.min.css";
import { Fade } from "react-awesome-reveal";

function App() {

    const [theme, setTheme] = useState("light");

    const themeToggler = () => {
        if (theme === "light") {
        setTheme("dark")
        } else {
        setTheme("light")
        }
    }

    return (
        <Fade duration={2000}>
            <div className="App">
                <Router>
                    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                    <GlobalStyle />
                    <Navigation switchTheme={themeToggler} />

                        <Routes>
                            <Route
                                path="/"
                                element={<Home />}
                            />

                            <Route
                                path="/frontend"
                                element={<Frontend />}
                            />
                            
                            <Route
                                path="/backend"
                                element={<Backend />}
                            />
                            
                            <Route
                                path="*"
                                element={<PageNotFound />}
                            />
                        </Routes>

                    <Footer />
                    </ThemeProvider>
                </Router>
            </div>
        </Fade>
    );
}

export default App;
