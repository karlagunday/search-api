import { modelSearch } from "./helpers";

export default {
    User: {
      properties: (parent, args, context, info) => parent.getProperties(),
    },
    Property: {
      user: (parent, args, context, info) => parent.getUser(),
    },
    SearchResult: {
        __resolveType (obj, context, info) {
            if (obj.firstName) {
                return 'User';
            }
            if (obj.street) {
                return 'Property';
            }
            return null;
        }
    },
    Query: {
      properties: (parent, args, { db }, info) => db.property.findAll(),
      users: (parent, args, { db }, info) => db.user.findAll(),
      property: (parent, { id }, { db }, info) => db.property.findByPk(id),
      user: (parent, { id }, { db }, info) => db.user.findByPk(id),
      searchProperties: (parent, args, { db }, info) => {        
        return modelSearch(db.property, args.query, {
            include: [db.user]
        })
      },
      searchUsers: (parent, args, { db }, info) => {
        return modelSearch(db.user, args.query, {
            include: [db.property]
        })
      },
      search: (parent, args, { db }, info) => {
        return {
            users: modelSearch(db.user, args.query, {
                include: [db.property]
            }),
            properties: modelSearch(db.property, args.query, {
                include: [db.user]
            })
        };
      }
    },
    Mutation: {
      createUser: (parent, { firstName, lastName }, { db }, info) =>
        db.user.create({
          firstName: firstName,
          lastName: lastName,
        }),
      updateUser: (parent, { firstName, lastName }, { db }, info) =>
        db.user.update({
          firstName: firstName,
          lastName: lastName,
        },
        {
          where: {
            id: id
          }
        }),
      deleteUser: (parent, {id}, { db }, info) =>
        db.user.destroy({
          where: {
            id: id
          }
        }),        
      createProperty: (parent, { street, city, state, zip, rent, userId }, { db }, info) =>
        db.property.create({
          street: street,
          city: city,
          state: state,
          zip: zip,
          rent: rent,
          userId: userId
        }),
      updateProperty: (parent, { street, city, state, zip, rent }, { db }, info) =>
        db.property.update({
          street: street,
          city: city,
          state: state,
          zip: zip,
          rent: rent
        },
        {
          where: {
            id: id
          }
        }),
      deleteProperty: (parent, {id}, { db }, info) =>
        db.property.destroy({
          where: {
            id: id
          }
        })
    }
  };