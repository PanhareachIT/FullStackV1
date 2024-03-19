const TOKEN_KEY = "LKJIJOPIEWRJ@#IU)(@U#)*@)#*$)LKJDSFSL:KJ12309802934908"
const REFRESH_KEY = "342080!@DCFS23;ksdfkq23po9[f323@$@#$@#$@$#@#$@#$sjdflajlkjsaf"

const multer = require("multer")
const fs = require("fs")

const isNull = (value) => {
    if (value == "" || value == null || value == undefined) {
        return true;
    } else {
        return false;
    }

}

const Config = {
    image_path: "C:/wamp64/www/image_node"
}

// https://stackoverflow.com/questions/5366849/convert-1-to-0001-in-javascript
exports.invoiceNumber = (number) => {
    var str = "" + (number + 1);
    var pad = "0000"
    var invoice = pad.substring(0, pad.length - str.length) + str;
    return "INV" + invoice; // INV0001, INV0002, INV19999
}

exports.productBarcode = (number) => {
    var str = "" + (number + 1);
    var pad = "P0000"
    var barcode = pad.substring(0, pad.length - str.length) + str;
    return barcode;
}

const removeFile = async (fileName) => {
    console.log("hi" + fileName)
    var filePath = Config.image_path + "/" + fileName
    console.log(filePath)
    // const isExist = await fs.existsSync()
    // if(isExist){
    //     await fs.readFileSync(filePath)
    //     return true
    // }else{
    //     return false
    // }

    // fs.exists(filePath, function(exists) {
    //     if(exists) {
    //         console.log('File exists. Deleting now ...');
    //         fs.unlinkSync(filePath);
    //         return true
    //     } else {
    //         console.log('File not found, so not deleting.');
    //         return false
    //     }
    // });

    try {
        return fs.unlinkSync(filePath);
    } catch (err) {
        console.log(err)
        return false
        // res.status(500).send({
        //   message: "Could not delete the file. " + err,
        // });
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, Config.image_path)
        },
        filename: function (req, file, callback) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            callback(null, file.fieldname + '-' + uniqueSuffix)
        }
    }),
    limits: {
        fileSize: (1024 * 1024) * 3
    },
    fileFilter: function (req, file, callback) {
        if (file.mimetype != "image/png" && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            // not allow 
            callback(null, false)
        } else {
            callback(null, true)

        }
    }
})

module.exports = {
    isNull,
    TOKEN_KEY,
    REFRESH_KEY,
    upload,
    removeFile
}
