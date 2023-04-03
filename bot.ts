import { deploy } from './deps.ts';

const guildId = '1054498243100295170'

deploy.init({
    env: true
  })
  
deploy.commands.bulkEdit([
    {
        name: 'stuff',
        description: 'A test command',
        options: [
            {
                name: 'an_option',
                description: 'An option',
                type: deploy.ApplicationCommandOptionType.STRING,
                required: true
            }
        ]
    },
    {
        name: 'things',
        description: 'A second test command',
        options: [
            {
                name: 'another_option',
                description: 'An optional option',
                type: deploy.ApplicationCommandOptionType.STRING,
                required: false
            }
        ]
    }
], guildId)

deploy.handle('stuff', (d)=>{
    const stuff = d.option<string>('an_option')
    d.reply(`You said ${stuff}`)
})

deploy.handle('things', (d)=>{
    const things = d.option<string | undefined>('another_option')
    d.reply(`You said ${things !== undefined ? things: 'nothing'}`)
})