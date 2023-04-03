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
    Arcane = 'Arcane Oasis'
}

type Ability = {
    'Name': string,
    'Power': number
}

type Beast = {
    'Name': string,
    'Rarity': Rarity,
    'Biome': Biome,
    'HP': number,
    'DEF': number,
    'SPD': number,
    'Ability': Ability
}

export type { Beast, Rarity, Biome, Ability }