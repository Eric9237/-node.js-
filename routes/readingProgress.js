const express = require('express');
const router = express.Router();

const db = require('../sql');

const validate = require('../middleware/validate_progress');
const { add_progress_schema } = require('../schema/add_progress');

// 新增表單
router.post('/', validate(add_progress_schema), (req, res) => {
    const sql = 'insert into 02_progress (data, content, hour) values (?, ?, ?)';
    db.query(sql, [req.body.date, req.body.content, req.body.hour], (err, results) => {
        if (err) return res.cc(err);

        db.query('select * from 02_progress ORDER BY data DESC', (err, results) => {

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
                res.render('02reading_progress', {
                    data: dataList,
                    page: page,
                    uniqueContents: uniqueContents
                })
            }

        });
    });
});

// 查詢
router.get('/search', (req, res) => {
    const search = req.query.search_readingProgress || req.query.selectVal
    const sql =
        `SELECT * 
    FROM 02_progress 
    WHERE content LIKE ? or data LIKE ?
    ORDER BY data DESC
    `;

    const searchValue = `%${search}%`;

    db.query(sql, [searchValue, searchValue], (err, results) => {
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


            res.render('02reading_progress', {
                data: dataList,
                page: page,
                uniqueContents: uniqueContents
            })
        }
    })
})

// 刪除
router.get('/delete', (req, res) => {
    let id = req.query.id
    const delSql = "delete from 02_progress where id = ?"
    const selSql = 'select * from 02_progress ORDER BY data DESC'
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


                res.render('02reading_progress', {
                    data: dataList,
                    page: page,
                    uniqueContents: uniqueContents
                })
            }

        })
    })
})


// 更新 拿到資料往前端傳
router.get('/updataDATA', (req, res) => {
    const id = req.query.id

    const sql = 'select * from 02_progress where id = ?'
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('數據庫錯誤:', err);
            return res.status(500).json({ error: '數據庫錯誤' });
        }

        // 確保有結果返回
        if (!results || results.length === 0) {
            return res.status(404).json({ error: '找不到記錄' });
        }


        // 返回結果
        res.json(results);
    })
})

// 更新
router.post('/updata', validate(add_progress_schema), (req, res) => {
    const updataSQl = `
    update 02_progress 
    set data = ?, content = ?, hour = ?
    where id = ?
    `
    const selSql = 'select * from 02_progress ORDER BY data DESC'
    console.log(req.body)
    db.query(updataSQl, [req.body.date, req.body.content, req.body.hour, req.body.id], (err, results) => {
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


                res.render('02reading_progress', {
                    data: dataList,
                    page: page,
                    uniqueContents: uniqueContents
                })
            }

        })
    })
})

module.exports = router;

