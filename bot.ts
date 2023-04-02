import { deploy } from './deps.ts';

deploy.init({
    env: true
  })
  
  const commands = await deploy.commands.all()
  if (commands.size !== 1) {
    deploy.commands.bulkEdit([
      {
        name: 'ping',
        description: "It's literally ping command. What did you expect?",
        options: [
          {
            name: 'pingarg',
            description: 'Again literally pingArg',
            required: false,
            type: deploy.ApplicationCommandOptionType.STRING
          }
        ]
      }
    ])
  }
  
  deploy.handle('ping', (d) => {
    const arg = d.option<string | undefined>('pingarg')
    d.reply(`Pong! You typed: ${arg !== undefined ? arg : 'nothing'}`)
  })