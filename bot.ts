import { deploy, redis } from './deps.ts';
import type { Beast } from './types.ts';

deploy.init({
    env: true
  })
const guildId = '1054498243100295170'
const db = await redis.connect({
    hostname: 'redis-14781.c1.us-east1-2.gce.cloud.redislabs.com',
    port: 14781,
    username: 'scatterbot',
    password: Deno.env.get('DB_PASS')
})  

deploy.commands.bulkEdit([
    {
        name: 'get_beast',
        description: 'Display a beast',
        options: [
            {
                name: 'name',
                description: 'What beast are you looking for?',
                type: deploy.ApplicationCommandOptionType.STRING,
                required: true
            }
        ]
    }
], guildId)

deploy.handle('get_beast', (d)=> {
    const name = d.option<string>('name')
    db.sendCommand('JSON.GET', 'creatures', '$.creatures')
        .then((dbReply)=> {
            console.log(dbReply.value())
            if(dbReply.value()){
                const beasts: Beast[] = JSON.parse(dbReply.value()?.valueOf() as string)[0]
                console.log(beasts)
                const beast: Beast = beasts[0]
                if(beast['Name'] == name){
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
})
