window.onload = ()=>{
    const ask = document.getElementById('ask');
    let a=0;
    if(ask){
        ask.addEventListener('input',(event)=>{
            a = 200 - `${ask.value.length}`
            const count = document.getElementById('count');
            count.innerText = "Số ký tự có thể nhập là "+`${a}`+"/200";
        })
    }

    const submitButton = document.getElementById('submit-button');
    if(submitButton){
        submitButton.addEventListener('click',(event)=>{
            event.preventDefault();
            const textAreaValue = document.querySelector('.question-content').value;
            //send request to server
            // . create new question
            // . question content
            //fetch,ajax gui resquest ma k can load lai trang. fetch la ban update cua ajax
            fetch('/create-question',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',  //dinh nghia kieu gui qua body la kieu gi
                },
                body : JSON.stringify({   // POST||PUT
                    questionContent : textAreaValue,
                })
            })
            .then((response)=>{
                //response.json();   only when server response with json
                //response.text();  only when server response with string
                return response.json();
            })
            .then((data)=>{
                //redirect
                window.location.href = `/question/${data.data.id}`
                
            })
            .catch((error)=>{
                console.log(error);
            });
        });
    }
}