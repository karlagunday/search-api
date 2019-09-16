export const Op = require('sequelize').Op;
export const modelSearch = (model, str, opt) => {
    return model.findAll({
        where: {
            [Op.or]: buildLike(model.searchFields, str)
        },
        include: opt.includeModels
    });
}

export const buildLike = (fields, str) => {
    let like = [];
    fields.forEach((field) => {
        like.push({
            [field]: {
                [Op.like]: '%' + str + '%'
            }
        });
    });
    return like;
}