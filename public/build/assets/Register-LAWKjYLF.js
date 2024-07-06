import{W as u,r as f,j as e,Y as x,a as p}from"./app-gpDCHEp-.js";import{G as g}from"./GuestLayout-paannTxQ.js";import{I as o}from"./InputError-DvpV0mKi.js";import{I as m}from"./InputLabel-__Mp8-w7.js";import{P as h}from"./PrimaryButton-BvNxC6BW.js";import{T as l}from"./TextInput-Ccc3dDPE.js";import{C as j}from"./Checkbox-vU-r5REQ.js";import{f as v,a as b}from"./utils-ChpLnbXz.js";import"./Logo-CddAL6mG.js";function E(){const{data:a,setData:t,post:i,processing:n,errors:r,reset:d}=u({name:"",email:"",password:"",password_confirmation:"",mobile:"",cpf:"",date_of_birth:"",terms:!1});f.useEffect(()=>()=>{d("password","password_confirmation")},[]);const c=s=>{s.preventDefault(),console.log("form",a),i(route("register"))};return e.jsxs(g,{children:[e.jsx(x,{title:"Cadastre-se no Projeto Agilizando"}),e.jsxs("form",{onSubmit:c,id:"register",children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"name",value:"Nome"}),e.jsx(l,{id:"name",name:"name",value:a.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,onChange:s=>t("name",s.target.value),required:!0}),e.jsx(o,{message:r.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"email",value:"Email"}),e.jsx(l,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",onChange:s=>t("email",s.target.value),required:!0}),e.jsx(o,{message:r.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"password",value:"Senha"}),e.jsx(l,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>t("password",s.target.value),required:!0}),e.jsx(o,{message:r.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"password_confirmation",value:"Confirmar Senha"}),e.jsx(l,{id:"password_confirmation",type:"password",name:"password_confirmation",value:a.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>t("password_confirmation",s.target.value),required:!0}),e.jsx(o,{message:r.password_confirmation,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"mobile",value:"Telefone Celular - Digite somente os números"}),e.jsx(l,{id:"mobile",name:"mobile",value:v(a.mobile),className:"mt-1 block w-full",autoComplete:"mobile",isFocused:!0,onChange:s=>t("mobile",s.target.value),required:!0}),e.jsx(o,{message:r.mobile,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"cpf",value:"CPF - Digite somente os números"}),e.jsx(l,{id:"cpf",name:"cpf",value:b(a.cpf),className:"mt-1 block w-full",autoComplete:"cpf",isFocused:!0,onChange:s=>t("cpf",s.target.value),required:!0}),e.jsx(o,{message:r.mobile,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"date_of_birth",value:"Data de Nascimento"}),e.jsx(l,{id:"date_of_birth",name:"date_of_birth",type:"date",value:a.date_of_birth,className:"mt-1 block w-full",autoComplete:"date_of_birth",isFocused:!0,onChange:s=>t("date_of_birth",s.target.value),required:!0}),e.jsx(o,{message:r.mobile,className:"mt-2"})]}),e.jsx("div",{className:"block mt-4",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(j,{name:"terms",checked:a.terms,onChange:s=>t("terms",s.target.checked)}),e.jsxs("span",{className:"ms-2 text-sm text-gray-600 dark:text-gray-400",children:["Eu Concordo com os ",e.jsx("a",{target:"_blank",href:route("terms.show"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500",children:"Termos dos Serviço "})," e ",e.jsx("a",{target:"_blank",href:route("policy.show"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500",children:"Políticas de Privacidade"})]})]})}),e.jsxs("div",{className:"flex items-center justify-end mt-4",children:[e.jsx(p,{href:route("login"),className:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",children:"Já é cadastrado?"}),e.jsx(h,{className:"ms-4",disabled:n,children:"Cadastre-se"})]})]})]})}export{E as default};
