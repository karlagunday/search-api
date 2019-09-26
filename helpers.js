export const sequelize = require('sequelize');
export const Op = sequelize.Op;
export const modelSearch = (model, str, opt) => {
    return model.findAll({
        where: {
            [Op.or]: buildLike(model.searchFields, str)
        },
        include: opt.include
    });
}

export const buildLike = (fields, str) => {
    let like = [];
    fields.forEach((field) => {
        like.push({
            [field]: {
                [Op.iLike]: '%' + str + '%'
            }
        });
    });
    return like;
}