'use strict';

const {Command} = require('discord.js-commando');
const phantom = require('phantom');

module.exports = class Svada extends Command {
    constructor(client) {
        super(client, {
            name: 'svada',
            group: 'standard',
            memberName: 'svada',
            description: 'Henter svada fra svadagenerator.no.',
            args: [
                {
                    key: 'content',
                    type: 'string',
                    prompt: 'Definer type svada.',
                    default: 'generell',
                    /*oneOf: [
                        'generell',
                        'arkiv',
                        'bistand',
                        'forsikring',
                        'forsvar',
                        'helse',
                        'klima',
                        'plan',
                        'bygge',
                        'mat',
                        'universitet',
                        'høgskole',
                        'skole'
                    ]*/
                }
            ]
        });
    }

    run(msg, {content}) {
        this.get(this.typeToParam(content), svada => {
            return msg.say(svada);
        });
    }

    get(type, callback) {
        phantom.create().then(function(instance) {
            return instance.createPage();
        }).then(function(page) {
            page.open('http://svadagenerator.no/?type=' + type).then(function(status) {
                if (status === 'success') {
                    page.includeJs('http://svadagenerator.no/js/svadagenerator/svadagenerator.js').then(function () {
                        page.evaluate(function () {
                            return document.getElementById('sentence').innerHTML;
                        }).then(function (sentence) {
                            console.log(type + ": " + sentence);
                            callback(sentence);
                        });
                    });
                } else {
                    instance.exit();
                }
            })
        });
    }

    typeToParam(input) {
        switch(input.toLowerCase()) {
            default: 
            case 'generell':
                return 'Generell+svada';
            case 'arkiv':
                return 'Arkivsvada'; 
            case 'bistand':
                return 'Bistandssvada';
            case 'forsikring':
                return 'Forsikringssvada';
            case 'forsvar': 
                return 'Forsvarssvada';
            case 'helse': 
                return 'Helseadministrativ+svada';
            case 'klima': 
                return 'Klimasvada';
            case 'plan':
            case 'bygge': 
                return 'Plan-+og+byggesvada';
            case 'mat': 
                return 'Svada+for+Mattilsynet';
            case 'universitet': 
            case 'høgskole': 
            case 'skole':
                return 'Universitets-+og+høgskolesvada';
        }
    }
};
