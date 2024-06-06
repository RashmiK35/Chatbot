import React, { useState, useCallback } from 'react';
import axios from 'axios';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageInput, MessageList, TypingIndicator, Message } from '@chatscope/chat-ui-kit-react';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { debounce } from 'lodash';
import { HighlightCode } from './HighlightCode';
import '../styles.css';

const OLLAMA_API_URL = 'http://localhost:8000/api/ollama';

async function runOllamaModel(model, prompt) {
  try {
    const response = await axios.post(OLLAMA_API_URL, {
      model,
      prompt
    });

    if (response.status === 200) {
      const responseData = response.data;

      if (responseData.status) {
        return responseData.data; // data object directly
      } else {
        console.error('API Error:', responseData.message);
        return { status: false, message: 'Failed to fetch response from Ollama.' };
      }
    } else {
      console.error('HTTP Error:', response.status);
      return { status: false, message: 'Failed to fetch response from Ollama.' };
    }
  } catch (error) {
    console.error('Error fetching response from Ollama:', error);
    return { status: false, message: 'Failed to fetch response from Ollama.' };
  }
}

function Chatbot() {
  const [messages, setMessages] = useState([{ message: 'Welcome', sender: 'Assistant', type: 'text' }]);
  const [loading, setLoading] = useState(false);

  const debouncedProcessMessageToOllama = useCallback(
    debounce(async (message) => {
      setLoading(true);
      try {
        const response = await runOllamaModel('llama3', message);
        console.log('Response:', response); 

        if (response) {
          const messageObject = {
            message: response, 
            sender: 'Assistant',
            type: 'text'
          };
          setMessages((prevMessages) => [...prevMessages, messageObject]);
        } else {
          console.error('Error: Failed to fetch response from Ollama.');
          setMessages((prevMessages) => [...prevMessages, {
            message: 'Sorry, no response received. Please try again later.',
            sender: 'Assistant',
            type: 'text'
          }]);
        }
      } catch (error) {
        console.error('Error fetching response from Ollama:', error);
        setMessages((prevMessages) => [...prevMessages, {
          message: 'Sorry, try again later.',
          sender: 'Assistant',
          type: 'text'
        }]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const [selectedOption, setSelectedOption] = useState('');
  
  const handleSend = (message) => {
    let appendedMessage = message;


    switch (selectedOption) {
      case 'option1':                             //sca
        appendedMessage += ' Fix the vulnerabilities in this SCA(Security Control Assessment) and provide me only step by step solution';
        break;
      case 'option2':                             //SAST
        appendedMessage += 'Fix the vulnerabilities in this code and provide me only the fixed code';
        break;
      case 'option3':                             //web
        appendedMessage += 'Fix this issue related to the vulnerabilities, provide me solution without any vulnerabilities';
        break;
      default:
        break;
    }
    
    const newMessage = { message, sender: 'User', type: 'text' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // debouncedProcessMessageToOllama(`${message}provide me Fix the vulnerabilities in this code and return only the fixed code `);

    
    debouncedProcessMessageToOllama(appendedMessage);
  };
  

  return (
    <div className="App">
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, height: '600px', marginBottom: '50px', width: '50%', overflow: 'auto', backgroundColor: "white" }}>
      <div style={{ marginTop: '20px', backgroundColor: "yellowgreen"}}>
          <label>
            <input 
            type="radio" 
            name="option" 
            value="option1" 
            checked={selectedOption === 'option1'} 
            onChange={() => setSelectedOption('option1')}
            /> SCA &nbsp; &nbsp;
          </label>
          <label>
            <input 
            type="radio" 
            name="option" 
            value="option2" 
            checked={selectedOption === 'option2'} 
            onChange={() => setSelectedOption('option2')} 
            /> SAST &nbsp; &nbsp;
          </label>
          <label>
            <input 
            type="radio" 
            name="option" 
            value="option3" 
            checked={selectedOption === 'option3'} 
            onChange={() => setSelectedOption('option3')} 
            /> Web Application Security &nbsp; &nbsp;
          </label>
        </div>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth" 
              typingIndicator={loading ? <TypingIndicator content="typing" /> : null}
            >
              {messages.map((msg, index) => (
                <div key={index} style={{ textAlign: msg.sender === 'User' ? 'right' : 'left' }}>
                  {msg.sender === 'User' && msg.type === 'text' ?   (
                    <div style={{ textAlign: 'right', marginBottom: '5px', marginTop: '50px' }}>
                      <h5 style={{ textAlign: 'right' }}><b>Query</b></h5>
                      <div style={{
                        textAlign: 'left',
                        paddingLeft: "10px",
                        marginLeft: "80px",
                        backgroundColor: 'skyblue',
                        overflowX: 'auto',
                        borderRadius: '5px',
                        color: 'black',
                        padding: '8px',
                        whiteSpace: 'pre-wrap',
                        width: 'calc(100% - 90px)' // Adjust the width based on padding and margin
                      }}>
                        <Message 
                          key={index} model={{
                            message: (msg.message),
                            position: "single"
                          }} 
                          style={{
                            justifyContent: "left",
                            overflow:"auto"
                          }} 
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '5px', marginTop: '50px' }}>
                      <h5><b>Response</b></h5>

                      <HighlightCode language='javascript' style={dracula}>
                            {msg.message}
                      </HighlightCode>
                      {/* {msg.type === 'code' ? (
                          <HighlightCode language='javascript' style={dracula}>
                            {msg.message}
                          </HighlightCode>
                        ) : (
                          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            {msg.message}
                          </pre>
                        )} */}
                      </div>
                  )}
                </div>
              ))}
            </MessageList>
            <MessageInput placeholder="Ask vulnerabilities related queries" onSend={handleSend} style={{ textAlign: "left" }} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;











//  const processMessageToDeepInfra = async (message) => {
//     const formattedMessage = `[] ${message} [/]`;
//     const apiRequestBody = { input: formattedMessage };

//     try {
//       const response = await axios.post(MODEL_URL, apiRequestBody, {
//         headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
//       });

//       const responseData = response.data.results[0].generated_text;
//       const formattedResponse = formatResponse(responseData);
//       setMessages((prevMessages) => [...prevMessages, { message: formattedResponse, sender: 'Assistant' }]);
//     } catch (error) {
//       console.error('Error fetching response from Deep Infra:', error);
//       setMessages((prevMessages) => [...prevMessages, { message: 'Sorry, Try again later.', sender: 'Assistant' }]);
//     } finally {
//       setIsTyping(false);
//     }
//  };

//  const formatResponse = (response) => {
//     return response.replace(/\[CODE\]/g, ' ``` ');
//   };



// function Chatbot() {
//   const [messages, setMessages] = useState([{ message: "Welcome", sentTime: "just now", sender: "ChatGPT" }]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = { message, direction: 'outgoing', sender: "user" };

//     const newMessages = [...messages, newMessage];
    
//     setMessages(newMessages);
//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     let apiMessages = chatMessages.map((messageObject) => {
//         let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
//         return { role, content: messageObject.message };
//       });
    
//       const apiRequestBody = {
//         model: "gpt-3.5-turbo",
//         messages: [systemMessage, ...apiMessages],
//       };
    
//       try {
//         const response = await axios.post("", apiRequestBody, {
//           headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
//         });
//         setMessages([...chatMessages, { message: response.data.choices[0].message.content, sender: "ChatGPT" }]);
//       } catch (error) {
//         if (error.response?.status === 429) {
//           console.warn('API rate limit reached. Retrying...');
//         } else {
//           console.error('Error fetching response from ChatGPT:', error);
//           setMessages([...chatMessages, { message: 'Sorry, Try again later.', sender: "ChatGPT" }]);
//         }
//       } finally {
//         setIsTyping(false);
//       }
//     }




// ---------------------------------------------------------------------------------------------------------------------



// import { useState, useEffect } from 'react';
// import './App.css';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import axios from 'axios';

// const API_KEY = "sk-proj-ysowTSXH23Y5SaYWAvwbT3BlbkFJlSGQ9yNXfG8P8XUBhoAB";

// const systemMessage = { "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience." };

// function Chat() {
//   const [messages, setMessages] = useState([{ message: "Hello, I'm ChatGPT! Ask me anything!", sentTime: "just now", sender: "ChatGPT" }]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = { message, direction: 'outgoing', sender: "user" };
//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);
//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if (messageObject.sender === "ChatGPT") role = "assistant";
//       else role = "user";
//       return { role: role, content: messageObject.message };
//     });

//     const apiRequestBody = { "model": "gpt-3.5-turbo", "messages": [systemMessage, ...apiMessages] };

//     try {
//       const response = await axios.post("", apiRequestBody, {
//         headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" }
//       });
//       setMessages([...chatMessages, { message: response.data.choices[0].message.content, sender: "ChatGPT" }]);
//       setIsTyping(false);
//     } catch (error) {
//       console.error('Error fetching response from ChatGPT:', error);
//       setMessages([...chatMessages, { message: 'Sorry, I encountered an error.', sender: "ChatGPT" }]);
//       setIsTyping(false);
//     }
//   }

//   return (
//     <div className="App">
//       <div style={{ position: "relative", height: "800px", width: "700px" }}>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
//               {messages.map((message, i) => {
//                 console.log(message)
//                 return <Message key={i} model={message} />
//               })}
//             </MessageList>
//             <MessageInput placeholder="Type message here" onSend={handleSend} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
// }

// export default Chat;








// -------------------------------------------------------------------------------------------------------------------------------------------------


// import React, { useState, useCallback } from 'react';
// import axios from 'axios';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageInput, MessageList, TypingIndicator, Message} from '@chatscope/chat-ui-kit-react';
// import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { debounce } from 'lodash'; 
// import { HighlightCode } from './HighlightCode';
// import Loader from './loder';
// import '../styles.css';

// const API_KEY = 'ankZuexYNZbmfDohy9ezWpoV1HjnIcZ1';
// const MODEL_URL = 'https://api.deepinfra.com/v1/inference/Phind/Phind-CodeLlama-34B-v2';

// function Chatbot() {
//   const [messages, setMessages] = useState([{ message: 'Welcome', sender: 'Assistant', type: 'text' }]);

//   const [loading, setLoading] = useState(false);

//   const debouncedProcessMessageToDeepInfra = useCallback(
//     debounce(async (message) => {
//       // setLoading(true)
//       try {
//         const response = await axios.post(MODEL_URL, { input: message }, {
//           headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
//         });

//         const responseData = response.data.results[0].generated_text;
//         const messageObject = { message: responseData, sender: 'Assistant', type: 'text' };
//         if (responseData.includes('[CODE]')) {
//           // messageObject.type = 'code';
//         }
//         setMessages((prevMessages) => [...prevMessages, messageObject]);
//         setLoading(false)
        
        
//       } catch (error) {
        
//         console.error('Error fetching response from Deep Infra:', error);
//         setMessages((prevMessages) => [...prevMessages, { message: 'Sorry, try again later.', sender: 'Assistant', type: 'text' }]);
//         setLoading(false)
//       }
//     }, 1),
//     []
//   );

//   const handleSend = (message) => {

//     setLoading(true);
//     const newMessage = { message, sender: 'User', type: 'text' };
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     debouncedProcessMessageToDeepInfra(`${message}provide me Fix the vulnerabilities in this code and return only the fixed code as output without any description`);
//   };

//   function formatCodeSnippet(code) {
//     // Remove leading and trailing whitespace from each line
//     const formattedCode = code.split(';').map(line => line.trim()).join(';\n');
//     return formattedCode;
// }

// function parv(html) {
//     let doc = new DOMParser().parseFromString(html, 'text/html');
//     let text = doc.body.textContent || "";
//     return formatCodeSnippet(text);
// }

// const isOutgoing = false;


//   return (
//     <div className="App">
//       <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, height: '600px', marginBottom: '50px', width: '50%', overflow: 'auto' }}>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList
//               scrollBehavior="smooth" 
//               typingIndicator={loading ? <TypingIndicator content="typing" /> : null}
//             >
//               {messages.map((msg, index) => (
//                 <div key={index} style={{ textAlign: msg.sender === 'User' ? 'right' : 'left' }}>
//                   {msg.sender === 'User' && msg.type === 'text' ?   (
//                   <div style={{ textAlign: 'right', marginBottom: '5px', marginTop: '50px' }}>
//                     <h5 style={{ textAlign: 'right' }}><b>Query</b></h5>
//                     <div style={{
//                       textAlign: 'left',
//                       paddingLeft: "10px",
//                       marginLeft: "80px",
//                       backgroundColor: 'skyblue',
//                       overflowX: 'auto',
//                       borderRadius: '5px',
//                       color: 'black',
//                       padding: '8px',
//                       whiteSpace: 'pre-wrap',
//                       width: 'calc(100% - 90px)' // Adjust the width based on padding and margin
//                     }}>

//                       <Message 
//                       key={index} model={{
//                         message: (msg.message),
//                         position: "single"
//                       }} 
//                       style={{
//                         justifyContent: "left",
//                         overflow:"auto"
//                       }} 
//                       />
                    
//                     </div>
//                   </div>
//                   ) : (
//                     <div style={{ marginBottom: '5px', marginTop: '50px' }}>
//                       <h5><b>Response</b></h5>
//                       <HighlightCode language={msg.type === 'code' ? 'javascript' : 'text'} style={dracula}>
//                         {msg.message}
//                       </HighlightCode>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             {/* {loading && <Loader onSend={loading}/>} */}
//             </MessageList>
//             <MessageInput placeholder="Ask vulnerabilities related queries" onSend={handleSend} style={{ textAlign: "left" }} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
// }

// export default Chatbot;
