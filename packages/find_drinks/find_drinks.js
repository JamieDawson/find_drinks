// jshint esversion: 9

/**
 * @description null
 * @param {ParamsType} params list of command parameters
 * @param {?string} commandText text message
 * @param {!object} [secrets = {}] list of secrets
 * @return {Promise<SlackBodyType>} Response body
 */

function getAllIngredients(allDrinkInfo) {
	const collectIngredients = [];

	if (allDrinkInfo.data.drinks[0].strIngredient1 != null)
		collectIngredients.push(allDrinkInfo.data.drinks[0].strIngredient1);

	if (allDrinkInfo.data.drinks[0].strIngredient2 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient2);

	if (allDrinkInfo.data.drinks[0].strIngredient3 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient3);

	if (allDrinkInfo.data.drinks[0].strIngredient4 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient4);

	if (allDrinkInfo.data.drinks[0].strIngredient5 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient5);

	if (allDrinkInfo.data.drinks[0].strIngredient6 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient6);

	if (allDrinkInfo.data.drinks[0].strIngredient7 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient7);

	if (allDrinkInfo.data.drinks[0].strIngredient8 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient8);

	if (allDrinkInfo.data.drinks[0].strIngredient9 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient9);

	if (allDrinkInfo.data.drinks[0].strIngredient10 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient10);

	if (allDrinkInfo.data.drinks[0].strIngredient11 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient11);

	if (allDrinkInfo.data.drinks[0].strIngredient12 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient12);

	if (allDrinkInfo.data.drinks[0].strIngredient13 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient13);

	if (allDrinkInfo.data.drinks[0].strIngredient14 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient14);

	if (allDrinkInfo.data.drinks[0].strIngredient15 != null)
		collectIngredients.push(' ' + allDrinkInfo.data.drinks[0].strIngredient15);

	return collectIngredients;
}

const axios = require('axios');
async function _command(params, commandText, secrets = {}) {
	const result = [];
	const allDrinkInfo = await axios.get(
		`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` +
			params.drink_param
	);

	if (!allDrinkInfo.data.drinks) {
		return {
			response_type: 'in_channel', // or `ephemeral` for private response
			text:
				'Could not find drink! If your drink has more than 1 work, wrap them in quotation marks. ',
		};
	}

	var allIngredients = [];
	const drinkName = allDrinkInfo.data.drinks[0].strDrink;
	const drinkInstructions = allDrinkInfo.data.drinks[0].strInstructions;
	allIngredients = getAllIngredients(allDrinkInfo);

	return {
		response_type: 'in_channel', // or `ephemeral` for private response
		text:
			'*Drink name*: ' +
			drinkName +
			'\n' +
			'*Ingredients*: ' +
			allIngredients +
			'\n' +
			'*How to make it*: ' +
			drinkInstructions +
			'\n',
	};
}

const main = async (args) => ({
	body: await _command(
		args.params,
		args.commandText,
		args.__secrets || {}
	).catch((error) => ({
		response_type: 'ephemeral',
		text: `Error: ${error.message}`,
	})),
});
module.exports = main;
