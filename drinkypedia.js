const axios = require('axios');

async function drinkypedia() {
	const theDrink = await axios.get(
		`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=smut`
	);

	console.log(theDrink.data.drinks[0].idDrink);
}

drinkypedia();
