import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {

  return (
    <div className="min-h-dvh flex flex-col justify-between items-center bg-gradient-to-b from-[#232526] to-[#414345]">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
