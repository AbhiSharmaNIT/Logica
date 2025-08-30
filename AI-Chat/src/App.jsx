import { useState } from "react";
import axios from "axios";
// Step 1: Import the syntax highlighter and a style
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  // Initialize response as an empty string
  const [response, setResponse] = useState("");
  // Step 2: Add state to manage the copy button text
  const [copyText, setCopyText] = useState("Copy");

  const handleClick = async () => {
    // Set a loading message while fetching
    setResponse("Loading....");
    setCopyText("Copy"); // Reset copy button text
    try {
      const result = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDKdhkceDXxipozxZScl5KxUhEDvgwJF2g", // IMPORTANT: Replace with your key
        method: "POST",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const textResponse =
        result.data.candidates[0].content.parts[0].text;
      setResponse(textResponse);
    } catch (error) {
      setResponse("Sorry, something went wrong. Please try again.");
      console.error("Error making the API request", error);
    }
  };

  // Step 3: Create a function to handle copying the code
  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopyText("Copied!");
    setTimeout(() => {
      setCopyText("Copy");
    }, 2000); // Revert back to "Copy" after 2 seconds
  };

  return (
    <>
      <div className="main">
        <h1 style={{ textAlign: "center" }}>LOGICA</h1>
        <div className="chat">
          <textarea
            placeholder="Ask anything to me...."
            style={{ width: "1000px", height: "60px" }}
            rows="10"
            cols="30"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>

          <button className="btn" onClick={handleClick}>
            Generate
          </button>
        </div>
      </div>

      {/* Step 4: Update the JSX to render the styled response box */}
      <div className="response-container">
        {response && (
          <>
            <SyntaxHighlighter language="javascript" style={atomDark} customStyle={{ margin: 0, borderRadius: '0 0 8px 8px' }}>
              {response}
            </SyntaxHighlighter>
          </>
        )}
      </div>
    </>
  );
}

export default App;