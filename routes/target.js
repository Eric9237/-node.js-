var express = require('express');
var router = express.Router();
const db = require('../sql')

const validate = require('../middleware/validate_target');
const { add_target_schema } = require('../schema/add_target')
//新增
router.post('/add', validate(add_target_schema), (req, res) => {

    const sql = 'insert into 03_target (content) values (?)';
    db.query(sql, [req.body.content], (err, results) => {
        if (err) return res.cc(err);

        const selSql = 'select * from 03_target ORDER BY id DESC'
        db.query(selSql, (err, results) => {

            let page = {}
            // 現在顯示第X頁
            // req.query.page 傳回來的是「字串」 所以要先parseInt()傳換成 INT
            page.Current = parseInt(req.query.page) || 1
            // 有多少條資料
            page.MaxNum = results.length
            //一頁顯示多少條
            page.pageSize = 7
            // 總共有幾頁
            // Math.ceil 無條件進位
            page.pageCount = Math.ceil(page.MaxNum / page.pageSize)

            // 控制畫面一次顯示多少條
            let dataList = results.slice((page.Current - 1) * page.pageSize, (page.Current - 1) * page.pageSize + page.pageSize)

            // 把 dataList 裡面的 content 抽出來、過濾重複  
            const uniqueContents = [...new Set(dataList.map(item => item.content))];


            if (err) { return res.cc(err) }
            else {
                res.render('01target', {
                    data: dataList,
                    page: page,
                    uniqueContents: uniqueContents
                })
            }
        })
    })
})

// 刪除
router.get('/delete', (req, res) => {
    let id = req.query.id
    const delSql = "delete from 03_target where id = ?"
    const selSql = 'select * from 03_target ORDER BY id DESC'

    db.query(delSql, [id], (err, results) => {
        if (err) { return res.cc(err) }

        db.query(selSql, (err, results) => {

            let page = {}
            // 現在顯示第X頁
            // req.query.page 傳回來的是「字串」 所以要先parseInt()傳換成 INT
            page.Current = parseInt(req.query.page) || 1
            // 有多少條資料
            page.MaxNum = results.length
            //一頁顯示多少條
            page.pageSize = 7
            // 總共有幾頁
            // Math.ceil 無條件進位
            page.pageCount = Math.ceil(page.MaxNum / page.pageSize)

            // 控制畫面一次顯示多少條
            let dataList = results.slice((page.Current - 1) * page.pageSize, (page.Current - 1) * page.pageSize + page.pageSize)

            // 把 dataList 裡面的 content 抽出來、過濾重複  
            const uniqueContents = [...new Set(dataList.map(item => item.content))];



            if (err) { return res.cc(err) }
            else {


                res.render('01target', {
                    data: dataList,
                    page: page,
                    uniqueContents: uniqueContents
                })
            }

        })
    })

})

// 修改 updata 拿資料
router.get('/updataDATA', (req, res) => {
    const id = req.query.id

    const sql = 'select * from 03_target where id = ?'
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.send(err)
        }

        // 確保有結果返回
        if (!results || results.length === 0) {
            return res.status(404).json({ error: '找不到記錄' });
        }

        // 返回結果
        res.json(results);
    })
})


// 修改 updata
router.post('/updata', validate(add_target_schema), (req, res) => {
    console.log(req.body)

    const updataSQl = `
    update 03_target 
    set content = ?
    where id = ?
    `
    const selSql = 'select * from 03_target ORDER BY id DESC'
    console.log(req.body)
    db.query(updataSQl, [req.body.content, req.body.id], (err, results) => {
        if (err) { return res.cc(err) }
        console.log(results)
        db.query(selSql, (err, results) => {

            let page = {}
            // 現在顯示第X頁
            // req.query.page 傳回來的是「字串」 所以要先parseInt()傳換成 INT
            page.Current = parseInt(req.query.page) || 1
            // 有多少條資料
            page.MaxNum = results.length
            //一頁顯示多少條
            page.pageSize = 7
            // 總共有幾頁
            // Math.ceil 無條件進位
            page.pageCount = Math.ceil(page.MaxNum / page.pageSize)

            // 控制畫面一次顯示多少條
            let dataList = results.slice((page.Current - 1) * page.pageSize, (page.Current - 1) * page.pageSize + page.pageSize)

            // 把 dataList 裡面的 content 抽出來、過濾重複  
            const uniqueContents = [...new Set(dataList.map(item => item.content))];



            if (err) { return res.cc(err) }
            else {


                res.render('01target', {
                    data: dataList,
                    page: page,
                    uniqueContents: uniqueContents
                })
            }

        })
    })
})

// 查詢
router.get('/search', (req, res) => {
    const search = req.query.search_readingProgress || req.query.selectVal
    const sql =
        `SELECT * 
    FROM 03_target 
    WHERE content LIKE ?
    ORDER BY id DESC
    `;

    const searchValue = `%${search}%`;

    db.query(sql, [searchValue], (err, results) => {
        let page = {}
        // 現在顯示第X頁
        // req.query.page 傳回來的是「字串」 所以要先parseInt()傳換成 INT
        page.Current = parseInt(req.query.page) || 1
        // 有多少條資料
        page.MaxNum = results.length
        //一頁顯示多少條
        page.pageSize = 7
        // 總共有幾頁
        // Math.ceil 無條件進位
        page.pageCount = Math.ceil(page.MaxNum / page.pageSize)

        // 控制畫面一次顯示多少條
        let dataList = results.slice((page.Current - 1) * page.pageSize, (page.Current - 1) * page.pageSize + page.pageSize)

        // 把 dataList 裡面的 content 抽出來、過濾重複  
        const uniqueContents = [...new Set(dataList.map(item => item.content))];



        if (err) { return res.cc(err) }
        else {


            res.render('01target', {
                data: dataList,
                page: page,
                uniqueContents: uniqueContents
            })
        }
    })
})


module.exports = router