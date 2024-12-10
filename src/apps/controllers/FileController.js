class FileController{

    async upload(req, res){
        const { filename} = await req.file;
        
        return res.status(200).json({ url: `uploads/${filename}` });
        
    }
}

module.exports = new FileController();