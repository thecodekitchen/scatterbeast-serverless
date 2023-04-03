import { deploy } from './deps.ts';
import { get_beast, getBeastHandler } from './beasts/get_beast.ts'

deploy.init({
    env: true
  })
const guildId = '1054498243100295170'
  
deploy.commands.bulkEdit([
    get_beast
], guildId)

deploy.handle('get_beast', getBeastHandler)
