window.onload = () => {
    //use fetch API get question
    const pathname = window.location.pathname;
    const pathnameParts = pathname.split('/');
    const questionId = pathnameParts[pathnameParts.length - 1];
    fetch(`/get-question-by-id?questionId=${questionId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const app = document.getElementById('app');
            const vote = data.data.like + data.data.dislike;
            if (vote === 0) {
                const item = `
            <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">
                        Question
                    </a>
                </div>
                <div class="navbar-collapse" id="item">
                    <ul class="nav navbar-nav">
                        <li>
                            <a href='/ask'>Hỏi nhanh</a>
                        </li>
                        <li>
                            <a href='/'>Đáp gọn</a>
                        </li>
                        <li>
                            <a href='/search'>Tìm kiếm</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="row ">
                <h1 class="text-center">${data.data.content}</h1>
            </div>
            <div class="row">
                <h3 class="text-center">${vote} vote</h3>
            </div>
            <div class="row" >
                <div class="col-xs-12 question_result" style="display: block;width: 100%;">
                    <div id="question_result_no" style="width: 50%;background: #d9534f;float:left;text-align: center;">50%</div>
                    <div id="question_result_yes" style="width: 50%;background: #337ab7;float:right;text-align: center;">50%</div>
                </div>
            </div>
            <div class="row text-center">
                <form action="/question" method="post">
                    <button type="submit" name="btn_xemcauhoikhac" value="xemcauhoikhac" class="btn btn-success btn-lg btn_xemcauhoikhac" id="xemcauhoikhac">Xem cau hoi khac</button>
                </form>
            </div>
        </div>`;
                app.insertAdjacentHTML('beforeend', item);
            } else {
                const like = (data.data.like / vote) * 100;
                const dislike = (data.data.dislike / vote) * 100;
                const item2 = `
            <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">
                        Question
                    </a>
                </div>
                <div class="navbar-collapse" id="item">
                    <ul class="nav navbar-nav">
                        <li>
                            <a href='/ask'>Hỏi nhanh</a>
                        </li>
                        <li>
                            <a href='/'>Đáp gọn</a>
                        </li>
                        <li>
                            <a href='/search'>Tìm kiếm</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="row ">
                <h1 class="text-center">${data.data.content}</h1>
            </div>
            <div class="row">
                <h3 class="text-center">${vote} vote</h3>
            </div>
            <div class="row" >
                <div class="col-xs-12 question_result" style="display: block;width: 100%;">
                    <div id="question_result_no" style="width: ${dislike.toFixed(2)}%;background: #d9534f;float:left;text-align: center;">${dislike.toFixed(2)}%</div>
                    <div id="question_result_yes" style="width: ${like.toFixed(2)}%;background: #337ab7;float:right;text-align: center;">${like.toFixed(2)}%</div>
                </div>
            </div>
            <div class="row text-center">
                <form action="/question" method="post">
                    <button type="submit" name="btn_xemcauhoikhac" value="xemcauhoikhac" class="btn btn-success btn-lg btn_xemcauhoikhac" id="xemcauhoikhac">Xem cau hoi khac</button>
                </form>
            </div>
        </div>`;
                app.insertAdjacentHTML('beforeend', item2);
            };
            const xemcauhoikhac = document.getElementById('xemcauhoikhac');
            if (xemcauhoikhac) {
                xemcauhoikhac.addEventListener('click', event => {
                    event.preventDefault();
                    window.location.href = "/question";
                })
            }
        })
        .catch((error => {
            console.log(error);
        }));

};