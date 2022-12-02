var canvas = 
    document.getElementById("canvas"),
    anchura = canvas.width,
    altura = canvas.height,
    cd = canvas.getContext("2d"),
    x, y, radio, radiox, radioy,
    ancho, alto, cad
    unipix = 20;   


function TrazarNumeros(){
cd.beginPath();
cd.lineWidth = 1; 
cd.strokeStyle = 'Turquoise';
for(y=0; y<altura; y+=unipix){
    cd.moveTo(0, y);
    cd.lineTo(anchura, y);
}
for(x=0; x<anchura; x+=unipix){
    cd.moveTo(x, 0);
    cd.lineTo(x, altura);
}
cd.stroke();
cd.beginPath();
cd.moveTo(x, y-60);
cd.strokeStyle = 'Black';
cd.arc(x, y-60, radio+40, 2*Math.PI/12, 2*2*Math.PI/12);
cd.closePath();
cd.fill();    

cd.beginPath();
cd.moveTo(anchura/2, 0);
cd.lineTo(anchura/2, altura);
cd.moveTo(0, altura/2);
cd.lineTo(anchura, altura/2);
cd.stroke();

x = 4;
y = 3;


    for (let i=5;i<anchura; i=i+unipix){
        //x 
        cd.moveTo(i,anchura/2-5);
        cd.lineTo(i,anchura/2);
        //y
           cd.moveTo(altura/2-5,i);
           cd.lineTo(altura/2,i);
           cd.fillText(((i-5)/unipix)-10,i-5,anchura/2-5);
           cd.fillText((10-(i-5)/unipix),altura/2-unipix,i-1)/unipix;
       }
}

TrazarNumeros();
 
function Valor(){
            var ecuacion = new Array(12);
             ecuacion[0] = parseInt( document.getElementById("a").value);
             ecuacion[1] =  parseInt( document.getElementById("b").value);
             ecuacion[2]=   parseInt(document.getElementById("c").value);
             ecuacion[3] =  parseInt(document.getElementById("d").value);
             ecuacion[4] =  parseInt(document.getElementById("e").value);
             ecuacion[5] =  parseInt(document.getElementById("f").value);
             ecuacion[6] =  parseInt(document.getElementById("x1").value);
             ecuacion[7]=  parseInt(document.getElementById("x2").value);
             ecuacion[8] =  parseInt(document.getElementById("x3").value);
             ecuacion[9] =  parseInt(document.getElementById("x4").value);
             ecuacion[10] =  document.getElementById("demo1").innerHTML =ecuacion[0] +"x" +"  + " + ecuacion[1] +"y"+"=" + ecuacion[2];
             ecuacion[11] = document.getElementById("demo2").innerHTML =  ecuacion[3] +"x" +"  + " + ecuacion[4] +"y"+"=" + ecuacion[5];
            return ecuacion;
}
function caly1y2(){
    arry1y2 = new Array(2);
    var y = Valor();
    arry1y2[0] = (y[2]-y[0]*y[6])/ y[1]; //(c - a*x1) / b;
	arry1y2[1] = (y[2]-y[0]*y[7])/ y[1]; //(c - a*x2) / b;
    //-9, 5
    return arry1y2;    
}

function caly3y4(){
    arry3y4 = new Array(2);
    var y = Valor();
    arry3y4[0] = (y[5]-y[3]*y[8])/ y[4]; //(f - d*x3) / e;
	arry3y4[1] = (y[5]-y[3]*y[9])/ y[4]; //(f - d*x4) / e;
    //-9, 5
    return arry3y4;
}

function interseccion(arrxy,arrxy2,arrxy3){
           // console.log(y1y2[0] + " , " + y1y2[1] + " , " + unipix );           
           cd.beginPath();
           cd.arc(arrxy*unipix+anchura/2, -arrxy2*unipix+altura/2, 3, 0, 2*Math.PI);
           cd.fill();
           cad = "(" + arrxy + "," + arrxy2 + ")";
           cd.fillText(cad, arrxy*unipix+anchura/2+3, -arrxy2*unipix+altura/2);          
}
function Recta1(){

        let texto= Valor();
        let y1y2 = caly1y2();
        y1=-(y1y2[0]*unipix-altura/2);
        y2=-(y1y2[1]*unipix-altura/2);
        var x1x2 = Valor();
        x1=(x1x2[6]*unipix+anchura/2);
        x2=(x1x2[7]*unipix+anchura/2);        
        cd.beginPath();
        cd.moveTo(x1,y1);
        cd.lineTo(x2,y2);
        cad = texto[10];
        cd.fillText(cad, x2,y2);      
        cd.stroke();
        console.log(y1 + " ," + y2);
} 

function Recta2(){

    let texto= Valor();
    
    let y3y4 = caly3y4();
    y3=-(y3y4[0]*unipix-altura/2);
    y4=-(y3y4[1]*unipix-altura/2);
    var x3x4 = Valor();
    x3=(x3x4[8]*unipix+anchura/2);
    x4=(x3x4[9]*unipix+anchura/2);
    cd.beginPath();
    cd.moveTo(x3,y3);
    cd.lineTo(x4,y4);
    cad = texto[11];
    cd.fillText(cad, x4,y4);      
    cd.stroke();
    console.log(y3 + " ," + y4);
} 
function clear(){
    cd.clearRect(0,0,altura, anchura);
    TrazarNumeros();
} 

function s2el(tamaño){
    caly3y4();
    caly1y2();


    
    var arrxy = new Array(tamaño);
     var x= Valor();
	if((x[0]*x[4]-x[3]*x[1])!=0 && x[0]!=0){
		arrxy[1] = (x[0]*x[5]-x[3]*x[2]) / (x[0]*x[4]-x[3]*x[1]);  // valor de y
		arrxy[0] = (x[2] - x[1]*arrxy[1]) / x[0]; // valor de x
		arrxy[2] = 1;	// ok                
	}
	else{
		arrxy[2] = 0;	// error
	}
    if(arrxy[2]==1){
        document.getElementById("demo3").innerHTML =  " x : "  + arrxy[0];
        document.getElementById("demo4").innerHTML =  " y : " +  arrxy[1];
        interseccion(arrxy[0],arrxy[1],arrxy[2]);
        Recta1();
        Recta2();
        
    }
    else{
        document.getElementById("demo4").innerHTML = "No hay soluci&oacute;n";
        interseccion(arrxy[0],arrxy[1],arrxy[2]);
        Recta1();  
        Recta2();
  
    }
    return arrxy;
}




 