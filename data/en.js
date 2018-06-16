module.exports = {
	


	'cancel': 
		'Thank you for using T.O.M.T . Feel free to ask me anytime.',
	
	


	'reprompt': 
		'Try saying "Find a word that means rear of boat". Say "help" to know more.',
	
	

	'reprompt_help': 'Try using a different description or saying a closely linked word or a start letter with synonyms for better results.',

	'help': 
		'Hello there! You can search for words by saying \'Find a word that means rear of boat\' or \'synonym\' to search for synonyms.\
		You can find synonyms starting with a letter by saying \'synonym that start with b\'.\
		To find synonyms about a certain topic say \'synonym with topic\'\
		\'Find words that often appear with wreak\' will give you a list of words like havoc and revenge.\
		If you want help with describing a noun, say \'help me describe\'',
	
	


	'welcome': 
		'Hey, Welcome to T.O.M.T . You can look for word by their meaning, synonyms, closely associated words,\
		or get help with writing descriptions. Say \'help\' to know your options.',
	
	


	'found_words': 'I have found a list of words for you. The top results are ',

	
	descIntent: {
		'prompt': 'Try saying \'help me describe\'',

		'notfound': 'Sorry! Couldn\'t find a word matching your description. Please try again.',

		'reprompt': 'You can try again by rephrasing your description. Hint: try to use both topic \
		and noun for which adjective is needed.'
	},

	reverseIntent: {

		'prompt': 'Try saying "find a word that means rear part of boat"',

		'notfound': 'Sorry! Couldn\'t find a word matching your description. Please try again.',

		'reprompt': 
			'You can try again by rephrasing your description. \
			Hint: try giving a different meaning or use synonyms and specify starting letter if you remember that.',

		'found_words': "I have found a list of words for you. The top results are "
	},
	
	closelyLinkedIntent: {

		'prompt': 'Try saying "what is the word that appears with media"',

		'notfound': 'Sorry! Couldn\'t find a word matching your description. Please try again.',

		'reprompt': 
			'You can try again by rephrasing your description. \
			Please use a different word or specify a synonym with starting letter.',

		'found_words': "I have found a list of words for you. The top results are "
	},

	synonymIntent: {

		'prompt': 'Try saying "Search for a word which means rear part of a boat"',

		'notfound': 'Sorry! Couldn\'t find a word matching your description. Please try again.',

		'reprompt': 
			'You can try again by rephrasing your description. \
			Hint: Use a different synonym or specify starting letter by saying \'synonyms starting with\'',

		'found_words': "I have found a list of words for you. The top results are "
	},

	synonymIntentWithStart: {

		'prompt': 'Try saying "Search for a word which means rear part of a boat"',

		'notfound': 'Sorry! Couldn\'t find a word matching your description. Please try again.',

		'reprompt': 
			'You can try again by rephrasing your description. \
			Hint: try giving synonyms or closely related words',

		'found_words': "I have found a list of words for you. The top results are "
	},

	synonymIntentWithTopic: {

		'prompt': 'Try saying "Search for a word which means rear part of a boat"',

		'notfound': 'Sorry! Couldn\'t find a word matching your description. Please try again.',

		'reprompt': 
			'You can try again by rephrasing your description. \
			Hint: try giving synonyms or antonyms or closely related words',

		'found_words': "I have found a list of words for you. The top results are "
	}
	
}