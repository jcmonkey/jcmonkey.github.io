

        // this will be so much cleaner with react :P

        let calcStack = [];
        let calcValue = document.getElementById("calc-value");
        let value = 0;
        let btnNumbers = ["zero","one","two","three","four","five",
        "six","seven","eight","nine","divide","times", "minus","plus"];

        let lastPressed;

        //---------------------------------------------------------------

        // initialize all the number button events
        for(let bid of btnNumbers){
            let b = document.getElementById(bid);
            b.onclick = () => {
                if(!checkForMax()){
                    // preserve value after calc if operator pressed
                    if(lastPressed == "=" && Number.isInteger(parseInt(b.innerHTML))){
                        calcStack = [];
                        calcStack.push(b.innerHTML);
                    }else{
                        calcStack.push(b.innerHTML);
                    }
                   
             
                    update();
                    lastPressed = b.innerHTML;
                }
            }
        }

        //---------------------------------------------------------------
        
        // non iterative stuff below here 

        // equals
        let equals = document.getElementById("equals");
        const equalsBtn = () => { 
            calc();
            lastPressed = equals.innerHTML;
        }
        equals.onclick = equalsBtn;
        
        
        // C
        let c = document.getElementById("c-btn");
        const cBtn = () => { 
            calcValue.innerHTML = 0;
            calcStack = [];
        }
        c.onclick = cBtn;


        // arrow
        let arrow = document.getElementById("arrow");
        const arrowBtn = () => { 
            // if calcstack is not empty, means we stacking 
            // else we calculated, so set to 0
            if(calcStack.length == 1){
                calcStack = [];
                calcValue.innerHTML = 0;
            }
            else if(calcStack.length > 1){
                calcStack.pop();
                update();
            }else {
                calcValue.innerHTML = 0;
            }
        }
        arrow.onclick = arrowBtn;
        



        //-----------------------------------------------------------------------


        function validateInput(){
            // this is a quick and simple hack for this
            // check for operators before and after and remove them 
            // eval errors out when operators are before and after 

            switch(calcStack[0]){
                case '/':
                case '*': 
                case '+': 
                case '-': 
                    calcStack.shift();
            }

            switch(calcStack[calcStack.length - 1]){
                case '/':
                case '*': 
                case '+': 
                case '-': 
                    calcStack.pop();
            }
        }


        // functional stuff for calculator 
        function calc(){
            validateInput();
            value = eval(calcStack.join(""));
            calcStack = []; // empty the stack
            calcStack.push(value); // replace with value
            calcValue.innerHTML = value;
        }

        function update(){
            calcValue.innerHTML = calcStack.join("");
        }

        function checkForMax(){
            if(calcStack.length < 18){
                return false;
            }else{
                return true;
            }
        }

