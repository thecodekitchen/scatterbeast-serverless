import { deploy } from '../deps.ts'
import { db } from '../db.ts'
import { Biome, Rarity } from '../types.ts'
import type { Beast} from '../types.ts'

export const add_beast:deploy.ApplicationCommandPartial = {
    name: 'add_beast',
    description: 'Create a new beast!',
    options: [
        {
            name: 'Name',
            description: "What is your beast's name?",
            type: deploy.ApplicationCommandOptionType.STRING,
            required: true
        },
        {
            name: 'Description',
            description: "What's the deal with your beast?",
            type: deploy.ApplicationCommandOptionType.STRING,
            required: true
        },
        {
            name: 'Biome',
            description: "Where does your beast hail from?",
            type: deploy.ApplicationCommandOptionType.STRING,
            choices: Object.values(Biome).map((biome)=> {
                return {
                    name: biome,
                    value: biome
                }
            }),
            required: true,
            autocomplete: true
        },
        {
            name: 'Rarity',
            description: "How rare is your beast?",
            type: deploy.ApplicationCommandOptionType.STRING,
            choices: Object.values(Rarity).map((rarity)=> {
                return {
                    name: rarity,
                    value: rarity
                }
            }),
            required: true,
            autocomplete: true
        },
        {
            name: 'HP',
            description: "What is your beast's starting health?",
            type: deploy.ApplicationCommandOptionType.INTEGER,
            required: true
        },
        {
            name: 'DEF',
            description: "What is your beast's base defense?",
            type: deploy.ApplicationCommandOptionType.INTEGER,
            required: true
        },
        {
            name: 'SPD',
            description: "What is your beast's base speed?",
            type: deploy.ApplicationCommandOptionType.INTEGER,
            required: true
        },
        {
            name: 'Ability Name',
            description: "What is your beast's ability called?",
            type: deploy.ApplicationCommandOptionType.STRING,
            required: true
        },
        {
            name: 'Ability Power',
            description: "How powerful is your beast's ability?",
            type: deploy.ApplicationCommandOptionType.INTEGER,
            required: true
        },
        {
            name: 'Image',
            description: "What does your beast look like?",
            type: deploy.ApplicationCommandOptionType.STRING,
            required: true
        }
    ],
}

export function addBeastHandler(d:deploy.ApplicationCommandInteraction){
    
    const newBeast: Beast = {
        'Name': d.option<string>('Name'),
        'Image': d.option<string>('Image'),
        'Description': d.option<string>('Description'),
        'Rarity': d.option<string>('Rarity') as Rarity,
        'Biome': d.option<string>('Biome') as Biome,
        'HP': d.option<number>('HP'),
        'DEF': d.option<number>('DEF'),
        'SPD': d.option<number>('SPD'),
        'Ability': {
            'Name': d.option<string>('Ability Name'),
            'Power': d.option<number>('Ability Power')
        }
    }

    db.sendCommand('JSON.ARRAPPEND', 'beasts', '$.beasts', JSON.stringify(newBeast))
    d.respond({
        content: `You added ${newBeast['Name']} to the database!`,
        embeds: [
            {
                title: newBeast['Name'],
                fields: [
                    {name: 'Description', value: newBeast['Description']},
                    {name: 'Rarity', value: newBeast['Rarity']},
                    {name: 'Biome', value: newBeast['Biome']},
                    {name: 'HP', value: newBeast['HP'].toString()},
                    {name: 'DEF', value: newBeast['DEF'].toString()},
                    {name: 'SPD', value: newBeast['SPD'].toString()},
                    {name: 'Ability', value: newBeast['Ability']['Name']},
                    {name: 'Ability Power', value: newBeast['Ability']['Power'].toString()}
                ],
                image: {
                    url: newBeast['Image'],
                    height: 200,
                    width: 200
                }
            }
        ]
    })
}