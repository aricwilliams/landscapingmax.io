import React, { useState } from "react";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

function SubmissionForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const apiUrl = "https://your-api-endpoint.com/submit";

  const handleSubmit = () => {
    const params = `option=${selectedOption}`;
    fetch(`${apiUrl}?${params}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case "1":
        return <Slide1 />;
      case "2":
        return <Slide2 />;
      case "3":
        return <Slide3 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Select an option:</h1>
      <button onClick={() => setSelectedOption("1")}>Option 1</button>
      <button onClick={() => setSelectedOption("2")}>Option 2</button>
      <button onClick={() => setSelectedOption("3")}>Option 3</button>
      {selectedOption && (
        <div>
          <h2>You selected: {selectedOption}</h2>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <header>{/* Render header component here */}</header>
      <main>
        {/* Render selected component here */}
        {renderComponent()}
      </main>
      <footer>{/* Render footer component here */}</footer>
    </div>
  );
}

export default SubmissionForm;
