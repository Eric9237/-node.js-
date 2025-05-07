var express = require('express');
var router = express.Router();
const db = require('../sql')

router.get('/lobby', (req, res) => {
    const progressSql = 'select * from 02_progress ORDER BY data DESC'
    const targetSql = 'select * from 03_target ORDER BY id DESC'
    const problemSql = 'select * from 04_problem ORDER BY id DESC'
    db.query(progressSql, (err, results) => {
        if (err) { return res.cc(err) }

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

        db.query(targetSql, (err, targetResult) => {

            if (err) { return res.cc(err) }
            let Tpage = {}
            // 現在顯示第X頁
            // req.query.page 傳回來的是「字串」 所以要先parseInt()傳換成 INT
            Tpage.Current = parseInt(req.query.page) || 1
            // 有多少條資料
            Tpage.MaxNum = targetResult.length
            //一頁顯示多少條
            Tpage.pageSize = 7
            // 總共有幾頁
            // Math.ceil 無條件進位
            Tpage.pageCount = Math.ceil(Tpage.MaxNum / Tpage.pageSize)

            // 控制畫面一次顯示多少條
            let targetDataList = targetResult.slice((Tpage.Current - 1) * Tpage.pageSize, (Tpage.Current - 1) * Tpage.pageSize + Tpage.pageSize)

            // 把 dataList 裡面的 content 抽出來、過濾重複  
            const TargetUniqueContents = [...new Set(targetDataList.map(item => item.content))];





            db.query(problemSql, (err, problemResult) => {

                let Ppage = {}
                // 現在顯示第X頁
                // req.query.page 傳回來的是「字串」 所以要先parseInt()傳換成 INT
                Ppage.Current = parseInt(req.query.page) || 1
                // 有多少條資料
                Ppage.MaxNum = problemResult.length
                //一頁顯示多少條
                Ppage.pageSize = 1

                // 總共有幾頁
                // Math.ceil 無條件進位
                Ppage.pageCount = Math.ceil(Ppage.MaxNum / Ppage.pageSize)

                // 控制畫面一次顯示多少條
                let problemDataList = problemResult.slice((Ppage.Current - 1) * Ppage.pageSize, (Ppage.Current - 1) * Ppage.pageSize + Ppage.pageSize)

                // 把 dataList 裡面的 content 抽出來、過濾重複  
                const ProblemUniqueContents = [...new Set(problemDataList.map(item => item.content))];


                if (err) { return res.cc(err) }
                else {
                    res.render('lobby', {
                        data: dataList,
                        page: page,
                        uniqueContents: uniqueContents,

                        targetDate: targetDataList,
                        Tpage: Tpage,
                        TargetUniqueContents: TargetUniqueContents,

                        problemDate: problemDataList,
                        Ppage: Ppage,
                        ProblemUniqueContents: ProblemUniqueContents

                    })
                }
            })
        })
    })

})

router.get('/target', (req, res) => {
    const sql = 'select * from 03_target ORDER BY id DESC'
    db.query(sql, (err, results) => {

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

router.get('/reading_progress', (req, res) => {
    const sql = 'select * from 02_progress ORDER BY data DESC'
    db.query(sql, (err, results) => {

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

router.get('/problem', (req, res) => {
    const sql = 'select * from 04_problem ORDER BY id DESC'
    db.query(sql, (err, results) => {

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
            res.render('03problem', {
                data: dataList,
                page: page,
                uniqueContents: uniqueContents
            })
        }
    })
})

router.get('/newIdea', (req, res) => {
    const sql = 'select * from 05_idea ORDER BY id DESC'
    db.query(sql, (err, results) => {

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
            res.render('04newIdea', {
                data: dataList,
                page: page,
                uniqueContents: uniqueContents
            })
        }
    })
})

module.exports = router;