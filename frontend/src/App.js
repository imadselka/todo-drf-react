import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { NotePage } from "./pages/NotePage";
import { NotesListPage } from "./pages/NotesListPage";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<NotesListPage />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
