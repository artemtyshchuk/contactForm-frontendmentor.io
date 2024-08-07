import { Container } from "components/Container";
import "./App.css";
import { ContactUsComponent } from "components/ContactUsComponent";

function App() {
  return (
    <div className="App">
      <Container>
        <ContactUsComponent />
      </Container>
    </div>
  );
}

export default App;
