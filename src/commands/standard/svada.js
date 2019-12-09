'use strict';

const {Command} = require('discord.js-commando');
const phantom = require('phantom');

module.exports = class Svada extends Command {
    constructor(bot) {
        super(bot, {
            name: 'svada',
            group: 'standard',
            memberName: 'svada',
            description: 'Henter svada fra svadagenerator.no.'
        });
    }

    run(msg, {content}) {
        this.get(content, svada => {
            return msg.say(svada);
        });
    }

    get(type = 'generell', callback) {
        phantom.create().then(function(instance) {
            return instance.createPage();
        }).then(function(page) {
            page.open('http://svadagenerator.no/').then(function(status) {
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
};
