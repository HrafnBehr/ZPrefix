/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Store').del()
  await knex('Store').insert([
    {userID: 1 , itemName: "A Wizard's War Staff", description: 'The staff of a Wizard', quantity:3},
    {userID: 2 , itemName: "A Fighter's Battle Sword", description: 'The sword of a Fighter', quantity:3},
    {userID: 2 , itemName: "A Rogue's Swiveled Dagger", description: 'The dagger of a Rogue', quantity:2},
    {userID: 2 , itemName: "A Barbarian's Savage Axe", description: 'The axe of a Barbarian', quantity:3},
    {userID: 1 , itemName: "A Sorceror's Arcabe Focus", description: 'The focus of a Sorceror', quantity:4},
    {userID: 1 , itemName: "A Druid's Brambled Claw", description: 'The claw of a Druid', quantity:3},
    {userID: 3 , itemName: "A Paladin's Blessed Mace", description: 'The mace of a Paladin', quantity:5},
    {userID: 1 , itemName: "A Cleric's Sanctified Hammer", description: 'The hammer of a Cleric', quantity:1},
    {userID: 2 , itemName: "A Bard's Unplayable Lute", description: 'the lute of a Bard', quantity:3},
    {userID: 3 , itemName: "A Warlock's Non-euclidian box", description: 'the box of a Warlock', quantity:3},
    {userID: 3 , itemName: "A Ranger's Recurve Bow", description: 'The bow of a Ranger', quantity:1},
  ]);
};
