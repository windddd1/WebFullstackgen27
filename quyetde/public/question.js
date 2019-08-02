window.onload = () => {
    let question;
    fetch('/random-question', {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .then((data) => {
            question = data.data;
            const app = document.getElementById('app');
            const item = `
        <nav class="navbar navbar-inverse navbar-expand-md">
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
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="container">
                    <h1 class="text-center">${data.data.content}</h1>
                    <form >
                        <div class="row" id="btn_answer">
                            <div class="col-md-6">
                                    <button type="submit" class="btn btn-danger btn-lg" name="btn_yesno" value="no" id="dislike">Sai/Không/Trái</button>
                            </div>
                            <div class="col-md-6">
                                    <button type="submit" class="btn btn-primary btn-lg" name="btn_yesno" value="yes" id="like">Đúng/Có/Phải</button>
                            </div>
                        </div>
                        <div class="row" id="btn_chuyen">
                            <button type="submit" class="btn btn-default" name="btn_yesno" value="ketquavote" id="ketquavote">Ket qua vote</button>
                            <button type="submit" class="btn btn-default" name="btn_yesno" value="cauhoikhac" id="cauhoikhac">Cau hoi khac</button>
                        </div>
                    </form>
                </div>
            `;
            app.insertAdjacentHTML('beforeend', item);
            //like
            const like = document.getElementById('like');
            if (like) {
                question.like = question.like + 1;
                like.addEventListener('click', (event) => {
                    event.preventDefault();
                    fetch('/update', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            question: question,
                        }),
                    })
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            window.location.href = `/question/${data.data.id}`
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
            };
            //dislike
            const dislike = document.getElementById("dislike");
            if(dislike){
                question.dislike = question.dislike + 1;
                dislike.addEventListener('click', (event) => {
                    event.preventDefault();
                    fetch('/update', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            question: question,
                        }),
                    })
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            window.location.href = `/question/${data.data.id}`;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
            };
            //ket qua vote
            const ketquavote = document.getElementById('ketquavote');
            if(ketquavote){
                ketquavote.addEventListener('click',event=>{
                    event.preventDefault();
                    window.location.href = `/question/${data.data.id}`;
                });
            };

            const cauhoikhac = document.getElementById('cauhoikhac');
            if(cauhoikhac){
                cauhoikhac.addEventListener('click' , event=>{
                    window.localtion.href = '/question';
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });


};