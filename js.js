var flag =false;
let rows, cols, count=10;
let color="white";
let tempArr, tempArr2;


//*************************************************************************
//*************************************************************************
//Create INPUT Table

const baseArr= [
    [0,0,0,1,1,0,0,0],
    [0,1,0,0,1,1,1,0],
    [0,1,1,0,0,0,1,0],
    [0,0,0,0,0,0,1,0],
    [1,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,0]
  ];


//rand numb
function randArr(){
    var x =[];
    for (var i = 0; i < rows; i++) {
        x[i] = [];
        for (var j = 0; j < cols; j++) {
            x[i][j] =  Math.floor(Math.random() * 2);    
        }
    }       
    return x;
}

//draw INPUT table
function drawGrid(){
    count=10;
    if (!flag) tempArr = baseArr;
    else tempArr = randArr();

    let table = document.getElementById("matrix");
    table.innerText="";

    for (let i = 0; i < rows; i++) {
        let row_tr = document.createElement('tr');
        
        for (let j = 0; j < cols; j++) {
            let col_td = document.createElement('td');
            col_td.innerHTML=tempArr[i][j];
            if (tempArr[i][j]==1) col_td.style.background="green";
            row_tr.appendChild(col_td);        
        }        
        table.appendChild(row_tr);
    }

    //START
    calculate();

}

//draw OUTPUT table
function drawGrid2(){
    let arColor = random_rgba();
    let table2 = document.getElementById("matrix2");
    table2.innerText="";

    for (let i = 0; i < rows; i++) {
        let row_tr = document.createElement('tr');
        
        for (let j = 0; j < cols; j++) {
            let col_td = document.createElement('td');
            col_td.innerHTML=tempArr2[i][j];
            
            if (tempArr2[i][j]!=0){
                col_td.style.background=arColor[tempArr2[i][j]-10].color;
            }
            row_tr.appendChild(col_td);        
        }        
        table2.appendChild(row_tr);
    }
}


function random_rgba() {
    let arColor = [];
    for (let i = 11; i <=count+1; i++) {
        var o = Math.round, r = Math.random, s = 255;
        arColor.push({color:'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')'});
    }
    return arColor;
}

//*************************************************************************
//*************************************************************************
// OUTPUT
//*************************************************************************
//*************************************************************************

function buttonParameters(){
    flag=true;
    document.getElementById('formSubmit').onsubmit();
}
function show(form)
{
   rows= form.elements.row.value;
   cols= form.elements.col.value;  
  
    drawGrid()
    return false;
}

//---
function buttonRandom(){
    flag=true;
    rows = Math.floor(Math.random() * 10)+1;    
    cols = Math.floor(Math.random() * 10)+1;   
    drawGrid()
}

//---
function buttonExample(){
    flag=false;   
    rows = baseArr.length;
    cols = baseArr[1].length; 
    drawGrid()   
}

//*************************************************************************
//*************************************************************************
////-------------------------





function calculate(){
    tempArr2=[];
    for (let i = 0; i < rows; i++) {
        tempArr2[i]=[];
      for (let j = 0; j < cols; j++) 
        tempArr2[i][j] = tempArr[i][j]; 
    }    
  
    for (let k = 0; k < rows; k++) {
        for (let n = 0; n < cols; n++) {
            if (tempArr2[k][n]==1){ 
                count++;             
               findOne(k,n, count);
            }
        }
    }
    drawGrid2();
 
}



function findOne(i,j, count){
    tempArr2[i][j]=count;

    for (let vi = -1; vi <= 1; vi++){
        if (i+vi==rows || i+vi==-1) continue;
        
        for (let vj = -1; vj <=1; vj++) {
            if (j+vj==cols || j+vj==-1) continue;
            
            if (tempArr2[i+vi][j+vj]==1) findOne(i+vi,j+vj,count)
        }
    }

}