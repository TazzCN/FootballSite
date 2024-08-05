import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Player: a
    .model({
      playerId: a.id(),
      firstName: a.string(),
      lastName: a.string(),
      age: a.integer(),
      position: a.string(),
      stats: a.hasOne("PlayerStats", "playerId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  PlayerStats: a
    .model({
      player: a.belongsTo("Player", "playerId"),
      gamesPlayed: a.integer(),
      goals: a.integer(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
