import { deploy } from './deps.ts';
import { get_beast, getBeastHandler } from './beasts/get_beast.ts';
import { add_beast, addBeastHandler } from './beasts/add_beast.ts';

deploy.init({
    env: true
  })
const guildId = '1054498243100295170'

deploy.commands.bulkEdit([
    get_beast,
    add_beast
], guildId)

deploy.commands.all()
    .then((cmds)=> console.log(cmds))
deploy.handle('get_beast', getBeastHandler)
deploy.handle('add_beast', addBeastHandler)