import { searchQuery } from "./helpers";
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
        return searchQuery(db.property, args.query, {
            include: [db.user]
        })
      },
      searchUsers: (parent, args, { db }, info) => {
        return searchQuery(db.user, args.query, {
            include: [db.property]
        })
      },
      search: (parent, args, { db }, info) => {
        return {
            users: searchQuery(db.user, args.query, {
                include: [db.property]
            }),
            properties: searchQuery(db.property, args.query, {
                include: [db.user]
            })
        };
      },
      autosuggest: async (parent, args, { db }, info) => {
        let users = await searchQuery(db.user, args.query);
        let properties = await searchQuery(db.property, args.query);
        return {
          users: users.map((user) => {
            let values = db.user.searchFields.map((field) => {
              return user[field];
            });
            return values.join(" ");
          }),
          properties: properties.map((property) => {
            let values = db.property.searchFields.map((field) => {
              return property[field];
            });
            return values.join(" ");
          }),
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