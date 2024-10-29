const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2404-FTB-MT-WEB-PT/events";

let state = {
    parties: [],
};

async function fetchParties() {
    try {
        const response = await fetch(API_URL)
        const data = await response.json();
        state.parties = data
        renderParties()
    } catch (error) {
        console.error("Error fetching parties:", error)
    }
}

async function addParty(newParty) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newParty),
        });
        const createdParty = await response.json()
        state.parties.push(createdParty)
        renderParties()
    } catch (error) {
        console.error("Error adding party:", error)
    }
}

async function deleteParty(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        state.parties = state.parties.filter(party => party.id !== id);
        renderParties()
    } catch (error) {
        console.error("Error deleting party:", error)
    }
}

function renderParties() {
    const partiesContainer = document.getElementById("parties-container")
    partiesContainer.innerHTML = "";
    state.parties.forEach(party => {
        const partyElement = document.createElement("div")
        partyElement.innerHTML = `
            <h3>${party.name}</h3>
            <p>Date: ${party.date}</p>
            <p>Time: ${party.time}</p>
            <p>Location: ${party.location}</p>
            <p>Description: ${party.description}</p>
            <button onclick="deleteParty('${party.id}')">Delete</button>
        `;
        partiesContainer.appendChild(partyElement)
    })
}

function handleFormSubmit(event) {
    event.preventDefault()
    const newParty = {
        name: event.target.name.value,
        date: event.target.date.value,
        time: event.target.time.value,
        location: event.target.location.value,
        description: event.target.description.value,
    };
    addParty(newParty)
    event.target.reset()
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("party-form")
    form.addEventListener("submit", handleFormSubmit)
    fetchParties()
});
