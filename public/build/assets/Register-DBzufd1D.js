import{W as u,r as f,j as e,Y as p,a as x}from"./app-D6HdtFHL.js";import{G as g}from"./GuestLayout-B25Yovqw.js";import{I as o}from"./InputError-C6cKA0ak.js";import{I as m}from"./InputLabel-Bq-szEMf.js";import{P as h}from"./PrimaryButton-BfpGSj9n.js";import{T as i}from"./TextInput-CGSzm_4p.js";import{C as j}from"./Checkbox-UI0eGmtA.js";import{f as v,a as b}from"./utils-ChpLnbXz.js";import"./Logo-D-0B__3z.js";function T(){const{data:a,setData:r,post:l,processing:n,errors:t,reset:d}=u({userType:"",name:"",email:"",password:"",password_confirmation:"",mobile:"",cpf:"",date_of_birth:"",terms:!1});f.useEffect(()=>()=>{d("password","password_confirmation")},[]);const c=s=>{s.preventDefault(),console.log("form",a),l(route("register"))};return e.jsxs(g,{children:[e.jsx(p,{title:"Cadastre-se no Projeto Agilizando"}),e.jsxs("form",{onSubmit:c,id:"register",children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"userType",value:"Escolha um tipo de conta?"}),e.jsxs("select",{id:"userType",name:"userType",value:a.userType,autoComplete:"user-type",className:"mb-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6",children:[e.jsx("option",{children:"Aluno"}),e.jsx("option",{children:"Apoiador"}),e.jsx("option",{children:"Professor"})]}),e.jsx(o,{message:t.name,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(m,{htmlFor:"name",value:"Nome"}),e.jsx(i,{id:"name",name:"name",value:a.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,onChange:s=>r("name",s.target.value),required:!0}),e.jsx(o,{message:t.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"email",value:"Email"}),e.jsx(i,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",onChange:s=>r("email",s.target.value),required:!0}),e.jsx(o,{message:t.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"password",value:"Senha"}),e.jsx(i,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>r("password",s.target.value),required:!0}),e.jsx(o,{message:t.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"password_confirmation",value:"Confirmar Senha"}),e.jsx(i,{id:"password_confirmation",type:"password",name:"password_confirmation",value:a.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>r("password_confirmation",s.target.value),required:!0}),e.jsx(o,{message:t.password_confirmation,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"mobile",value:"DDD + Celular - Digite somente os números"}),e.jsx(i,{id:"mobile",name:"mobile",value:v(a.mobile),className:"mt-1 block w-full",autoComplete:"mobile",isFocused:!0,onChange:s=>r("mobile",s.target.value),required:!0}),e.jsx(o,{message:t.mobile,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"cpf",value:"CPF - Digite somente os números"}),e.jsx(i,{id:"cpf",name:"cpf",value:b(a.cpf),className:"mt-1 block w-full",autoComplete:"cpf",isFocused:!0,onChange:s=>r("cpf",s.target.value),required:!0}),e.jsx(o,{message:t.cpf,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"date_of_birth",value:"Data de Nascimento"}),e.jsx(i,{id:"date_of_birth",name:"date_of_birth",type:"date",value:a.date_of_birth,className:"mt-1 block w-full",autoComplete:"date_of_birth",isFocused:!0,onChange:s=>r("date_of_birth",s.target.value),required:!0}),e.jsx(o,{message:t.date_of_birth,className:"mt-2"})]}),e.jsx("div",{className:"block mt-4",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(j,{name:"terms",checked:a.terms,onChange:s=>r("terms",s.target.checked)}),e.jsxs("span",{className:"ms-2 text-sm text-gray-600 dark:text-gray-400",children:["Eu Concordo com os ",e.jsx("a",{target:"_blank",href:"https://docs.google.com/document/d/1e2FGszR5LdM8hNgoZH9bxhLY6aRDeFJsfrW7J1-xJeY/edit?usp=sharing",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500",children:"Termos dos Serviço "})," e ",e.jsx("a",{target:"_blank",href:"https://docs.google.com/document/d/1p6ZS__VYMmps5Wc2wBCsXWh-D1aKa6Z2X5MlRZXGr58/edit?usp=sharing",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500",children:"Políticas de Privacidade"})]})]})}),e.jsxs("div",{className:"flex items-center justify-end mt-4",children:[e.jsx(x,{href:route("login"),className:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",children:"Já é cadastrado?"}),e.jsx(h,{className:"ms-4",disabled:n,children:"Cadastre-se"})]})]})]})}export{T as default};
