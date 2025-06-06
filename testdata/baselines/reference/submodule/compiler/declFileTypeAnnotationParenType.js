//// [tests/cases/compiler/declFileTypeAnnotationParenType.ts] ////

//// [declFileTypeAnnotationParenType.ts]
class c {
    private p: string;
}

var x: (() => c)[] = [() => new c()];
var y = [() => new c()];

var k: (() => c) | string = (() => new c()) || "";
var l = (() => new c()) || "";

//// [declFileTypeAnnotationParenType.js]
class c {
    p;
}
var x = [() => new c()];
var y = [() => new c()];
var k = (() => new c()) || "";
var l = (() => new c()) || "";


//// [declFileTypeAnnotationParenType.d.ts]
declare class c {
    private p;
}
declare var x: (() => c)[];
declare var y: (() => c)[];
declare var k: (() => c) | string;
declare var l: string | (() => c);
