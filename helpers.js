export const sequelize = require('sequelize');
export const Op = sequelize.Op;
export const searchQuery = (model, str, opt = {}) => {
    let columns = model.searchFields.map ((field) => {
        return sequelize.col(field);
    });
    return model.findAll({
        where: [
            {}, // sequelize version no longer support array in where function. this is to trick it
            sequelize.where(
                sequelize.fn("concat_ws", " ", ...columns), 
                {
                    [Op.iLike]: '%' + str + "%"
                }
            )
        ],
        include: opt.include,
        limit: opt.limit
    });
}