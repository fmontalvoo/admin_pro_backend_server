const search = async (req, res) => {
    try {
        const query = req.query.q || '';
        return res.status(200).json({
            query
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { search };