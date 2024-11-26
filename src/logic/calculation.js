export default class Calculation {
    constructor(expression) {
        this.expression = expression;
    }

    countOperators(str) {
        const matches = str.match(/[+\-/*^]/g);
        return matches ? matches.length : 0;
    }

    countNumbers(str) {
        const matches = str.match(/[0-9]/g);
        return matches ? matches.length : 0;
    }

    isBalanced(str) {
        let balance = 0;
        for (let char of str) {
            if (char === '(') balance++;
            else if (char === ')') {
                if (balance === 0) return false;
                balance--;
            }
        }
        return balance === 0;
    }

    weightage(opr) {
        if (opr == '(' || opr == ')') {
            return 1
        } else if (opr == '+' || opr == '-') {
            return 2
        } else if (opr == '*' || opr == '/') {
            return 3
        } else if (opr == '^') {
            return 4
        }
        else return 0
    }

    infixToPostfix(expr) {
        const postfix = []
        const stack = []
        for (const item of expr) {
            if (!isNaN(item)) {
                postfix.push(Number(item))
            }
            else if (/\b[a-z]\b/.test(item)){
                postfix.push(Number(localStorage.getItem(item)))
            }
            else if (item === '(') {
                stack.push(item)
            }
            else if (item === ')') {
                while (stack[stack.length - 1] !== '(') {
                    postfix.push(stack.pop())
                }
                stack.pop()
            }
            else if (this.weightage(item) > this.weightage(stack[stack.length - 1])) {
                stack.push(item)
            }
            else {
                while (this.weightage(item) <= this.weightage(stack[stack.length - 1]) && stack.length > 0) {
                    postfix.push(stack.pop())
                }
                stack.push(item)
            }
        }

        while (stack.length > 0) {
            postfix.push(stack.pop())
        }
        return postfix;
    }

    evaluate(postExrp) {
        let stack = [];
        for (const item of postExrp) {
            if (typeof item == 'number') {
                stack.push(item)
            }
            else {
                let a = stack.pop();
                let b = stack.pop();
                let result;
                switch (item) {
                    case '+':
                        result = a + b;
                        break;
                    case '-':
                        result = b - a;
                        break;
                    case '*':
                        result = a * b;
                        break;
                    case '/':
                        result = b / a;
                        break;
                    case '^':
                        result = Math.pow(b, a);
                        break;
                }
                stack.push(result)
            }
        }
        return stack[0];
    }
    //This function can be made to store the history in localStorage
    // calcHistory(newCalc)
    // {
    //     const data = JSON.parse(localStorage.getItem('calculations') || "[]"); 
    //     data.push(newCalc)
    //     localStorage.setItem('calculations', JSON.stringify(data))
    // }

    calculate() {
        let postFix = [];
        let finalResult;
        if(/\b[a-z]\b/.test(this.expression) && !this.expression.includes("="))
        {
            let tokens = this.expression.match(/(\d+(\.\d+)?|[a-zA-Z]|\S)/g);
            postFix = this.infixToPostfix(tokens);
            finalResult = this.evaluate(postFix)
            return finalResult;
        }
        else if(this.expression.includes("="))
        {
            const tokens = this.expression.split(/\s*=\s*/);
            if(this.countOperators(tokens[1]) > 0){
                postFix = this.infixToPostfix(tokens[1].match(/(\d+(\.\d+)?|\S)/g))
                finalResult = this.evaluate(postFix)
            }else if(tokens[1].match(/[0-9]/g))
            {
                finalResult = Number(tokens[1])
            }
            localStorage.setItem(tokens[0], finalResult)
            return finalResult
        }
        else if ((this.countNumbers(this.expression) > this.countOperators(this.expression)) && this.countOperators(this.expression) > 0  && this.isBalanced(this.expression)) {
            const tokens = this.expression.match(/(\d+(\.\d+)?|\S)/g);
            postFix = this.infixToPostfix(tokens)
             finalResult = this.evaluate(postFix)
            // this.calcHistory(tokens.join(" ")+" = "+finalResult)
            return finalResult;
        }
        else {
            return undefined;
        }
    }
}
