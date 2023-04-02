import { deploy } from './deps.ts';

deploy.init({
    env: true
  })
  
deploy.commands.create({
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
})

deploy.handle('stuff', (d)=>{
    const stuff = d.option<string>('stuff')
    d.reply(`You said ${stuff}`)
})