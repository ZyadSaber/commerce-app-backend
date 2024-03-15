"use strict";(self.webpackChunkcommerce_app=self.webpackChunkcommerce_app||[]).push([[122],{1462:(e,n,a)=>{a.d(n,{Z:()=>g});var d,t=a(2791),l=a(8045),r=a(168),i=a(456),o=a(8688),s=a(5079);const c=(0,i.Z)(o.Z)(d||(d=(0,r.Z)(["\n  width: 100%;\n  /* padding: 5px 7px; */\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  transition: border-color 0.3s;\n  margin: 0;\n  box-sizing: border-box;\n  /* ","; */\n\n  &:focus {\n    outline: none !important;\n    border-color: #007bff;\n  }\n"])),(e=>{let{required:n}=e;return n&&"background-color:  ".concat(s.primaryColors.required)}));var h=a(184);const p=e=>{let{disabled:n,value:a,name:d,label:r,onChange:i,height:o,width:s="200px",margin:p,max:g,min:m=0,fixedBy:_=2,...b}=e;const x=(0,t.useCallback)((e=>{i({name:d,value:+e.toFixed(_)})}),[_,d,i]);return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(l.Z,{label:r,width:s,height:o,margin:p,hasContent:!(null===a||void 0===a||!a.toString()),children:(0,h.jsx)(c,{disabled:n,value:a,name:d,onChange:x,margin:p,max:g,min:m,fixedBy:_,...b})})})},g=(0,t.memo)(p)},5122:(e,n,a)=>{a.r(n),a.d(n,{default:()=>u});var d=a(2791),t=a(5424),l=a(5516),r=a(5104),i=a(8446),o=a(3510),s=a(1626),c=a(1222),h=a(1462),p=a(4908),g=a(184);const m=e=>{let{selectedRecord:n,handleClose:a,handleSaveRecord:t,loading:l,visible:m,fetchTableData:_}=e;const{state:b,onChange:x}=(0,r.BM)({initialValues:n}),{eng_page_parent_name:u,arab_page_parent_name:v,hidden:w,page_parent_index:C}=b,f=(0,d.useCallback)((()=>{t({data:b,cb:e=>{let{error:n}=e;if(n)return(0,c.Z)("error",n.message);a(),_(),(0,c.Z)("success")}})}),[_,a,t,b]);return(0,g.jsx)(p.Z,{label:"dtls",onClose:a,onOK:f,loading:l,visible:m,children:(0,g.jsxs)(s.Z,{width:"100%",align:"center",wrap:!0,gap:"10px",children:[(0,g.jsx)(i.Z,{name:"eng_page_parent_name",onChange:x,value:u,label:"englshnm",width:"49%"}),(0,g.jsx)(i.Z,{name:"arab_page_parent_name",onChange:x,value:v,width:"49%",label:"arbcnm"}),(0,g.jsx)(h.Z,{name:"page_parent_index",onChange:x,value:C,label:"indx",width:"49%"}),(0,g.jsx)(o.Z,{name:"hidden",onChange:x,checked:w,label:"hdn"})]})})},_=(0,d.memo)(m),b=[{title:"id",dataIndex:"page_parent_id",width:"9%"},{title:"englshnm",dataIndex:"eng_page_parent_name",width:"40%"},{title:"arbcnm",dataIndex:"arab_page_parent_name",width:"40%"},{title:"indx",dataIndex:"page_parent_index",width:"4%"},{title:"hdn",dataIndex:"hidden",width:"4%"}],x=()=>{const{tableRef:e,fetchTableData:n}=(0,l.R$)(),{selectedRecord:a,setSelectedRecord:d,visible:r,handleClose:i,handleAdd:o,handleEdit:s,handleDelete:c,handleSaveRecord:h,loading:p}=(0,l.FS)({apiId:"POST_PAGE_PARENT_TABLE_DATA",runFetch:n});return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(t.V1,{children:"pgsprntspg"}),(0,g.jsx)(l.ZP,{ref:e,apiId:"QUERY_PAGE_PARENT_TABLE_DATA",columns:b,fetchOnFirstRun:!0,rowKey:"page_parent_id",onSelectedRow:d,hideTools:!1,canAdd:!0,canDelete:!0,canEdit:!0,handleAdd:o,handleEdit:s,handleDelete:c}),r&&(0,g.jsx)(_,{visible:r,selectedRecord:a,handleClose:i,handleSaveRecord:h,loading:p,fetchTableData:n})]})},u=(0,d.memo)(x)}}]);
//# sourceMappingURL=122.2e205baf.chunk.js.map