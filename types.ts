enum Rarity {
    Common = 'Common',
    Uncommon = 'Uncommon',
    Rare = 'Rare',
    Legendary = 'Legendary',
    Unique = 'Unique'
}

enum Biome {
    Voidflower = 'Voidflower Expanse',
    Glacial = 'Glacial Tropics',
    Lavaforge = 'Lavaforge Rift',
    Arcane = 'Arcane Oasis',
    Suburban = 'Suburban'
}

type Ability = {
    'Name': string,
    'Power': number
}

type Beast = {
    'Name': string,
    'Description': string,
    'Rarity': Rarity,
    'Biome': Biome,
    'HP': number,
    'DEF': number,
    'SPD': number,
    'Ability': Ability
}

const EmptyBeast: Beast = {
    'Name': '',
    'Description': '',
    'Biome': Biome.Suburban,
    'Rarity': Rarity.Common,
    'DEF': 0,
    'SPD': 0,
    'HP': 0,
    'Ability': {
        'Name': '',
        'Power': 0
    }
};

export type { Beast, Ability }
export {Rarity, Biome, EmptyBeast}