//// [tests/cases/conformance/types/keyof/circularIndexedAccessErrors.ts] ////

//// [circularIndexedAccessErrors.ts]
type T1 = {
    x: T1["x"];  // Error
};

type T2<K extends "x" | "y"> = {
    x: T2<K>[K];  // Error
    y: number;
}

declare let x2: T2<"x">;
let x2x = x2.x;

interface T3<T extends T3<T>> {
    x: T["x"];
}

interface T4<T extends T4<T>> {
    x: T4<T>["x"];  // Error
}

class C1 {
    x: C1["x"];  // Error
}

class C2 {
    x: this["y"];
    y: this["z"];
    z: this["x"];
}

// Repro from #12627

interface Foo {
    hello: boolean;
}

function foo<T extends Foo | T["hello"]>() {
}


//// [circularIndexedAccessErrors.js]
let x2x = x2.x;
class C1 {
    x; // Error
}
class C2 {
    x;
    y;
    z;
}
function foo() {
}


//// [circularIndexedAccessErrors.d.ts]
type T1 = {
    x: T1["x"]; // Error
};
type T2<K extends "x" | "y"> = {
    x: T2<K>[K]; // Error
    y: number;
};
declare let x2: T2<"x">;
declare let x2x: any;
interface T3<T extends T3<T>> {
    x: T["x"];
}
interface T4<T extends T4<T>> {
    x: T4<T>["x"]; // Error
}
declare class C1 {
    x: C1["x"]; // Error
}
declare class C2 {
    x: this["y"];
    y: this["z"];
    z: this["x"];
}
// Repro from #12627
interface Foo {
    hello: boolean;
}
declare function foo<T extends Foo | T["hello"]>(): void;
