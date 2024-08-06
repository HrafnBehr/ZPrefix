/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Store').del()
  await knex('Store').insert([
    {userID: 'rowValue1', itemName: "Wizard's War Staff", description: 'The staff of a Wizard', quantity:3},
    {userID: 'rowValue2', itemName: "Fighter's Battle Sword", description: 'The sword of a Fighter', quantity:3},
    {userID: 'rowValue3', itemName: "Rogue's Recurve Bow", description: 'The bow of a Rogue', quantity:2},
    {userID: 'rowValue4', itemName: "Barbarian's Savage Axe", description: 'The axe of a Barbarian', quantity:3},
    {userID: 'rowValue5', itemName: "Sorceror's Arcabe Focus", description: 'The focus of a Sorceror', quantity:4},
    {userID: 'rowValue6', itemName: "Druid's Brambled Claw", description: 'The claw of a Druid', quantity:3},
    {userID: 'rowValue7', itemName: "Paladin's Blessed Mace", description: 'The mace of a Paladin', quantity:5},
    {userID: 'rowValue8', itemName: "Cleric's Sanctified Hammer", description: 'The hammer of a Cleric', quantity:1},
    {userID: 'rowValue6', itemName: "Bard's Unplayable Lute", description: 'the lute of a Bard', quantity:3}
  ]);
};
