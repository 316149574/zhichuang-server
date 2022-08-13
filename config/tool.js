const bcrypt = require('bcryptjs');

const multer = require('@koa/multer');
const fs = require('fs');
const path = require('path');

const tools = {
  // 密码加密方法  使用 bcryptjs包
  enbcrypt(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  // 解码方法  
  debcrypt(pwd1, pwd2) {
    let result = bcrypt.compareSync(pwd1, pwd2); // true
    return result;
  },
  savefile() {
    //上传文件存放路径、及文件命名
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        let oDate = new Date();
        let year = oDate.getFullYear();
        let month = oDate.getMonth() + 1;
        let day = oDate.getDate();
        let dir = './public/uploads/' + year + month + day;
        
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, dir)
      },
      filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
      }
    })
    //文件上传限制
    // const limits = {
    //   fields: 10,//非文件字段的数量
    //   fileSize: 500 * 1024,//文件大小 单位 b
    //   files: 1//文件数量
    // }
    const upload = multer({ storage })
    return upload;

  },
  getTime(){
     let oDate = new Date();
     let Y = oDate.getFullYear()  
     let M =oDate.getMonth()+1;
     let D = oDate.getDate();

     let h = oDate.getHours()
         h= h<10?("0"+h):h;
     let m = oDate.getMinutes();
         m= m<10?("0"+m):m;
     let s = oDate.getSeconds();
         s= s<10?("0"+s):s;


     return  Y+'-'+ M +'-'+D +'  '+ h+':'+ m+':' + s;
  }
}
module.exports = tools;