import { useState } from 'react';
import RecipeChoices from './RecipeChoices';
import drinksData from '../drinks.json';


const BaristaForm = () => {
    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    const ingredients = {
        'temperature' : ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
    }

    const [drink, setDrink] = useState('');
    const [trueRecipe, setTrueRecipe] = useState({});

    const [correct_temp, setCheckedTemperature] = useState('');
    const [correct_syrup, setCheckedSyrup] = useState('');
    const [correct_milk, setCheckedMilk] = useState('');
    const [correct_blended, setCheckedBlended] = useState('');

    const onCheckAnswer = () => {
        if (!ingredients['temperature'].includes(inputs['temperature'])) {
            alert("For temperature, that isn't even an option!");
        }
        if (!ingredients['syrup'].includes(inputs['syrup'])) {
            alert("For syrup, that isn't even an option!");
        }
        if (!ingredients['milk'].includes(inputs['milk'])) {
            alert("For milk, that isn't even an option!");
        }
        if (!ingredients['blended'].includes(inputs['blended'])) {
            alert("For blended, that isn't even an option!");
        }

        if (trueRecipe.temperature != inputs['temperature']) {
            setCheckedTemperature('wrong');
        } else {
            setCheckedTemperature('correct');
        }

        if (trueRecipe.syrup != inputs['syrup']) {
            setCheckedSyrup('wrong');
        } else {
            setCheckedSyrup('correct');
        }

        if (trueRecipe.milk != inputs['milk']) {
            setCheckedMilk('wrong');
        } else {
            setCheckedMilk('correct');
        }

        if (trueRecipe.blended != inputs['blended']) {
            setCheckedBlended('wrong');
        } else {
            setCheckedBlended('correct');
        }
    };

    const getNextDrink = () => {
        const drinksList = drinksData.drinks;
        const randomIndex = Math.floor(Math.random() * drinksList.length);
        const randomDrink = drinksList[randomIndex];

        setDrink(randomDrink.name);
        setTrueRecipe(randomDrink.ingredients);
    }

    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': ''
        });
        setCheckedTemperature('');
        setCheckedSyrup('');
        setCheckedMilk('');
        setCheckedBlended('');
        getNextDrink();
    };

    const feedbackText = (state) => {
        if (state === 'correct') return '✓ Correct';
        if (state === 'wrong') return '✗ Wrong';
        return '';
    };

    return (
        <div>
            <h2>Hi, I'd like to order a:</h2>
            <div className="drink-container">
                <h2>{drink}</h2>
                <button onClick={onNewDrink}>New Drink</button>
            </div>
            <form className="container">
                <div className="mini-container">
                    <h3>Temperature</h3>
                    <div className={`answer-space ${correct_temp}`}>
                        {inputs["temperature"]}
                    </div>
                    <p className={`feedback ${correct_temp}`}>{feedbackText(correct_temp)}</p>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                        }))}
                        label="temperature"
                        choices={ingredients["temperature"]}
                        checked={inputs["temperature"]}
                    />
                </div>

                <div className="mini-container">
                    <h3>Milk</h3>
                    <div className={`answer-space ${correct_milk}`}>
                        {inputs["milk"]}
                    </div>
                    <p className={`feedback ${correct_milk}`}>{feedbackText(correct_milk)}</p>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                        }))}
                        label="milk"
                        choices={ingredients["milk"]}
                        checked={inputs["milk"]}
                    />
                </div>

                <div className="mini-container">
                    <h3>Syrup</h3>
                    <div className={`answer-space ${correct_syrup}`}>
                        {inputs["syrup"]}
                    </div>
                    <p className={`feedback ${correct_syrup}`}>{feedbackText(correct_syrup)}</p>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                        }))}
                        label="syrup"
                        choices={ingredients["syrup"]}
                        checked={inputs["syrup"]}
                    />
                </div>

                <div className="mini-container">
                    <h3>Blended</h3>
                    <div className={`answer-space ${correct_blended}`}>
                        {inputs["blended"]}
                    </div>
                    <p className={`feedback ${correct_blended}`}>{feedbackText(correct_blended)}</p>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                        }))}
                        label="blended"
                        choices={ingredients["blended"]}
                        checked={inputs["blended"]}
                    />
                </div>

            </form>

            <div className="check-answer-wrap">
                <button onClick={onCheckAnswer}>Check Answer</button>
            </div>
        </div>
    )
};

export default BaristaForm;
