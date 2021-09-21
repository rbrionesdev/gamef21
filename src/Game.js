import { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import './App.css'

const App = () => {
  const [userChoice, setUserChoice] = useState('rock')
  const [computerChoice, setComputerChoice] = useState('rock')
  const [userPoints, setUserPoints] = useState(0)
  const [computerPoints, setComputerPoints] = useState(0)
  const [turnResult, setTurnResult] = useState(null)
  const [result, setResult] = useState('Let\'s see who wins')
  const [gameOver, setGameOver] = useState(false)
  const choices = ['rock', 'paper', 'scissors']

  const handleClick = (value) => {
    setUserChoice(value)    
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  // Reload page
  const reset = () => {
    window.location.reload()
  }

  useEffect(() => {
    const comboMoves = userChoice + computerChoice
    if (userPoints <= 4 && computerPoints <= 4) {
      if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
        // userPoints.current += 1
        const updatedUserPoints = userPoints + 1
        setUserPoints(updatedUserPoints)
        setTurnResult('User gets the point!')
        if (updatedUserPoints === 2){
          setResult('User Won')
          const gameOff = true
          setGameOver(gameOff)
        }
      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        // computerPoints.current += 1
        const updatedComputerPoints = computerPoints + 1
        setComputerPoints(updatedComputerPoints)
        setTurnResult('Computer gets the point!')
        if (updatedComputerPoints === 2) {
          setResult('Computer Won')
          const gameOff = true
          setGameOver(gameOff)
        }
      }

      if (comboMoves === 'paperpaper' || comboMoves === 'rockrock' || comboMoves === 'scissorsscissors') {
        setTurnResult('No one gets a point!')
      }
    }
  }, [computerChoice, userChoice])

  return (
    <div className="Game-Container">
      <h1 className='Title'>Rock-Paper-Scissors</h1>
      <div className='score'>
        <h1 className='Points'>User Points: {userPoints}</h1>
        <h1 className='Points'>Computer Points: {computerPoints}</h1>
      </div>

      <div className='choice'>
        <div className='choice-user'>
          <img className='user-choice' src={`../images/${userChoice}.png`} alt=''></img>
        </div>
        <div className='choice-computer'>
          <img className='computer-choice' src={`../images/${computerChoice}.png`} alt=''></img>
        </div>
      </div>
      
      <div className='Options'>
        {choices.map((choice, index) =>
          <Button.Group>
            <Button inverted color='black'
              key={index} 
              onClick={() => handleClick(choice)} 
              disabled={gameOver}>
              {choice} 
            </Button>
          </Button.Group>
        )}
      </div>
      
      <div className='result'>
        <h1 hidden={gameOver}>Turn Result: {turnResult}</h1>
        <div>
          <h1>Final Result: {result}</h1>
        </div>
      </div>
      
      <div>
        {gameOver && 
          <Button inverted color='green' onClick={() => reset()}>Try Again</Button>
        }
      </div>
    </div>
  )
}

export default App
