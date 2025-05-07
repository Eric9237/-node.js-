const db = require('../sql');

const validate = (schema) => {
    return (req, res, next) => {           //這個return 是(schema) => 的callback              
        let result = schema.validate(req.body, { abortEarly: false })

        if (result.error) {
            db.query('select * from 02_progress ORDER BY data DESC', (err, results) => {
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
                    res.render('02reading_progress', {
                        data: dataList,
                        page: page,
                        uniqueContents: uniqueContents,
                        errors
                    })
                }



            });
            return   //這個return 是(req, res, next) =>的callback
        }
        next()
    }
}

const frendlyErrorMessage = (error) => {
    let { path, type, context } = error
    let errorTarget = path[0]


    switch (type) {
        case 'string.empty':
            return `${errorTarget}欄位 不能為空的`
        case 'number.min':
            return `${errorTarget}欄位 最小值不能低於${context.limit}`
        case 'number.max':
            return `${errorTarget}欄位 最大值不能大於${context.limit}`
        case 'date.base':
            return `${errorTarget}欄位 不能為空的`
        case 'number.base':
            return `${errorTarget}欄位 不能為空的`
        default:
            return `${errorTarget}欄位 格式錯誤`

    }

}


module.exports = validate;