import { BrowserRouter } from "react-router-dom";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import AppRoutes from "./pages/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
