//custom.d.ts

//CSS in JS :JSS
declare module "*.css"{
  const css:{ [key:string] :string};
  export default css;
}