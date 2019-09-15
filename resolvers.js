import { buildLike, Op } from "./helpers";

export default {
    User: {
      properties: (parent, args, context, info) => parent.getProperties(),
    },
    Property: {
      user: (parent, args, context, info) => parent.getUser(),
    },
    Query: {
      properties: (parent, args, { db }, info) => db.property.findAll(),
      users: (parent, args, { db }, info) => db.user.findAll(),
      property: (parent, { id }, { db }, info) => db.property.findByPk(id),
      user: (parent, { id }, { db }, info) => db.user.findByPk(id),
      searchProperties: (parent, args, { db }, info) => {        
        return db.property.findAll({
            where: {
                [Op.or]: buildLike(db.property.searchFields, args.query)
            },
            include: [db.user]
        });
      },
      searchUsers: (parent, args, { db }, info) => {        
        return db.user.findAll({
            where: {
                [Op.or]: buildLike(db.user.searchFields, args.query)
            },
            include: [db.property]
        });
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