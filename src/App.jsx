import { useState } from 'react'
import './App.css'
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

function App() {
  const [inputText, setInputText] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const completion = await openai.chat.completions.create({
          model: "o1-preview",
          messages: [
              { role: "system", content: "You are a game designer using Pygame." },
              {
                  role: "user",
                  content: {inputText},
              },
          ],
        });
      const data = await completion.json()
      setResponse(JSON.stringify(data, null, 2))
      console.log(data);
    } catch (error) {
      console.error('Error:', error)
      setResponse('An error occurred while fetching the data.')
    }
  }

  return (
    <div className="App">
      <h1>Text Input and API Request</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here..."
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>API Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  )
}

export default App
