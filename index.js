'use strict';
const Alexa = require('ask-sdk')

// Custom modules
const wordFinder = require('./wordFinder')
const amazonIntents = require('./lib/amazonIntents')
const en = require('./data/en')
const cn = require('./data/const')

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {

        return handlerInput.responseBuilder
            .speak(en.welcome)
            .reprompt(en.reprompt)
            .withSimpleCard('Tip of my tongue (TOMT)', en.welcome)
            .getResponse();
    }
};



const synonymIntentWithStart = {
  canHandle: (handlerInput) => {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'synonym_with_start';
  },

  handle: async (handlerInput) => {

    const request = handlerInput.requestEnvelope.request;
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    let prompt = en.synonymIntentWithStart.prompt


    if(currentIntent.slots.rel_syn.value != undefined && currentIntent.slots.start.value != undefined){
        let start = currentIntent.slots.start ? `${currentIntent.slots.start.value}*` : null
        prompt = await wordFinder({rel_syn: currentIntent.slots.rel_syn.value, sp: start})

        if(!prompt.length)
            return handlerInput.responseBuilder
            .speak(en.synonymIntentWithStart.notfound)
            .reprompt(en.reprompt_help)
            .getResponse();
        
        const len = prompt.length < cn.MAX_WORDS ? prompt.length: cn.MAX_WORDS;
        
        let words = ''
        prompt.slice(0, len).forEach((val) => {
            words += (val.word + ", ")
        })
        words = words.substr(0, words.length - 2) + "."
        
        let speech = en.synonymIntent.found_words + words
        
        if(prompt.length === 1) {
          speech = 'The word I found is '+words
        }
        
        return handlerInput.responseBuilder
            .speak(speech)
            .withShouldEndSession(true)
            .withSimpleCard(currentIntent.slots.rel_syn.value, 'Words found are: '+ words)
            .getResponse();
    }
    else
        return handlerInput.responseBuilder
        .addDelegateDirective(currentIntent)
        .getResponse();

  }

};


const synonymIntentWithTopic = {
  canHandle: (handlerInput) => {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name == 'synonym_with_topic';
  },

  handle: async (handlerInput) => {

    const request = handlerInput.requestEnvelope.request;
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    let prompt = en.synonymIntentWithTopic.prompt


    if(currentIntent.slots.rel_syn.value != undefined && currentIntent.slots.topic.value != undefined){
        let topic = currentIntent.slots.topic ? currentIntent.slots.topic.value : null
        prompt = await wordFinder({rel_syn: currentIntent.slots.rel_syn.value, topics: topic})

        if(!prompt.length)
            return handlerInput.responseBuilder
            .speak(en.synonymIntentWithTopic.notfound)
            .reprompt(en.reprompt_help)
            .getResponse();
        
        const len = prompt.length < cn.MAX_WORDS ? prompt.length: cn.MAX_WORDS;
        
        let words = ''
        prompt.slice(0, len).forEach((val) => {
            words += (val.word + ", ")
        })
        words = words.substr(0, words.length - 2) + "."
        
        let speech = en.synonymIntent.found_words + words
        
        if(prompt.length === 1) {
          speech = 'The word I found is '+words
        }
        
        return handlerInput.responseBuilder
            .speak(speech)
            .withShouldEndSession(true)
            .withSimpleCard(currentIntent.slots.rel_syn.value, 'Words found are: '+ words)
            .getResponse();
    }
    else if(currentIntent.slots.rel_syn.value != undefined && currentIntent.slots.topic.value == undefined){
        return handlerInput.responseBuilder
                           .speak("What is topic you are looking for?")
                           .reprompt("just say the word for topic")
                           .addElicitSlotDirective('topic')
                           .getResponse()
    }
    else
        return handlerInput.responseBuilder
        .addDelegateDirective(currentIntent)
        .getResponse();

  }

};


const synonymIntent = {
  canHandle: (handlerInput) => {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && (request.intent.name === 'synonym')
  },

  handle: async (handlerInput) => {

    const request = handlerInput.requestEnvelope.request;
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    let prompt = en.synonymIntent.prompt


    if(currentIntent.slots.rel_syn.value != undefined){
        prompt = await wordFinder({rel_syn: currentIntent.slots.rel_syn.value})

        if(!prompt.length)
            return handlerInput.responseBuilder
            .speak(en.synonymIntent.notfound)
            .reprompt(en.reprompt_help)
            .getResponse();
        
        const len = prompt.length < cn.MAX_WORDS ? prompt.length: cn.MAX_WORDS;
        
        let words = ''
        prompt.slice(0, len).forEach((val) => {
            words += (val.word + ", ")
        })
        words = words.substr(0, words.length - 2) + "."
        
        let speech = en.synonymIntent.found_words + words
        
        if(prompt.length === 1) {
          speech = 'The word I found is '+words
        }
        
        return handlerInput.responseBuilder
            .speak(speech)
            .withShouldEndSession(true)
            .withSimpleCard(currentIntent.slots.rel_syn.value, 'Words found are: '+ words)
            .getResponse();
    }
    else
        return handlerInput.responseBuilder
        .addDelegateDirective(currentIntent)
        .getResponse();

  }

};


// Reverse dictionary handler
const closelyLinkedIntent = {
  canHandle: (handlerInput) => {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'closely_linked';
  },

  handle: async (handlerInput) => {

    const request = handlerInput.requestEnvelope.request;
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    let prompt = en.closelyLinkedIntent.prompt


    if(currentIntent.slots.rel_trg.value != undefined){

        prompt = await wordFinder({rel_trg: currentIntent.slots.rel_trg.value})

        if(!prompt.length)
            return handlerInput.responseBuilder
            .speak(en.closelyLinkedIntent.notfound)
            .reprompt(en.reprompt_help)
            .getResponse();
        
        const len = prompt.length < cn.MAX_WORDS ? prompt.length: cn.MAX_WORDS;
        
        let words = ''
        prompt.slice(0, len).forEach((val) => {
            words += (val.word + ", ")
        })
        words = words.substr(0, words.length - 2) + "."
        
        let speech = en.closelyLinkedIntent.found_words + words
        
        if(prompt.length === 1) {
          speech = 'The word I found is '+words
        }
        
        return handlerInput.responseBuilder
            .speak(speech)
            .withShouldEndSession(true)
            .withSimpleCard(currentIntent.slots.rel_trg.value, 'Words found are: '+ words)
            .getResponse();
    }
    else
        return handlerInput.responseBuilder
        .addDelegateDirective(currentIntent)
        .getResponse();

  }

};



// Reverse dictionary handler
const reverseDictHandler = {
  canHandle: (handlerInput) => {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'reverse_dict';
  },

  handle: async (handlerInput) => {

    const request = handlerInput.requestEnvelope.request;
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    let prompt = en.reverseIntent.prompt



    if(currentIntent.slots.ml.value != undefined){

        prompt = await wordFinder({ml: currentIntent.slots.ml.value})

        if(!prompt.length)
            return handlerInput.responseBuilder
            .speak(en.reverseIntent.notfound)
            .reprompt(en.reprompt_help)
            .getResponse();
        
        const len = prompt.length < cn.MAX_WORDS ? prompt.length: cn.MAX_WORDS;
        
        let words = ''
        prompt.slice(0, len).forEach((val) => {
            words += (val.word + ", ")
        })
        words = words.substr(0, words.length - 2) + "."
        
        let speech = en.reverseIntent.found_words + words
        
        if(prompt.length === 1) {
          speech = 'The word I found is '+words
        }
        
        return handlerInput.responseBuilder
            .speak(speech)
            .withShouldEndSession(true)
            .withSimpleCard(currentIntent.slots.ml.value, 'Words found are: '+ words)
            .getResponse();
    }
    else
        return handlerInput.responseBuilder
        .addDelegateDirective(currentIntent)
        .getResponse();

  }


};


// Description intent handler
const descHelpIntentHandler = {
  
  canHandle: (handlerInput) => {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && (request.intent.name === 'description_help' || request.intent.name == 'description_with_topic');
  },

  handle: async (handlerInput) => {

    const request = handlerInput.requestEnvelope.request;
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    
    let prompt = en.descIntent.prompt


    if(request.dialogState == 'IN_PROGRESS' || request.dialogState == 'COMPLETED'){

        if(currentIntent.slots.rel_jjb.value != undefined){

            prompt = await wordFinder({ml: currentIntent.slots.rel_jjb.value, topics: currentIntent.slots.topics.value})

            if(!prompt.length)
                return handlerInput.responseBuilder
                .speak(en.descIntent.notfound)
                .reprompt(en.reprompt_help)
                .getResponse();
            
            let len = 6;
            
            if(prompt.length < 6) len = promp.length;
            
            let words = '';
            prompt.slice(0, len).forEach((val, i) => {
              words += val.word
              words += ', '
            })
            words = words.substr(0, words.length - 1) +  "."
            var speech = en.found_words+ words

            return handlerInput.responseBuilder
                                .speak(speech)
                                .withShouldEndSession(true)
                                .withSimpleCard('Found words', words)
                                .getResponse();
        }

        else {
            return handlerInput.responseBuilder
                               .speak("what is the thing you are describing?")
                               .addElicitSlotDirective('rel_jjb', currentIntent)
                               .getResponse();
        }
    }
    else
        return handlerInput.responseBuilder
        .speak("what is the thing you are describing?")
        .addElicitSlotDirective('rel_jjb', currentIntent)
        .getResponse();

  }

};



// Exporting final Module 🥂
exports.handler = Alexa.SkillBuilders.standard()
     .addRequestHandlers(
                    LaunchRequestHandler,
                    descHelpIntentHandler,
                    reverseDictHandler,
                    closelyLinkedIntent,
                    synonymIntent,
                    synonymIntentWithStart,
                    synonymIntentWithTopic,
                    amazonIntents.HelpHandler,
                    amazonIntents.StopHandler
                  )
     .addErrorHandlers(amazonIntents.ErrorHandler)
     // .withTableName('gitpress_1')
     // .withAutoCreateTable(true)
     .lambda();