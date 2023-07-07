const PasteBin = require("../Schema/PasteBin.model");

async function Add_Content(content) {
    return await PasteBin.create(content)
}

async function Get_Content(id) {
    let content = await PasteBin.findById(id)
    if (!content) {
        throw new Error('Invalid Id')
    }
    return content
}

module.exports = {Add_Content, Get_Content}