function setup() {
    var myCanvas = document.getElementById('myCanvas');
    var context = myCanvas.getContext('2d'); 
    var tParam = 0;
    var x = 0;
    var y = 0;
    var z = 0;
    function draw() {
      
	myCanvas.width = myCanvas.width;

    if(typeof otherT === 'undefined'){
        otherT = 0;
    } else if(otherT > 3.99){
        otherT = 0;
    }

    if(typeof x === 'undefined'){
        z = 0;
    }

    if(typeof x === 'undefined'){
        x = 0;
    } else if(tParam < 3){
        x = 0;
    }
    if(typeof y === 'undefined'){
        y = 0;
    } else if(tParam < 6){
        y = 0;
    }

    if(typeof tParam === 'undefined'){
        tParam = 0;
    } else if(tParam > 9.999){
        tParam = 0;
    }

	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
    function drawCar(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        //right side
        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = color;
	    moveToTx([0.5,0,0.2],Tx);
	     lineToTx([-0.2,0,0.2],Tx);
	     lineToTx([-0.2,0.2,0.2],Tx);
         lineToTx([0.2,0.2,0.2],Tx);
         context.closePath();
	    context.fill();
        context.stroke();

       //back 
        context.beginPath();
        context.fillStyle = color;
        context.strokeStyle = "black";
	    moveToTx([-0.2,0.2,-0.2],Tx);
	    lineToTx([-0.2,0.2,0.2],Tx);
        lineToTx([-0.2,0,0.2],Tx);
      	lineToTx([-0.2,0,-0.2],Tx);
	    context.closePath();
	    context.fill();
        context.stroke();

         //left side
         context.beginPath();
         context.strokeStyle = "black";
         context.fillStyle = color;
         moveToTx([0.5,0,-0.2],Tx);
          lineToTx([-0.2,0,-0.2],Tx);
          lineToTx([-0.2,0.2,-0.2],Tx);
          lineToTx([0.2,0.2,-0.2],Tx);
          context.closePath();
         context.fill();
         context.stroke();

         //windscreen
         context.beginPath();
         context.strokeStyle = "black";
         context.fillStyle = "pink";
         moveToTx([0.2,0.2,-0.2],Tx);
          lineToTx([0.5,0,-0.2],Tx);
          lineToTx([0.5,0,0.2],Tx);
          lineToTx([0.2,0.2,0.2],Tx);
          context.closePath();
         context.fill();
         context.stroke();
    
        //hood
        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = "black";
	    moveToTx([-0.2,0.2,-0.2],Tx);
	    lineToTx([-0.2,0.2,0.2],Tx);
        lineToTx([0.2,0.2,0.2],Tx);
        lineToTx([0.2,0.2,-0.2],Tx);
	    context.closePath();
	    context.fill();
        context.stroke();
       
    
    }
	
      
    function draw3DAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
	    // Arrowheads
	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
	    // X-label
	    moveToTx([1.3,-.05,0],Tx);lineToTx([1.4,.05,0],Tx);
	    moveToTx([1.3,.05,0],Tx);lineToTx([1.4,-.05,0],Tx);
        // Y-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.35,0],Tx);lineToTx([.05,1.4,0],Tx);
        moveToTx([0,1.35,0],Tx);lineToTx([0,1.28,0],Tx);
	    // Z-label
	    moveToTx([-.05,0,1.3],Tx);
	    lineToTx([.05,0,1.3],Tx);
	    lineToTx([-.05,0,1.4],Tx);
	    lineToTx([.05,0,1.4],Tx);

	    context.stroke();
	}

    var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}

    var HermiteDerivative = function(t) {
        return [
        6*t*t-6*t,
        3*t*t-4*t+1,
        -6*t*t+6*t,
        3*t*t-2*t
        ];
    }

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec3.create();
	    vec3.scale(result,P[0],b[0]);
	    vec3.scaleAndAdd(result,result,P[1],b[1]);
	    vec3.scaleAndAdd(result,result,P[2],b[2]);
	    vec3.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var c0 = [-25,100,200];
    var cd0 = [1000,0,0];
    
    var c1 = [70,100,200];
    var cd1 = [1000,0,0];
    
    var c2 = [70,100,-150];
    var cd2 = [-1000,0,0];

    var c3 = [-25,100,-150];
    var cd3 = [-1000,0,0];
    

  var CD_0 = [c0,cd0,c1,cd1];
    var CD_1 = [c1,cd1,c2,cd2];
    var CD_2 = [c2,cd2,c3,cd3];
    var CD_3 = [c3,cd3,c0,cd0];
     

    var CD0 = function(t_) {return Cubic(Hermite,CD_0,t_);};
    var CD1 = function(t_) {return Cubic(Hermite,CD_1,t_);};
    var CD2 = function(t_) {return Cubic(Hermite,CD_2,t_);};
    var CD3 = function(t_) {return Cubic(Hermite,CD_3,t_);};
    

	var CDcomp = function(t) {
        if (t<1){
    var u = t;
    return CD0(u);
        } else if(t<2) {
    var u = t-1.0;
    return CD1(u);
        } else if(t<3) {
    var u = t-2.0;
    return CD2(u);
        } else if(t<4) {
    var u = t-3.0;
    return CD3(u);
        }     
                       
    }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
    var p2=[-70,0,100];
	var d2=[70,0,0];
	var p3=[0,0,100];
	var d3=[10,90,0];
	var p4=[50,50,100];
    var d4=[100,0,0];
    var p5=[100,0,100];
    var d5=[100,0,0];
    var p6=[150,50,100];
    var d6=[100,0,0];
    var p7=[200,0,100];
    var d7=[100,0,0];
    var p8=[200,0,0];
    var d8=[-100,0,0];
    var p9=[100,0,50];
    var d9=[-90,0,-10];
    var p10=[50,0,-50];
    var d10=[-100,20,-100];
    var p11=[-50,0,-50];
    var d11=[-100,0,100];
    
    var P_1 = [p2,d2,p3,d3];
    var P_2 = [p3,d3,p4,d4];
    var P_3 = [p4,d4,p5,d5];
    var P_4 = [p5,d5,p6,d6];
    var P_5 = [p6,d6,p7,d7];
    var P_6 = [p7,d7,p8,d8];
    var P_7 = [p8,d8,p9,d9];
    var P_8 = [p9,d9,p10,d10];
    var P_9 = [p10,d10,p11,d11];
    var P_10 = [p11,d11,p2,d2];

	var C0 = function(t_) {return Cubic(Hermite,P_1,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P_2,t_);};
    var C2 = function(t_) {return Cubic(Hermite,P_3,t_);};
	var C3 = function(t_) {return Cubic(Hermite,P_4,t_);};
    var C4 = function(t_) {return Cubic(Hermite,P_5,t_);};
	var C5 = function(t_) {return Cubic(Hermite,P_6,t_);};
    var C6 = function(t_) {return Cubic(Hermite,P_7,t_);};
	var C7 = function(t_) {return Cubic(Hermite,P_8,t_);};
	var C8 = function(t_) {return Cubic(Hermite,P_9,t_);};
    var C9 = function(t_) {return Cubic(Hermite,P_10,t_);};

	var C0prime = function(t_) {return Cubic(HermiteDerivative,P_1,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P_2,t_);};
    var C2prime = function(t_) {return Cubic(HermiteDerivative,P_3,t_);};
	var C3prime = function(t_) {return Cubic(HermiteDerivative,P_4,t_);};
    var C4prime = function(t_) {return Cubic(HermiteDerivative,P_5,t_);};
	var C5prime = function(t_) {return Cubic(HermiteDerivative,P_6,t_);};
    var C6prime = function(t_) {return Cubic(HermiteDerivative,P_7,t_);};
	var C7prime = function(t_) {return Cubic(HermiteDerivative,P_8,t_);};
    var C8prime = function(t_) {return Cubic(HermiteDerivative,P_9,t_);};
	var C9prime = function(t_) {return Cubic(HermiteDerivative,P_10,t_);};
     
    var Ccomp = function(t) {
        if (t<1){
    var u = t;
    return C0(u);
        } else if(t<2) {
    var u = t-1.0;
    return C1(u);
        } else if(t<3) {
    var u = t-2.0;
    return C2(u);
        } else if(t<4) {
    var u = t-3.0;
    return C3(u);
        } else if(t<5) {
    var u = t-4.0;
    return C4(u);
        } else if(t<6) {
    var u = t-5.0;
    return C5(u);
        } else if(t<7) {
    var u = t-6.0;
    return C6(u);
        } else if(t<8) {
    var u = t-7.0;
    return C7(u);
        } else if(t<9) {
    var u = t-8.0;
    return C8(u);
        } else if(t<10) {
    var u = t-9.0;
    return C9(u);
        }     
                       
    }

    var Ccomp_tangent = function(t) {
        if (t<1){
    var u = t;
    return C0prime(u);
        } else if(t<2) {
    var u = t-1.0;
    return C1prime(u);
        } else if(t<3) {
    var u = t-2.0;
    return C2prime(u);
        } else if(t<4) {
    var u = t-3.0;
    return C3prime(u);
        } else if(t<5) {
    var u = t-4.0;
    return C4prime(u);
        } else if(t<6) {
    var u = t-5.0;
    return C5prime(u);
        } else if(t<7) {
    var u = t-6.0;
    return C6prime(u);
        } else if(t<8) {
    var u = t-7.0;
    return C7prime(u);
        } else if(t<9) {
    var u = t-8.0;
    return C8prime(u);
        } else if(t<10) {
    var u = t-9.0;
    return C9prime(u);
        }            
    }


    function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
        context.strokeStyle=color;
        context.beginPath();
        moveToTx(C(t_begin),Tx);
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t),Tx);
        }
        context.stroke();
    }
    

    var eye = CDcomp(otherT);
    var target = Ccomp(tParam); 
    var up = vec3.fromValues(0,100,0); 
	var TlookAtCamera = mat4.create();
    mat4.lookAt(TlookAtCamera, eye, target, up);
      
    var Tviewport = mat4.create();
	mat4.fromTranslation(Tviewport,[200,200,0]);
	mat4.scale(Tviewport,Tviewport,[100,-100,1]);

    var TprojectionCamera = mat4.create();
    mat4.perspective(TprojectionCamera,Math.PI/2,1,-1,1);
    
    
    var T_Path = mat4.create();
    mat4.multiply(T_Path,Tviewport,TprojectionCamera);
    mat4.multiply(T_Path,T_Path,TlookAtCamera);
    
    var Tmodel = mat4.create();
    mat4.fromTranslation(Tmodel,Ccomp(tParam));
    var tangent = Ccomp_tangent(tParam);
    if(tParam > 0 && tParam < 5){
        if(tParam < 5 && tParam > 3){
            var angle = Math.atan2(tangent[1],tangent[0]);
            mat4.rotateZ(Tmodel,Tmodel,x);
            
        }else{
            var angle = Math.atan2(tangent[1],tangent[0]);
            mat4.rotateZ(Tmodel,Tmodel,angle);
            if(tParam == 3){
                x = angle-0.5;
            }
        }
    }else{
        
        var angle = Math.atan2(tangent[2],tangent[0]);
        mat4.rotateY(Tmodel,Tmodel,angle*-1);
        if(tParam > 6 && tParam < 9){
            mat4.rotateX(Tmodel,Tmodel,y);    
        }
        if(tParam > 9 && tParam < 10){
            mat4.rotateX(Tmodel,Tmodel,z);    
        }

    }

    var T_Car = mat4.create();
	mat4.multiply(T_Car, T_Path, Tmodel);
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    draw3DAxes("grey",T_Path,100.0);
    drawTrajectory(0.0,1.0,100,C0,T_Path,"red");
    drawTrajectory(0.0,1.0,100,C1,T_Path,"blue");
    drawTrajectory(0.0,1.0,100,C2,T_Path,"green");
    drawTrajectory(0.0,1.0,100,C3,T_Path,"red");
    drawTrajectory(0.0,1.0,100,C4,T_Path,"blue");
    drawTrajectory(0.0,1.0,100,C5,T_Path,"green");
    drawTrajectory(0.0,1.0,100,C6,T_Path,"red");
    drawTrajectory(0.0,1.0,100,C7,T_Path,"blue");
    drawTrajectory(0.0,1.0,100,C8,T_Path,"green");
    drawTrajectory(0.0,1.0,100,C9,T_Path,"red");
    drawCar("blue",T_Car,100.0);


    otherT += 0.001;
    tParam += 0.01;
    x +=0.03;
    if(tParam > 4.7){
        x +=0.013;    
    }
    if(tParam>6 && tParam<9){
        if(y < 0.5 && tParam < 7){
            y += (tParam - 6)/1000000000000 + 0.01;
        }
        if(tParam < 9 && tParam > 7){
            y -= (tParam - 6)/100000000 + 0.01;
            z = y;
        }

    }
    if(tParam> 9){
        if(z>0){
            z=0
        }else{
            z-=(tParam - 9)/10000 - 0.02;
        }
        
    }
    
    window.requestAnimationFrame(draw);
    }
    draw();
}
window.onload = setup;
