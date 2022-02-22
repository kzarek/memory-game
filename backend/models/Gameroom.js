const { Schema, model, ObjectId } = require('mongoose');

const gameroomSchema = new Schema({
    name: { type: String, required: true },
    currentPlayerId: { type: String, required: true },
    players: { type: [], required: true },
    tiles: { type: [], required: true },
    isActive: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false }
});

module.exports = model('Gameroom', gameroomSchema);
