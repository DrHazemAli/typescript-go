//// [tests/cases/conformance/classes/propertyMemberDeclarations/strictPropertyInitialization.ts] ////

//// [strictPropertyInitialization.ts]
// Properties with non-undefined types require initialization

class C1 {
    a: number;  // Error
    b: number | undefined;
    c: number | null;  // Error
    d?: number;
    #f: number; //Error
    #g: number | undefined;
    #h: number | null; //Error
    #i?: number;
}

// No strict initialization checks in ambient contexts

declare class C2 {
    a: number;
    b: number | undefined;
    c: number | null;
    d?: number;
    
    #f: number;
    #g: number | undefined;
    #h: number | null;
    #i?: number;
}

// No strict initialization checks for static members

class C3 {
    static a: number;
    static b: number | undefined;
    static c: number | null;
    static d?: number;
}

// Initializer satisfies strict initialization check

class C4 {
    a = 0;
    b: number = 0;
    c: string = "abc";
    #d = 0
    #e: number = 0
    #f: string= "abc"
}

// Assignment in constructor satisfies strict initialization check

class C5 {
    a: number;
    #b: number;
    constructor() {
        this.a = 0;
        this.#b = 0;
    }
}

// All code paths must contain assignment

class C6 {
    a: number;  // Error
    #b: number
    constructor(cond: boolean) {
        if (cond) {
            return;
        }
        this.a = 0;
        this.#b = 0;
    }
}

class C7 {
    a: number;
    #b: number;
    constructor(cond: boolean) {
        if (cond) {
            this.a = 1;
            this.#b = 1;
            return;
        }
        this.a = 0;
        this.#b = 1;
    }
}

// Properties with string literal names aren't checked

class C8 {
    a: number;  // Error
    "b": number;
    0: number;
}

// No strict initialization checks for abstract members

abstract class C9 {
    abstract a: number;
    abstract b: number | undefined;
    abstract c: number | null;
    abstract d?: number;
}

// Properties with non-undefined types must be assigned before they can be accessed
// within their constructor

class C10 {
    a: number;
    b: number;
    c?: number;
    #d: number;
    constructor() {
        let x = this.a;  // Error
        this.a = this.b;  // Error
        this.b = this.#d //Error
        this.b = x;
        this.#d = x;
        let y = this.c;
    }
}

// Property is considered initialized by type any even though value could be undefined

declare function someValue(): any;

class C11 {
    a: number;
    #b: number;
    constructor() {
        this.a = someValue();
        this.#b = someValue();
    }
}

const a = 'a';
const b = Symbol();

class C12 {
    [a]: number;
    [b]: number;
    ['c']: number;

    constructor() {
        this[a] = 1;
        this[b] = 1;
        this['c'] = 1;
    }
}

enum E {
    A = "A",
    B = "B"
}
class C13 {
    [E.A]: number;
    constructor() {
        this[E.A] = 1;
    }
}


//// [strictPropertyInitialization.js]
// Properties with non-undefined types require initialization
class C1 {
    a; // Error
    b;
    c; // Error
    d;
    #f; //Error
    #g;
    #h; //Error
    #i;
}
// No strict initialization checks for static members
class C3 {
    static a;
    static b;
    static c;
    static d;
}
// Initializer satisfies strict initialization check
class C4 {
    a = 0;
    b = 0;
    c = "abc";
    #d = 0;
    #e = 0;
    #f = "abc";
}
// Assignment in constructor satisfies strict initialization check
class C5 {
    a;
    #b;
    constructor() {
        this.a = 0;
        this.#b = 0;
    }
}
// All code paths must contain assignment
class C6 {
    a; // Error
    #b;
    constructor(cond) {
        if (cond) {
            return;
        }
        this.a = 0;
        this.#b = 0;
    }
}
class C7 {
    a;
    #b;
    constructor(cond) {
        if (cond) {
            this.a = 1;
            this.#b = 1;
            return;
        }
        this.a = 0;
        this.#b = 1;
    }
}
// Properties with string literal names aren't checked
class C8 {
    a; // Error
    "b";
    0;
}
// No strict initialization checks for abstract members
class C9 {
    a;
    b;
    c;
    d;
}
// Properties with non-undefined types must be assigned before they can be accessed
// within their constructor
class C10 {
    a;
    b;
    c;
    #d;
    constructor() {
        let x = this.a; // Error
        this.a = this.b; // Error
        this.b = this.#d; //Error
        this.b = x;
        this.#d = x;
        let y = this.c;
    }
}
class C11 {
    a;
    #b;
    constructor() {
        this.a = someValue();
        this.#b = someValue();
    }
}
const a = 'a';
const b = Symbol();
class C12 {
    [a];
    [b];
    ['c'];
    constructor() {
        this[a] = 1;
        this[b] = 1;
        this['c'] = 1;
    }
}
var E;
(function (E) {
    E["A"] = "A";
    E["B"] = "B";
})(E || (E = {}));
class C13 {
    [E.A];
    constructor() {
        this[E.A] = 1;
    }
}


//// [strictPropertyInitialization.d.ts]
// Properties with non-undefined types require initialization
declare class C1 {
    #private;
    a: number; // Error
    b: number | undefined;
    c: number | null; // Error
    d?: number;
}
// No strict initialization checks in ambient contexts
declare class C2 {
    #private;
    a: number;
    b: number | undefined;
    c: number | null;
    d?: number;
}
// No strict initialization checks for static members
declare class C3 {
    static a: number;
    static b: number | undefined;
    static c: number | null;
    static d?: number;
}
// Initializer satisfies strict initialization check
declare class C4 {
    #private;
    a: number;
    b: number;
    c: string;
}
// Assignment in constructor satisfies strict initialization check
declare class C5 {
    #private;
    a: number;
    constructor();
}
// All code paths must contain assignment
declare class C6 {
    #private;
    a: number; // Error
    constructor(cond: boolean);
}
declare class C7 {
    #private;
    a: number;
    constructor(cond: boolean);
}
// Properties with string literal names aren't checked
declare class C8 {
    a: number; // Error
    "b": number;
    0: number;
}
// No strict initialization checks for abstract members
declare abstract class C9 {
    abstract a: number;
    abstract b: number | undefined;
    abstract c: number | null;
    abstract d?: number;
}
// Properties with non-undefined types must be assigned before they can be accessed
// within their constructor
declare class C10 {
    #private;
    a: number;
    b: number;
    c?: number;
    constructor();
}
// Property is considered initialized by type any even though value could be undefined
declare function someValue(): any;
declare class C11 {
    #private;
    a: number;
    constructor();
}
declare const a = "a";
declare const b: unique symbol;
declare class C12 {
    [a]: number;
    [b]: number;
    ['c']: number;
    constructor();
}
declare enum E {
    A = "A",
    B = "B"
}
declare class C13 {
    [E.A]: number;
    constructor();
}
