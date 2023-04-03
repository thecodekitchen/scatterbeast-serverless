import { deploy } from '../deps.ts'
import { db } from '../db.ts'
import { EmptyBeast } from '../types.ts'
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
    db.sendCommand('JSON.GET', 'creatures', '$.creatures')
        .then((dbReply)=> {
            console.log(dbReply.value())
            if(dbReply.value()){
                const beastJSON:string[] = JSON.parse(dbReply.value()?.valueOf() as string)[0]
                let beast = EmptyBeast
                beastJSON.map((json)=>{
                    const currentBeast:Beast = JSON.parse(json)
                    if(currentBeast['Name']==name){
                        beast = currentBeast
                    }
                })
                if(beast!=EmptyBeast){
                    d.reply(`Here is the creature data you requested: ${beast.toString()}`)
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