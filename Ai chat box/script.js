

const API_KEY = "AIzaSyDjdv38fciEsfp11MPpx7jsk1WWXK_9Bcw";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendButton = document.getElementById("send-message");
const speakButton = document.querySelector(".bot-speaker");
const fileInput = document.getElementById("file-input");
const fileUploadWrapper= document.querySelector(".file-upload-wrapper");
const chatbotToggler = document.getElementById("chatbot-toggler");
const Closechatbot = document.getElementById("close-chatbot");
const userData = {
    file: {
        data: null,
        mime_type: null
    }
}
const initiInputHeight=messageInput.scrollHeight;

const createMessageElement = (content, className) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", className);
    messageElement.innerHTML = content;
    chatBody.appendChild(messageElement);

    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    return messageElement;
};

const handleOutgoingMessage = (e) => {
    e.preventDefault();
    const userMessage = messageInput.value.trim();
    messageInput.value = "";

    if (!userMessage) return;
    let imageHTML = "";
    if (userData.file && userData.file.data) {
        imageHTML = `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attchment"  style ="display :block;"/>`;
    }
    if (!userMessage && imageHTML) {
        createMessageElement(`<div class="message-text">${imageHTML}</div>`, "user-message");
    }
    else if (userMessage && imageHTML) {
        createMessageElement(`<div class="message-text"> ${imageHTML}</div>`, "user-message");
    }
    else if (userMessage) {
        createMessageElement(`<div class="message-text"><strong>You:</strong> ${userMessage}</div>`, "user-message");
    }

    userData.file = null;
    const thinkingMessage = `
  <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
      <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9z"></path>
  </svg>
  <div class="message-text">
      <div class="thinking-indicator">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
      </div>
  </div>`;

    const thinkingElement = createMessageElement(thinkingMessage, "bot-message", "thinking");

    setTimeout(() => generateBotResponse(userMessage, thinkingElement), 200);
};
let textTospeak = "";


const generateBotResponse = async (userMessage, thinkingElement) => {

    // const messageElement= userMessage.querySelector(".message-text");

    // const userMessage = messageInput.value.trim();
    // if (!userMessage) return;

    // createMessageElement(`<div class="message-text"><strong>You:</strong> ${userMessage}</div>`, "user-message");

    messageInput.value = "";
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: "Your name is Alexssa. You are a chatbot that provides information strictly about loans. You can read and reply to image files, but only if they contain loan-related details. If the user uploads an image or file that is unrelated to loans, politely refuse to process it. Similarly, if the user asks about anything other than loans, politely decline to answer."
                        },
                        ...(userData.file && userData.file.data ? [{ inline_data: userData.file }] : [])
                    ]
                },
                {
                    role: "user",
                    parts: [
                        { text: userMessage }
                    ]
                }
            ]
        })
    };


    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error?.message || "Something went wrong");

        // const  botMessage =
        const botMessage = data.candidates[0]?.content?.parts[0]?.text || "No response received";

        textTospeak = botMessage;
        thinkingElement.remove();

        console.log(textTospeak + "textTospeak inline 123");


        createMessageElement(`
            <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024 "margin-top="10px">
                        <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>    
            </svg>
            
            <div class="message-text"><strong></strong> ${botMessage}</div>
             <button class="bot-speaker123">
                    <span class="material-symbols-outlined">
                        volume_up
                        </span>
                </button>
            
            `, "bot-message")

            ;

        setTimeout(() => {
            document.querySelectorAll('.bot-speaker123').forEach(button => {
                button.addEventListener('click', function () {
                    const messageText = this.parentNode.querySelector('.message-text').innerText;
                    speakText(messageText);
                });
            });
        }, 100);

    } catch (error) {
        console.error("Error:", error);
        createMessageElement(`<div class="message-text"><strong>Bot:</strong> Sorry, something went wrong. Please try again.</div>`, "bot-message");
    }
};

sendButton.addEventListener("click", generateBotResponse);


messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleOutgoingMessage(event);
    }
});

messageInput.addEventListener("input", () => {
    messageInput.style.height = ` ${initiInputHeight}px`;
    messageInput.style.height = ` ${messageInput.scrollHeight}px`;
    document.querySelectorAll(".chart-form").style.borderRadius = messageInput.scrollHeight >
    initiInputHeight ? "15px":"32px";
});


//mic button
const micButton = document.getElementById("mic-message");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

micButton.addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    messageInput.value = transcript;
    sendMessage(new Event("submit"));

};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};


function speakText(textTospeak) {
    if (!textTospeak || textTospeak.trim() === "") {
        console.warn("No text available to speak.");
        return;
    }

    console.log("Speaking text:", textTospeak);
    const speech = new SpeechSynthesisUtterance(textTospeak.trim());

    speech.lang = 'en-US';
    speech.pitch = 1.2;
    speech.rate = 1;

    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        console.warn("No voices available yet. Retrying...");
        setTimeout(() => speakText(textTospeak), 500);
        return;
    }

    speech.voice = voices.find(voice => voice.name === 'Google UK English Male') || voices[0];

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded:", window.speechSynthesis.getVoices().map(voice => voice.name));
};

const observer = new MutationObserver(() => {
    document.querySelectorAll('.bot-speaker123').forEach(button => {
        button.removeEventListener('click', handleSpeak);
        button.addEventListener('click', handleSpeak);
    });
});

function handleSpeak(event) {
    const messageText = event.currentTarget.closest('.bot-message').querySelector('.message-text').innerText;
    speakText(messageText);
}

observer.observe(document.body, { childList: true, subtree: true });


//file input handle

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    // console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("active");
        const base64Data = e.target.result.split(",")[1];


        userData.file = {
            data: base64Data,
            mime_type: file.type
        }

        fileInput.value = "";
    }
    reader.readAsDataURL(file);
});

//file upload
document.getElementById("file-upload").addEventListener("click", () => fileInput.click());

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
Closechatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));