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
export const Op = require('sequelize').Op;