import { Token, tokenize, TokenType } from './expression/tokenize';
import { Expression } from './Expression';
import { TemplateError } from './TemplateError';
import { EqualExpression } from './expression/EqualExpression';
import { AdditionExpression } from './expression/AdditionExpression';
import { DivisionExpression } from './expression/DivisionExpression';
import { AndExpression } from './expression/AndExpression';
import { DecrementExpression } from './expression/DecrementExpression';
import { AssignExpression } from './expression/AssignExpression';
import { DereferenceExpression } from './expression/DereferenceExpression';
import { CallMethodExpression } from './expression/CallMethodExpression';
import { CallBuiltinExpression } from './expression/CallBuiltinExpression';
import { NegativeExpression } from './expression/NegativeExpression';
import { PositiveExpression } from './expression/PositiveExpression';
import { NotExpression } from './expression/NotExpression';
import { ReferenceExpression } from './expression/ReferenceExpression';
import { StringExpression } from './expression/StringExpression';
import { TrueExpression } from './expression/TrueExpression';
import { FalseExpression } from './expression/FalseExpression';
import { NumberExpression } from './expression/NumberExpression';
import { SequenceExpression } from './expression/SequenceExpression';
import { HashExpression } from './expression/HashExpression';
import { DefaultExpression } from './expression/DefaultExpression';
import { SubtractionExpression } from './expression/SubstractionExpression';
import { MultiplicationExpression } from './expression/MultiplicationExpression';
import { ModulusExpression } from './expression/ModulusExpression';
import { NotEqualExpression } from './expression/NotEqualExpression';
import { OrExpression } from './expression/OrExpression';
import { LessThanExpression } from './expression/LessThanExpression';
import { GreaterThanExpression } from './expression/GreaterThanExpression';
import { LessThanOrEqualExpression } from './expression/LessThanOrEqualExpression';
import { GreaterThanOrEqualExpression } from './expression/GreaterThanOrEqualExpression';
import { AddAndAssignExpression } from './expression/AddAndAssignExpression';
import { SubtractAndAssignExpression } from './expression/SubstractAndAssignExpression';
import { MultiplyAndAssignExpression } from './expression/MultiplyAndAssignExpression';
import { DivideAndAssignExpression } from './expression/DivideAndAssignExpression';
import { ModulusAndAssignExpression } from './expression/ModulusAndAssignExpression';
import { RangeStartingExpression } from './expression/RangeStartingExpression';
import { RangeInclusiveExpression } from './expression/RangeInclusiveExpression';
import { RangeExclusiveExpression } from './expression/RangeExclusiveExpression';
import { RangeLengthIncrementExpression } from './expression/RangeLengthIncrementExpression';
import { RangeLengthDecrementExpression } from './expression/RangeLengthDecrementExpression';
import { SliceExpression } from './expression/SliceExpression';
import { IsDefinedExpression } from './expression/IsDefinedExpression';
import { IncrementExpression } from './expression/IncrementExpression';
import { ParenthesisExpression } from './expression/ParenthesisExpression';
import { AncillaryExpression } from './expression/AncillaryExpression';
import { LambdaExpression } from './expression/LambdaExpression';
import { isComposingExpression } from './expression/ComposingExpression';

const PRECEDENCE: Record<string, number> = {
    '?': 2,
    '.': 2,
    '??': 2,
    'default': 2,
    '(': 2,
    '[': 2,
    '/': 3,
    '*': 3,
    '%': 3,
    '+': 4,
    '-': 4,
    '..<': 5,
    '..!': 5,
    '..*': 5,
    '..': 5,
    '..*-': 5,
    '..*+': 5,
    'not': 5,
    '<': 6,
    '>': 6,
    '>=': 6,
    '<=': 6,
    '==': 7,
    '!=': 7,
    '&&': 8,
    '||': 9,
    '->': 10,
    '+=': 11,
    '-=': 11,
    '/=': 11,
    '%=': 11,
    '*=': 11,
    '=': 11,
};

function interpretOperand(tokens: Token[]): [Expression | undefined, token: Token] {

    let token = tokens.shift(), expression = undefined;

    if (token === undefined) {
        throw new Error("Should never happen");
    } else if (token?.getType() === TokenType.CLOSE_HASH) {
        return [undefined, token];
    } else if (token?.getType() === TokenType.CLOSE_SEQUENCE) {
        return [undefined, token];
    } else if (token?.getType() === TokenType.CLOSE_PARENTHESIS) {
        return [undefined, token];
    } else if (token?.getType() === TokenType.OPEN_PARENTHESIS) {

        const row = token.getRow();
        const column = token.getColumn();

        [expression, token] = interpretExpression(tokens);

        if (token?.getType() != TokenType.CLOSE_PARENTHESIS) {
            throw new TemplateError(row, column, `Open parenthesis not closed with a close parenthesis`);
        }

        if (expression === undefined) {
            throw new TemplateError(row, column, `Parenthesis is empty`);
        }

        return [new ParenthesisExpression(expression, token.getRow(), token.getColumn()), token];
    } else if (token?.getType() === TokenType.PLUS) {
        //we have encountered a + symbol where we expect an expression, so it is the sign for a number that follows.
        const [arg, token] = interpretOperand(tokens);
        if (arg === undefined) {
            throw new TemplateError(token.getRow(), token.getColumn(), `Unary operator '${token.getToken()}' expects an expression`);
        }
        return [new PositiveExpression(arg, token.getRow(), token.getColumn()), token];
    } else if (token?.getType() === TokenType.MINUS) {
        //we have encountered a - symbol where we expect an expression, so it is the sign for a number that follows.
        const [arg, token] = interpretOperand(tokens);
        if (arg === undefined) {
            throw new TemplateError(token.getRow(), token.getColumn(), `Unary operator '${token.getToken()}' expects an expression`);
        }
        return [new NegativeExpression(arg, token.getRow(), token.getColumn()), token];
    } else if (token?.getType() === TokenType.BANG) {

        const [arg, token] = interpretOperand(tokens);
        if (arg === undefined) {
            throw new TemplateError(token.getRow(), token.getColumn(), `Unary operator '${token.getToken()}' expects an expression`);
        }
        return [new NotExpression(arg, token.getRow(), token.getColumn()), token];
    } else if (token?.getType() === TokenType.REFERENCE) {
        return [new ReferenceExpression(token.getToken(), token.getRow(), token.getColumn()), token];
    } else if (token?.getType() === TokenType.STRING) {
        return [new StringExpression(token.getToken(), token.getRow(), token.getColumn()), token];
    } else if (token?.getType() === TokenType.TRUE) {
        return [new TrueExpression(token.getRow(), token.getColumn()), token];
    } else if (token?.getType() === TokenType.FALSE) {
        return [new FalseExpression(token.getRow(), token.getColumn()), token];
    } else if (token?.getType() === TokenType.NUMBER) {
        return [new NumberExpression(token.getToken(), token.getRow(), token.getColumn()), token];
    } else if (token?.getType() === TokenType.OPEN_SEQUENCE) {

        const elements: Expression[] = [];

        let row = token.getRow(), column = token.getColumn();

        [expression, token] = interpretExpression(tokens);

        if (token === undefined) {
            throw new TemplateError(row, column, `sequence incorrectly terminated`);
        }

        while (token?.getType() === TokenType.COMMA) {

            if (expression === undefined) {
                throw new TemplateError(token.getRow(), token.getColumn(), `Expression preceding comma in sequence is empty`);
            }
            elements.push(expression);

            row = token.getRow();
            column = token.getColumn();

            [expression, token] = interpretExpression(tokens);

            if (token === undefined) {
                throw new TemplateError(row, column, `sequence incorrectly terminated`);
            }
        }
        if (expression) {
            elements.push(expression);
        }

        if (token?.getType() !== TokenType.CLOSE_SEQUENCE) {
            throw new TemplateError(token.getRow(), token.getColumn(), `Open sequence missing close sequence`);
        }

        return [new SequenceExpression(elements), token];
    } else if (token?.getType() === TokenType.OPEN_HASH) {

        let row = token.getRow(), column = token.getColumn();

        const hash: Record<string, Expression> = {};

        function readKeyPair() {
            if (key?.getType() !== TokenType.STRING) {
                throw new TemplateError(row, column, `Hash missing key string`);
            }

            let colon = tokens.shift();

            if (colon?.getType() !== TokenType.COLON) {
                throw new TemplateError(row, column, `Hash missing colon separator for key value pair`);
            }

            [expression, token] = interpretExpression(tokens);

            if (expression === undefined) {
                throw new TemplateError(row, column, `Expression for value in hash is empty`);
            }

            hash[key.getToken()] = expression;
        }

        let key = tokens.shift();

        if (key?.getType() === TokenType.CLOSE_HASH) {
            return [new HashExpression(hash), token];
        } else {

            readKeyPair();

            while (token?.getType() === TokenType.COMMA) {
                key = tokens.shift();

                readKeyPair();
            }
        }

        if (token?.getType() !== TokenType.CLOSE_HASH) {
            throw new TemplateError(row, column, `Open has  h missing close hash`);
        }

        return [new HashExpression(hash), token];
    } else {
        return [undefined, token];
    }
}


function isBinaryOperator(operator: Token) {

    return operator.getType() === TokenType.BANG ||
        operator.getType() === TokenType.PLUS ||
        operator.getType() === TokenType.MINUS ||
        operator.getType() === TokenType.DIVIDE ||
        operator.getType() === TokenType.MULTIPLY ||
        operator.getType() === TokenType.MODULUS ||
        operator.getType() === TokenType.EQUAL ||
        operator.getType() === TokenType.NOT_EQUAL ||
        operator.getType() === TokenType.AND ||
        operator.getType() === TokenType.OR ||
        operator.getType() === TokenType.LESS_THAN ||
        operator.getType() === TokenType.GREATER_THAN ||
        operator.getType() === TokenType.LESS_THAN_OR_EQUAL ||
        operator.getType() === TokenType.GREATER_THAN_OR_EQUAL ||
        operator.getType() === TokenType.ADD_AND_ASSIGN ||
        operator.getType() === TokenType.SUBTRACT_AND_ASSIGN ||
        operator.getType() === TokenType.MULTIPLY_AND_ASSIGN ||
        operator.getType() === TokenType.DIVIDE_AND_ASSIGN ||
        operator.getType() === TokenType.MODULUS_AND_ASSIGN ||
        operator.getType() === TokenType.ASSIGN ||
        operator.getType() === TokenType.DEREFERENCE ||
        operator.getType() === TokenType.LAMBDA ||
        operator.getType() === TokenType.RANGE_INCLUSIVE ||
        operator.getType() === TokenType.RANGE_EXCLUSIVE ||
        operator.getType() === TokenType.RANGE_LENGTH_DEC ||
        operator.getType() === TokenType.RANGE_LENGTH_INC;
}

function buildBinaryExpression(operator: Token, lhs: Expression, rhs: Expression): Expression {
    if (operator.getType() === TokenType.BANG) {
        return new DefaultExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.PLUS) {
        return new AdditionExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.MINUS) {
        return new SubtractionExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.DIVIDE) {
        return new DivisionExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.MULTIPLY) {
        return new MultiplicationExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.MODULUS) {
        return new ModulusExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.EQUAL) {
        return new EqualExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.NOT_EQUAL) {
        return new NotEqualExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.AND) {
        return new AndExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.OR) {
        return new OrExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.LESS_THAN) {
        return new LessThanExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.GREATER_THAN) {
        return new GreaterThanExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.LESS_THAN_OR_EQUAL) {
        return new LessThanOrEqualExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.GREATER_THAN_OR_EQUAL) {
        return new GreaterThanOrEqualExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.ADD_AND_ASSIGN) {
        return new AddAndAssignExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.SUBTRACT_AND_ASSIGN) {
        return new SubtractAndAssignExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.MULTIPLY_AND_ASSIGN) {
        return new MultiplyAndAssignExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.DIVIDE_AND_ASSIGN) {
        return new DivideAndAssignExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.MODULUS_AND_ASSIGN) {
        return new ModulusAndAssignExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.ASSIGN) {
        return new AssignExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.DEREFERENCE) {
        return new DereferenceExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.LAMBDA) {
        return new LambdaExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.RANGE_INCLUSIVE) {
        return new RangeInclusiveExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.RANGE_EXCLUSIVE) {
        return new RangeExclusiveExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.RANGE_LENGTH_INC) {
        return new RangeLengthIncrementExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.RANGE_LENGTH_DEC) {
        return new RangeLengthDecrementExpression(lhs, rhs, operator.getRow(), operator.getColumn());
    } else {
        throw new TemplateError(operator.getRow(), operator.getColumn(), `Unknown token type '${operator.getType()}'`);
    }
}

function interpretSlice(tokens: Token[]): Expression {
    let [expression, token] = interpretOperand(tokens);

    if (expression === undefined) {
        throw new TemplateError(token.getRow(), token.getColumn(), `Empty range arguments to slice operator`);
    }

    const operator = tokens.shift()!;

    if (operator.getType() === TokenType.CLOSE_SEQUENCE) {
        return expression;
    }

    const rhs = tokens.shift()!;

    if (rhs.getType() === TokenType.CLOSE_SEQUENCE && operator.getType() === TokenType.RANGE_INCLUSIVE) {
        return new RangeStartingExpression(expression, operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.RANGE_INCLUSIVE) {

        expression = new RangeInclusiveExpression(expression, new NumberExpression(rhs.getToken(), rhs.getRow(), rhs.getColumn()), operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.RANGE_EXCLUSIVE) {

        expression = new RangeExclusiveExpression(expression, new NumberExpression(rhs.getToken(), rhs.getRow(), rhs.getColumn()), operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.RANGE_LENGTH_INC) {

        expression = new RangeLengthIncrementExpression(expression, new NumberExpression(rhs.getToken(), rhs.getRow(), rhs.getColumn()), operator.getRow(), operator.getColumn());
    } else if (operator.getType() === TokenType.RANGE_LENGTH_DEC) {

        expression = new RangeLengthDecrementExpression(expression, new NumberExpression(rhs.getToken(), rhs.getRow(), rhs.getColumn()), operator.getRow(), operator.getColumn());
    } else {
        throw new TemplateError(operator.getRow(), operator.getColumn(), `Invalid range specification`);
    }

    const close = tokens.shift()!;

    if (close.getType() !== TokenType.CLOSE_SEQUENCE) {
        throw new TemplateError(close.getRow(), close.getColumn(), `Close sequence expected`);
    }

    return expression;
}

function interpretFunctionArguments(tokens: Token[]): Expression[] {
    const result: Expression[] = [];
    let expression, token;

    [expression, token] = interpretExpression(tokens);

    while (token?.getType() === TokenType.COMMA) {

        if (expression) {
            result.push(expression);
        } else {
            throw new TemplateError(token.getRow(), token.getColumn(), "Expected expression preceding comma in function arguments");
        }

        [expression, token] = interpretExpression(tokens);
    }

    if (expression) {
        result.push(expression);
    }

    return result;
}


function interpretExpression(tokens: Token[]): [Expression | undefined, Token | undefined] {

    let [expression, token] = interpretOperand(tokens);

    if (expression === undefined) {
        return [undefined, token];
    }

    while (tokens.length) {

        const operator = tokens.shift()!;

        if (expression === undefined) {
            throw new TemplateError(operator.getRow(), operator.getColumn(), `Binary operator expects lhs expression`);
        }

        if (operator.getType() === TokenType.CLOSE_PARENTHESIS) {
            return [expression, operator];
        }

        if (operator.getType() === TokenType.COMMA) {
            return [expression, operator];
        }

        if (operator.getType() === TokenType.CLOSE_SEQUENCE) {
            return [expression, operator];
        }

        if (operator.getType() === TokenType.CLOSE_HASH) {
            return [expression, operator];
        }

        if (operator.getType() === TokenType.CALL_METHOD) {
            const args = interpretFunctionArguments(tokens);

            expression = walkUpLeftByPrecedence(operator, expression, (lhs) => new CallMethodExpression(lhs, args, operator.getRow(), operator.getColumn()));
            continue;
        }

        if (operator.getType() === TokenType.CALL_BUILTIN) {

            const name = tokens.shift()!;

            let args: Expression[] = [];
            if (tokens.length && tokens[0].getType() === TokenType.CALL_METHOD) {
                tokens.shift();
                args = interpretFunctionArguments(tokens);
            }

            expression = walkUpLeftByPrecedence(operator, expression, (lhs) => new CallBuiltinExpression(lhs, name.getToken(), args, operator.getRow(), operator.getColumn()));
            continue;
        }

        if (operator.getType() === TokenType.OPEN_SLICE) {
            const slice = interpretSlice(tokens);

            expression = walkUpLeftByPrecedence(operator, expression, (lhs) => new SliceExpression(lhs, slice, operator.getRow(), operator.getColumn()));
            continue;
        }

        if (operator.getType() === TokenType.IS_DEFINED) {
            expression = new IsDefinedExpression(expression, operator.getRow(), operator.getColumn());
            continue;
        }

        if (operator.getType() === TokenType.PLUS_PLUS) {
            expression = new IncrementExpression(expression, operator.getRow(), operator.getColumn());
            continue;
        }

        if (operator.getType() === TokenType.MINUS_MINUS) {
            expression = new DecrementExpression(expression, operator.getRow(), operator.getColumn());
            continue;
        }

        if (!isBinaryOperator(operator)) {

            tokens.unshift(operator);
            const [ancillary, token] = interpretOperand(tokens);
            expression = new AncillaryExpression(expression, ancillary!, operator.getRow(), operator.getColumn());
            continue;
        }

        let rhs = undefined;
        if (tokens.length === 0 && operator.getType() === TokenType.BANG) {
            rhs = new StringExpression("", token.getRow(), token.getColumn());
        } else {
            [rhs, token] = interpretOperand(tokens);

            if (operator.getType() === TokenType.BANG && rhs === undefined) {
                tokens.unshift(token);
                rhs = new StringExpression("", token.getRow(), token.getColumn());
            }

            if (rhs === undefined) {
                throw new TemplateError(token.getRow(), token.getColumn(), `Binary operator expects rhs expression`);
            }
        }

        expression = walkUpLeftByPrecedence(operator, expression, (lhs) => buildBinaryExpression(operator, lhs, rhs));
    }

    return [expression, undefined];
}

function walkUpLeftByPrecedence(operator: Token, subject: Expression, builder: (lhs: Expression) => Expression) {
    if (isComposingExpression(subject) && PRECEDENCE[operator.getToken()] < PRECEDENCE[subject.getOperator()]) {

        let current = subject;
        let next = current.getSubject();
        while (isComposingExpression(next) && PRECEDENCE[operator.getToken()] < PRECEDENCE[next.getOperator()]) {
            current = next;
            next = current.getSubject();
        }
        current.replaceSubject(builder(current.getSubject()));

        return subject;
    } else {
        return builder(subject);
    }
}

export class ExpressionEngine {

    build(text: string, row: number, column: number): Expression {

        const tokens = tokenize(text, row, column);
        const [expression, token] = interpretExpression(tokens);

        if (expression === undefined) {
            throw new TemplateError(row, column, `Expression is empty`);
        }

        if (token !== undefined) {
            throw new TemplateError(row, column, `Expression terminated incorrectly`);
        }
        return expression;
    }
}

