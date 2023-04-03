import { deploy } from './deps.ts';
import { get_beast, getBeastHandler } from './beasts/get_beast.ts';
import { add_beast, addBeastHandler } from './beasts/add_beast.ts';

deploy.init({
    env: true
  })
const guildId = '1054498243100295170'

// deploy.commands.delete("1092146274578473061")
// deploy.commands.delete("1092229890549497946")
// deploy.commands.delete("1092231614219698186")
// deploy.commands.bulkEdit([
//     add_beast
// ], guildId)

deploy.commands.all()
    .then((cmds)=> console.log(cmds))

deploy.handle('add_beast', addBeastHandler)