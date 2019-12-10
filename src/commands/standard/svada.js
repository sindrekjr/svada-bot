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
                    key: 'typ',
                    type: 'string',
                    prompt: 'Definer type svada.',
                    default: 'generell'
                }
            ]
        });
        
        this.translate = client.translate; 
    }

    run(msg, {typ}) {
        this.get(this.typeToParam(typ), svada => {
            return msg.say(svada);
        });
    }

    get(typ, callback) {
        phantom.create().then(function(instance) {
            return instance.createPage();
        }).then(function(page) {
            let URL = `http://svadagenerator.no/${(typ) ? `?type=${typ}` : ''}`;
            page.open(URL).then(function(status) {
                if (status === 'success') {
                    page.includeJs('http://svadagenerator.no/js/svadagenerator/svadagenerator.js').then(function () {
                        page.evaluate(function () {
                            return document.getElementById('sentence').innerHTML;
                        }).then(function (sentence) {
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
