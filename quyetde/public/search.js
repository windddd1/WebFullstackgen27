window.onload = () => {
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            const content = document.getElementById('table-book');
            content.innerHTML ="";
            const textAreaValue = document.querySelector('.question-content').value;
            fetch(`/search-question?searchContent=${textAreaValue}`,{
                method : "GET",
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                if(content){
                    const questions = data.data;
                    questions.forEach(question => {
                        const item = `<tr>
                        <th><p>${question.content}</p></th>
                        <th>${question.like}</th>
                        <th>${question.dislike}</th>
                    </tr>`
                        content.insertAdjacentHTML('beforeend', item);
                    });
                    
                }
            })
            .catch();
        });
    }
}