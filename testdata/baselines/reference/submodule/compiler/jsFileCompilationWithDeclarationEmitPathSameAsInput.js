//// [tests/cases/compiler/jsFileCompilationWithDeclarationEmitPathSameAsInput.ts] ////

//// [a.ts]
class c {
}

//// [a.d.ts]
declare function isC(): boolean;

//// [a.js]
class c {
}


//// [a.d.ts]
declare class c {
}
