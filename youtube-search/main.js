window.onload = () => {
    let nextPageToken=null;
    const searchForm = document.getElementById('search');
    let timeOut = null;
    if (searchForm) {
        searchForm.addEventListener('input', (event) => {
            event.preventDefault();
            clearTimeout(timeOut);
            timeOut = setTimeout(()=>{
                const resultSearch = searchForm.keyword.value;
                if (resultSearch) {
                    const resultList = document.getElementById('result-list');
                    resultList.innerHTML="";
                    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${resultSearch}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
                        method: "GET",
                    }).then((response) => {
                        return response.json();
                    }).then(data => {
                        nextPageToken = data.nextPageToken;

                        // searchForm.keyword.value = "";
                        data.items.forEach(element => {
                            item = `<a class='result col-md-12' href='https://www.youtube.com/watch?v=${element.id.videoId}' target='_blank'>
    
                            <div class='row'>
                            
                            <div class='col-4'>
                            
                            <img src='${element.snippet.thumbnails.default.url}' />
                            
                            </div>
                            
                            <div class='col-8'>
                            
                            <div class='video-info'>
                            
                            <h2 class='title'>${element.snippet.title}</h2>
                            
                            <p class='description'>${element.snippet.description}</p>
                            
                            <span>View >></span>
                            
                            </div>
                            
                            </div>
                            
                            </div>
                            
                            </a>`;
                            
                            if (resultList) {
                                resultList.insertAdjacentHTML('beforeend', item);
                            }
                        });
                        let flag = true;
                        window.onscroll = () => {
                            
                            const getDistFromBottom = () => {
    
                                let scrollPosition = window.pageYOffset;
                                let windowSize = window.innerHeight;
                                let bodyHeight = document.body.offsetHeight;
    
                                return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
    
                            }
    
                            if (getDistFromBottom() < 200 && flag) {
                                flag = false;
                                fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=chipu&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`, {
                                    method: 'GET'
                                }).then((response) => {
                                    return response.json();
                                }).then(data => {
                                    nextPageToken = data.nextPageToken;
                                    data.items.forEach(element => {
                                        item = `<a class='result col-md-12' href='https://www.youtube.com/watch?v=${element.id.videoId}' target='_blank'>
        
                                <div class='row'>
                                
                                <div class='col-4'>
                                
                                <img src='${element.snippet.thumbnails.default.url}' />
                                
                                </div>
                                
                                <div class='col-8'>
                                
                                <div class='video-info'>
                                
                                <h2 class='title'>${element.snippet.title}</h2>
                                
                                <p class='description'>${element.snippet.description}</p>
                                
                                <span>View >></span>
                                
                                </div>
                                
                                </div>
                                
                                </div>
                                
                                </a>`;
                                        const resultList = document.getElementById('result-list');
                                        if (resultList) {
                                            resultList.insertAdjacentHTML('beforeend', item);
                                        }
                                    });
                                    flag = true;
                                })
                            }
                        };
    
                    })
                }    
            },1000);
           
        })
    }
}