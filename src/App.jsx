import { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
	// eslint-disable-next-line no-unused-vars
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const allSameValue = dice.every((die) => die.value === dice[0].value);
		setTenzies(allHeld && allSameValue);
	}, [dice]);

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push({
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: nanoid(),
			});
		}
		return newDice;
	}

	function holdDice(id) {
		setDice((oldDice) =>
			oldDice.map((die) =>
				die.id === id ? { ...die, isHeld: !die.isHeld } : die
			)
		);
	}

	const buttonText = tenzies ? "New Game" : "Roll";
	function diceRoller() {
		if (buttonText === "Roll") {
			setDice((oldDice) =>
				oldDice.map((die) =>
					die.isHeld
						? { ...die }
						: { ...die, value: Math.ceil(Math.random() * 6) }
				)
			);
		} else setDice(allNewDice());
	}

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

	return (
		<main>
			{tenzies && <Confetti />}
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click on each die to freeze it at its
				current value between rolls.
			</p>
			<div className="dice-container">{diceElements}</div>
			<button className="button" onClick={diceRoller}>
				{buttonText}
			</button>
		</main>
	);
}
