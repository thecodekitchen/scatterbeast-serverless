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

deploy.commands.delete('test')
deploy.commands.delete('ping')
deploy.commands.delete('stuff')
deploy.commands.delete('stuff', guildId)
deploy.commands.delete('things')
deploy.commands.delete('things', guildId)

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
    db.sendCommand('JSON.GET', '$.creatures')
        .then((dbReply)=> {
            if(dbReply.value()){
                const beasts = JSON.parse(dbReply.value()?.valueOf() as string)
                const beast: Beast = beasts[0]
                if(beast['Name'] == name){
                    d.reply(`Here is the creature data you requested: ${beast}`)
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
