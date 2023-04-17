import { UserEntity } from '../src/entities/UserEntity'

// ========================================================================== //
// Models
// ========================================================================== //

// ========================================================================== //
// Users

const userEntities = [
  {
    id: 1,
    name: 'Test',
    email: 'test@test.test',
    password: '$2a$10$jwJptaE72cNfSlqpTvO8ZOTZvhJlWqrCXbHaRlyKEYB262Wwg10um',
    refreshToken: null,
  },
]

export const users = {
  model: UserEntity,
  entities: userEntities,
  sequence: 'users_id_seq',
}
