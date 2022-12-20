let deckId;
const button = document.getElementById("new-deck-button")
const newCardsButton = document.getElementById("draw-cards-button")
let drawCardsDiv = document.getElementById("cards-div")
let card1Container = document.getElementById("card1-container")
let card2Container = document.getElementById("card2-container")
let remainingCards = document.getElementById("remaining-cards")
let computerScore = 0;
let myScore = 0;

const computerSocreDisplayed = document.getElementById("computer-score")
const myScoreDisplayd = document.getElementById("me-score")
const winnerMessage = document.getElementById("winner-message")



button.addEventListener("click", function(e){
    e.preventDefault()
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id;
    })

    newCardsButton.disabled = false
    
    card1Container.innerHTML = ``
    card2Container.innerHTML = ``
    computerScore = 0
    myScore = 0
    computerSocreDisplayed.textContent = computerScore
    myScoreDisplayd.textContent = myScore
    winnerMessage.innerText = "War Game"
    remainingCards.innerText = "52";



    
})

newCardsButton.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            const card1Image = data.cards[0].image
            const card2Image = data.cards[1].image

            console.log(data)
            const card1 = data.cards[0]
            const card2 = data.cards[1]

            card1Container.innerHTML = `
            <img src="${card1Image}" alt="card one">         
            `

            card2Container.innerHTML = `
            <img src="${card2Image}" alt=" card two">          
            `

            remainingCards.innerText = data.remaining

            determineWinnerCard(card1, card2)

            computerSocreDisplayed.textContent = computerScore
            myScoreDisplayd.textContent = myScore

            if (data.remaining === 0) {
                newCardsButton.disabled = true

                if (myScore > computerScore){
                    winnerMessage.innerText = "You have won the War Game!"
    
                }else if (myScore > computerScore){
                    winnerMessage.innerText = "You have lost the War Game!"
                    
                } else {
                    winnerMessage.innerText = "It's a tie"
                }
            }
           
            
           

        })
})


function determineWinnerCard(card1, card2) {
    const cardValues = ["2", "3", "4", "5","6", "7","8", "9","10", 
        "JACK","QUEEN", "KING","ACE"]
     
    const card1ValueIndex = cardValues.indexOf(card1.value)
    const card2ValueIndex = cardValues.indexOf(card2.value)

    if(card1ValueIndex > card2ValueIndex) {
        computerScore +=1;
    } else if(card1ValueIndex < card2ValueIndex){
        myScore +=1;
    }

}



//********************************************
// Practice area
//********************************************


// const people = [
//     {name: "Jack", hasPet: true, age: 12},
//     {name: "Jill", hasPet: false, age: 18},
//     {name: "Alice", hasPet: true, age: 22},
//     {name: "Bob", hasPet: false, age: 32},
// ]



// function filterArray(array, callback){
//     const resultingArray = []
    
//     for (let item of array) {
//         const shouldBeIncluded = callback(item)
//         if (shouldBeIncluded) {
//             resultingArray.push(item)
//         }
//     }
//     return resultingArray
// }

// const peopleWithPets = filterArray(people, function(person){
//     return person.hasPet
// })

// console.log(peopleWithPets)


//********************************************
// Second practice
//********************************************

// const voters = [
//     {name: "Joe", email: "joe@joe.com", voted: true},
//     {name: "Jane", email: "jane@jane.com", voted: true},
//     {name: "Bo", email: "bo@bo.com", voted: false},
//     {name: "Bane", email: "bane@bane.com", voted: false},
// ]


// const finalVoters = voters.filter(voter => voter.voted).map(voter => voter.email)

// console.log(finalVoters)