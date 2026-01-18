document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  // Knowledge Base
  const knowledgeBase = {
    plastic: {
      keywords: ["plastic", "bottle", "container", "wrapper"],
      response:
        "For plastics, remember: **Reduce** and **Reuse** first! ♻️<br><br>1. **Reduce**: Buy products with less packaging.<br>2. **Reuse**: Can this bottle be a planter or storage?<br>3. **Recycle**: Rinse and check the number (1, 2, and 5 are most recyclable).<br>🚫 *Tip: Avoid single-use plastics!*",
    },
    metal: {
      keywords: ["metal", "can", "tin", "aluminum", "foil"],
      response:
        "Metal is infinitely recyclable! 🥫<br><br>1. **Reuse**: Old tins make great organizers.<br>2. **Recycle**: Clean it out and place in the recycle bin. <br>✅ *Aluminum cans are one of the most efficient materials to recycle.*",
    },
    organic: {
      keywords: [
        "food",
        "scrape",
        "banana",
        "peel",
        "organic",
        "compost",
        "leaves",
      ],
      response:
        "Don't trash it, **Compost** it! 🍎<br><br>1. **Reduce**: Plan meals to avoid waste.<br>2. **Compost**: Turn scraps into soil nutrient. Avoid putting meat or dairy in standard compost bins.",
    },
    ewaste: {
      keywords: [
        "phone",
        "laptop",
        "battery",
        "electronic",
        "charger",
        "e-waste",
        "computer",
      ],
      response:
        "⚠️ **E-Waste Caution!** ⚠️<br><br>Electronics contain valuable but hazardous materials.<br>1. **Reuse**: Donate working electronics.<br>2. **Recycle**: Take to a certified e-waste drop-off center. DO NOT throw in regular trash.",
    },
    hazardous: {
      keywords: ["battery", "chemical", "paint", "bulb", "poison", "hazardous"],
      response:
        "⚠️ **Hazardous Material** ⚠️<br><br>For safety, please **contact your local sanitation department** for disposal instructions. Do not put this in the regular trash or recycling.",
    },
    greeting: {
      keywords: ["hello", "hi", "hey", "start"],
      response:
        "Hello! 👋 I'm EcoWise. Ask me about disposing of plastics, metals, electronics, or food waste!",
    },
  };

  const defaultResponse =
    "I'm not sure about that specific item. 🤔<br>However, a general rule is to see if you can **Reuse** it first. If it's hazardous/chemical, please contact local authorities.";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (text) {
      addMessage(text, "user");
      processInput(text);
      userInput.value = "";
    }
  });

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = sender === "bot" ? "🌱" : "👤";

    const content = document.createElement("div");
    content.className = "content";
    content.innerHTML = text; // Allow HTML for formatting

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function processInput(text) {
    // Simulate thinking delay
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = defaultResponse;

      // Simple keyword matching
      for (const category in knowledgeBase) {
        const keys = knowledgeBase[category].keywords;
        if (keys.some((key) => lowerText.includes(key))) {
          response = knowledgeBase[category].response;
          break;
        }
      }

      // Hardcoded "batteries" override for safety if not caught by hazardous
      if (lowerText.includes("battery") && !response.includes("Hazardous")) {
        response = knowledgeBase.hazardous.response;
      }

      addMessage(response, "bot");
    }, 600);
  }
});
