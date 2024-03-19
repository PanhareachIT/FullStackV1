const db = require("../utill/db")

const getAll = async (req, res) => {
    try {
        // Retrieve all roles
        const role = await db.query("SELECT * FROM role")
        // Retrieve total count of roles
        const count = await db.query("SELECT COUNT(role_id) AS TotalRecord FROM role")
        // Send response with total count and roles data
        res.json({
            "total": count,
            "role": role
        })
    } catch (error) {
        // Handle errors if any occur during fetching roles
        console.error("Error fetching roles:", error);
        res.status(500).json({ success: false, error: "An error occurred while fetching roles." });
    }
}

// Name
// Code
// Status
const create = async (req, res) => {
    try {
        const {
            name, code
        } = req.body;
        const sql = "INSERT INTO role (name, code) VALUES (?,?)";
        const param = [name, code];
        const data = await db.query(sql, param);
        res.json({
            message: (data.affectedRows) ? "Insert success!" : "Somthing wrong",
            data: data
        })
    } catch (e) {
        // res.sendStatus(401)  // Unauthorized
        // res.sendStatus(200); // equivalent to res.status(200).send('OK')
        // res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
        // res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
        // res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
        // //If an unsupported status code is specified, the HTTP status is still set to statusCode and the string version of the code is sent as the response body.
        res.sendStatus(500)
    }
}

// const creates = async (req, res) => {
//     try {
//         const {
//             data // array object
//         } = req.body;
//         // way 1
//         // for(var i = 0 ; i < data.length; i++){
//         //     const sql = "INSERT INTO role (Name,Code,Status) VALUES (?,?,?) ";
//         //     const param = [data[i].Name,data[i].Code,data[i].Status];
//         //     var result = await db.query(sql,param)
//         // }

//         // way 2
//         const sql = "INSERT INTO role (name,code,Status) VALUES ? ";
//         var param = []
//         for (var i = 0; i < data.length; i++) {
//             param.push([data[i].Name, data[i].Code, data[i].Status])
//         }
//         var result = await db.query(sql, [param])
//         res.json({
//             message: "Insert success"
//         })

//     } catch (e) {
//         res.sendStatus(500)
//     }
// }

const update = async (req, res) => {
    try {
        const {
            role_id, name, code
        } = req.body;
        // SQL query to update role details
        const sql = "UPDATE role set  name = ? , code = ?  WHERE role_id = ?";
        const param = [name, code, role_id];
        const data = await db.query(sql, param);
        res.json({
            message: (data.affectedRows) ? "Update success!" : "Something wrong",
            data: data
        })
    } catch (e) {
        res.sendStatus(500)
    }
}

const remove = async (req, res) => {
    try {
        const {
            role_id
        } = req.body;
        // SQL query to delete a role by its ID
        const data = await db.query("DELETE FROM role WHERE role_id = ?", [role_id]);
        res.json({
            message: (data.affectedRows) ? "Delete success!" : "Something wrong",
            data: data
        })
    } catch (e) {
        res.sendStatus(500)
    }
}

const getPermissionCodeByRoleId = async (req, res) => {
    var role_id = req.params.role_id
    console.log(role_id)
    // SQL query to get permission codes by role ID
    var getPermissionCodeByRoleIdSql = "SELECT r.`name`, r.`code`, p.`code` as permission, r.`role_id`, p.`permission_id` from role r"
    getPermissionCodeByRoleIdSql += " INNER JOIN role_permission rp on r.role_id = rp.role_id "
    getPermissionCodeByRoleIdSql += " INNER JOIN permission p on rp.permission_id = p.permission_id"
    getPermissionCodeByRoleIdSql += " WHERE r.role_id = ?"

    var getPermissionCodeByRoleIdData = await db.query(getPermissionCodeByRoleIdSql, [role_id])
    if (getPermissionCodeByRoleIdData) {
        res.json({
            list: getPermissionCodeByRoleIdData
        })
    } else {
        console.log("False")
    }
}

const deleteRoleAndPermission = async (req, res) => {
    let { role_id, permission_id } = req.body
    // SQL query to delete a role and permission relationship
    var deleteRoleAndPermissionSql = "DELETE FROM role_permission WHERE role_id = ? and permission_id = ? "
    var deleteRoleAndPermissionParam = [role_id, permission_id]
    var deleteRoleAndPermissionData = await db.query(deleteRoleAndPermissionSql, deleteRoleAndPermissionParam)
    if (deleteRoleAndPermissionData) {
        res.json({
            message: "Delete Successfully",
            data: deleteRoleAndPermissionData
        })

    }
}


module.exports = {
    getAll,
    create,
    update,
    remove,
    getPermissionCodeByRoleId,
    deleteRoleAndPermission
}