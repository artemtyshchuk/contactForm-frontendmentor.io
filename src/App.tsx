import { Container } from "components/Container";
import "./App.css";
import { ContactUsComponent } from "components/ContactUsComponent";
import { ContactUsComponentTypes } from "types";

function App() {
  const handleFormSubmit = (data: ContactUsComponentTypes) => {
    console.log("form submitted", data);
  };

  return (
    <div className="App">
      <Container>
        <ContactUsComponent onSubmit={handleFormSubmit} />
      </Container>
    </div>
  );
}

export default App;
