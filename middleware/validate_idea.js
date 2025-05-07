const db = require('../sql');

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body, { abortEarly: false })
        // console.log(result)

        if (result.error) {
            db.query('select * from 05_idea ORDER BY id DESC', (err, results) => {
                if (err) return res.cc(err);

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

                let errors = result.error.details.map(frendlyErrorMessage)

                if (err) { return res.cc(err) }
                else {
                    res.render('04newIdea', {
                        data: dataList,
                        page: page,
                        uniqueContents: uniqueContents,
                        errors
                    })
                }

            })
            return  //

        }
        next()

    }
}

const frendlyErrorMessage = (error) => {
    let type = error.type
    let errorTarget = error.path

    console.log(type)
    console.log(errorTarget)

    switch (type) {
        case 'string.empty':
            return `${errorTarget} 欄位不能為空`
        default:
            return `${errorTarget} 欄位填寫錯誤`
    }
}

module.exports = validate