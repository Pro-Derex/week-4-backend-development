const index = (req, res) => {
    res.status(200).json({data: req.body});
};

const detach = (req, res) => {

};

module.exports = {index, detach};