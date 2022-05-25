const getUsuarios = (req, res) => {
    res.status(200).json({
        msg: 'Usuarios'
    });
}

module.exports = {
    getUsuarios,
};