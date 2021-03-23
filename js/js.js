// let data = [
//     {
//       "id": 0,
//       "name": "肥宅心碎賞櫻3日",
//       "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//       "area": "高雄",
//       "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//       "group": 87,
//       "price": 1400,
//       "rate": 10
//     },
//     {
//       "id": 1,
//       "name": "貓空纜車雙程票",
//       "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//       "area": "台北",
//       "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//       "group": 99,
//       "price": 240,
//       "rate": 2
//     },
//     {
//       "id": 2,
//       "name": "台中谷關溫泉會1日",
//       "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//       "area": "台中",
//       "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//       "group": 20,
//       "price": 1765,
//       "rate": 7
//     }
//   ];
let data=[];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
    .then((response)=>{
        data = response.data.data;
        render();
    })

let render = ()=>{

    const ticketList = document.querySelector('.ticketList');
    const ticketAddBtn = document.querySelector('.addTicketForm__btn');
    const ticketInput = document.querySelectorAll('.addTicketForm__group_Input input,.addTicketForm__group_Input textarea,.addTicketForm__group_Input select');
    const nowNum = document.querySelector('.searchBar__text');
    const searchArea = document.querySelector('.searchBar__search');
    let content = false; // 為true時才可以新增套票
    
    let showData=(data)=>{ 
        ticketList.innerHTML = '';
        let num = data.length;
        nowNum.innerHTML = `本次搜尋結共 ${num} 筆`;
        data.forEach((item)=> {
            let li = document.createElement('li');
            li.setAttribute('class','ticketCard');
            let cardTop = `
                <div class="ticketCard__top" style="background-image: url('${item['imgUrl']}');">
                <div class="ticketCard__top_area h3">${item['area']}</div>
                <div class="ticketCard__top_rate h4">${item['rate']}</div>
                </div>`;
            let cardContent = `
                <div class="ticketCard__content">
                <h2>${item['name']}</h2>
                <hr>
                <h4>
                    ${item['description']}
                </h4>
                <div class="ticketCard__content_info">
                    <div class="h4 ticketNum">
                        <span><i class="fas fa-exclamation-circle"></i></span>
                        剩下最後 ${item['group']} 組
                    </div>
                    <div class="h4 ticketPrice">
                        <h4>TWD<span>${item['price']}</span></h4>
                    </div>
                </div>
                </div>`
            cardTop+=cardContent;
            li.innerHTML=cardTop;
            ticketList.appendChild(li);
        });
    }
    //==========根據陣列秀出資料==========
    
    
    ticketAddBtn.addEventListener('click',()=>{
        checkValue();
        if(content){
            let obj = {};
            obj.name = document.getElementById('ticketName').value;
            obj.imgUrl = document.getElementById('ticketImg').value;
            obj.area = document.getElementById('ticketArea').value;
            obj.price = document.getElementById('ticketPrice').value;
            obj.group = document.getElementById('ticketNum').value;
            obj.rate = document.getElementById('ticketRate').value;
            obj.description = document.getElementById('ticketDect').value;
            data.push(obj);
            showData(data);
            document.querySelector('.addTicketForm').reset();
        }
    })
    //==========點擊新增套票按鈕==========
    
    
    let checkValue = ()=>{ 
        ticketInput.forEach((item)=>{
            let value = item.value;
            let id = item.getAttribute('id');
            let text = document.querySelector(`[data-message='${id}']`);
    
            if(value == ''||value==NaN){
                content = false;
                text.textContent = '此為必填欄位';
            }else{
                content = true;
                text.textContent = '';
            }
        })
    }
    //==========檢查每個input是否有值==========
    
    
    searchArea.addEventListener('change',(e)=>{
        let value = document.querySelector('.searchBar__search').value; //用searchArea抓不到value?
        let newData=[];
        if (value==''){
            showData(data);
            return;
        }
        data.forEach((item)=>{
            if(item.area == value){
                newData.push(item);
                showData(newData);
            }
        })
    });
    //==========更改搜尋地區==========
    
    
    ticketInput.forEach((item)=>{ 
        item.addEventListener('blur',(e)=>
            {
                let value = e.target.value;
                let id = e.target.id;
                let text = document.querySelector(`[data-message='${id}']`);
                if(value == NaN||value ==''){
                    text.textContent = '此為必填欄位';
                }else{
                    text.textContent = '';
                }
            }
        )
    })
    //==========每次blur時檢查input是否有值==========
    
    
    const ticketRate = document.getElementById('ticketRate');
    ticketRate.addEventListener('keyup',()=>{
        let value = ticketRate.value;
        if(value>10){
            ticketRate.value = 10;
            console.log(ticketRate.value);
        }
    })
    //==========單獨檢查套票星級是否大於10==========
    
    
    showData(data);
    

};


