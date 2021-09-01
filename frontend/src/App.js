import "./App.css";
import logo from "./assets/Logo.png";
import SignupForm from "./components/SignupForm.js";
import RoundImages from "./components/RoundImages.js";
import WizardText from "./components/WizardText.js";
import RectangleContainer from "./components/RectangleContainer.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "40px",
          }}
        >
          <img src={logo} alt="logo" />
        </div>
      </header>

      <RoundImages />
      <WizardText />
      <RectangleContainer />
      <SignupForm />
    </div>
  );
}

export default App;
