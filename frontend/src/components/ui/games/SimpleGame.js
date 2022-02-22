import { useState, useEffect } from "react"
import SingleCard from "./SingleCard"

const cardImages = [
    { "src": "/img/memoryCard1.png", matched:false },
    { "src": "/img/memoryCard2.jpg", matched:false  },
    { "src": "/img/memoryCard3.jpg", matched:false  },
    { "src": "/img/memoryCard5.jpg", matched:false  },
    { "src": "/img/memoryCard5.jpg", matched:false  },
    { "src": "/img/memoryCard6.jpg", matched:false },
    { "src": "/img/memoryCard7.jpg", matched:false },
    { "src": "/img/memoryCard8.jpg", matched:false  },
    { "src": "/img/memoryCard9.jpg", matched:false },
    { "src": "/img/memoryCard10.jpg", matched:false },
    { "src": "/img/memoryCard11.jpg" , matched:false },
    { "src": "/img/memoryCard12.jpg", matched:false },
    { "src": "/img/memoryCard13.jpg", matched:false },
    { "src": "/img/memoryCard14.jpg", matched:false },
    { "src": "/img/memoryCard15.jpg", matched:false  }
]

const SimpleGame = () => {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [realCards, setRealCards] = useState([])
    const [choiceOne,setChoiceOne] =useState(null)
    const [choiceTwo,setChoiceTwo] =useState(null)

    useEffect(() => {
        if (cards) {
            setRealCards(cards)
        }

    }, [cards, realCards])

    const resetTurn =()=>{
        setChoiceOne(null)
        setChoiceTwo(null)
    }

    useEffect(()=>{
        if (choiceOne && choiceTwo){
            if(choiceOne.src ===choiceTwo.src){
                setCards(prevCards =>{
                    return prevCards.map(card =>{
                        if( card.src=== choiceOne.src){
                            return {...card, matched:true}
                        }
                        else{
                            return card
                        }
                    })
                })
                console.log("cards matched")
                resetTurn()
            }
            else{
                console.log("te karty nie sa takie same")
                setTimeout(()=> resetTurn(), 1000)
               
            }
        }

    },[choiceOne,choiceTwo])
  

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setCards(shuffledCards)
        setTurns(0)
        console.log(shuffledCards)
    }
   

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
        console.log(choiceOne + "pierwsza karta" + choiceTwo + "drugaKarta")
      
    }


    return (
        <div className="className SimpleGame">
            <button onClick={() => shuffleCards()}> Start</button>
            {cards && (
                <div className="card-grid">
                    {
                        cards.map(card => {
                            
                            return (
                               <SingleCard 
                               key={card.id} 
                               card={card}
                               handleChoice={handleChoice}
                               flipped={card === choiceOne || card === choiceTwo || card.matched}
                               />
                            )
                        })
                    }
                </div>
            )}
        </div>
    )


}

export default SimpleGame