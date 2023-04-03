import { deploy } from '../deps.ts'
import { db } from '../db.ts'
import type { Beast } from '../types.ts'

export const get_beast:deploy.ApplicationCommandPartial = {
    name: 'get_beast',
    description: 'Get a beast',
    options: [
        {
            name: 'name',
            description: 'What beast are you looking for?',
            type: deploy.ApplicationCommandOptionType.STRING,
            required: true
        }
    ]
}

export function getBeastHandler (d: deploy.ApplicationCommandInteraction) {
    const name = d.option<string>('name')
    console.log('Searched Name: ', name)
    db.sendCommand('JSON.GET', 'beasts', '$.beasts')
        .then((dbReply)=> {
            if(dbReply.value()){
                const beastList:Beast[] = JSON.parse(dbReply.value()?.valueOf() as string)[0]
                console.log('Beast list: ', beastList)
                const beast: Beast = beastList.filter((beast)=>{ beast['Name']==name})[0]
                console.log(beast)
                if(beast){
                    console.log('Beast final form: ', beast)
                    d.respond({
                        content: `You added ${beast['Name']} to the database!`,
                        embeds: [
                            {
                                title: beast['Name'],
                                fields: [
                                    {name: 'Description', value: beast['Description']},
                                    {name: 'Rarity', value: beast['Rarity']},
                                    {name: 'Biome', value: beast['Biome']},
                                    {name: 'HP', value: beast['HP'].toString()},
                                    {name: 'DEF', value: beast['DEF'].toString()},
                                    {name: 'SPD', value: beast['SPD'].toString()},
                                    {name: 'Ability', value: beast['Ability']['Name']},
                                    {name: 'Ability Power', value: beast['Ability']['Power'].toString()}
                                ],
                                image: {
                                    url: beast['Image'],
                                    height: 200,
                                    width: 200
                                }
                            }
                        ]
                    })
                }
                else{
                    d.reply("Couldn't find your beast. You sure it was added?")
                }
            }
            else {
                d.reply('Failed to connect to database.')
            }
        })
}