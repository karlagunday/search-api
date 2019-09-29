export default `
type User {
  id: ID!
  firstName: String!
  lastName: String!
  properties: [Property!]!
}
type Property {
  id: ID!
  street: String
  city: String
  state: String
  zip: String
  rent: Int
  userId: ID!
  user: User!
}

type SearchResult {
    users: [User!]
    properties: [Property!]
}

type Autosuggest {
  users: [String!]
  properties: [String!]
}

type Query {
  properties: [Property!]!
  property(id: ID!): Property
  user(id: ID!): User
  users: [User!]!
  searchProperties(query: String!): [Property!]
  searchUsers(query: String!): [User!]
  search(query: String): SearchResult!
  autosuggest(query: String): Autosuggest!
}
type Mutation {
  createUser(firstName: String, lastName: String): User!
  updateUser(id: ID!, firstName: String, lastName: String): [Int!]!
  deleteUser(id: ID!): Int!
  createProperty(street: String, city: String, state: String, zip: String, rent: Int, userId: ID!): Property!
  updateProperty(id: ID!, street: String, city: String, state: String, zip: String, rent: Int): [Int!]!
  deleteProperty(id: ID!): Int!
}
`;