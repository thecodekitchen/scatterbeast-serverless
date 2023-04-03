import { deploy } from './deps.ts';
import { get_beast, getBeastHandler } from './beasts/get_beast.ts';
import { add_beast, addBeastHandler } from './beasts/add_beast.ts';

deploy.init({
    env: true
  })
const guildId = '1054498243100295170'

deploy.commands.bulkEdit([
    add_beast,
    get_beast
], guildId)

deploy.commands.guild(guildId)

deploy.handle('add_beast', addBeastHandler)
deploy.handle('get_beast', getBeastHandler)