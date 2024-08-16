var e={id:"operation-pdf-generator",name:"Generate PDF",icon:"picture_as_pdf",description:"Generate a pdf with flow data and the template.",overview:({filename:e})=>[{label:"Filename",text:e}],options:[{field:"permissions",name:"$t:permissions",type:"string",schema:{default_value:"$trigger"},meta:{width:"full",interface:"select-dropdown",options:{choices:[{text:"From Trigger",value:"$trigger"},{text:"Public Role",value:"$public"},{text:"Full Access",value:"$full"}],allowOther:!0}}},{field:"filename",name:"Filename",type:"string",meta:{width:"full",interface:"input"}},{field:"folder",name:"Folder",type:"uuid",meta:{width:"half",interface:"system-folder"}},{field:"storage",name:"Storage",type:"string",meta:{width:"half",interface:"input",options:{placeholder:"local",iconRight:"storage"}}},{field:"template",name:"Template",type:"json",meta:{width:"full",interface:"input-code",options:{lineWrapping:!0,language:"JSON",template:JSON.stringify({content:[]})}}},{field:"fonts",name:"Fonts",type:"json",meta:{width:"full",interface:"list",special:"cast-json",options:{template:"{{ font_family }} - {{ font_type }}",fields:[{field:"font_family",name:"Font Family",type:"string",meta:{width:"full",interface:"input",required:!0,options:{placeholder:"Roboto",iconRight:"type_specimen"}}},{field:"font_type",name:"Font Type",type:"string",meta:{width:"full",interface:"select-dropdown",required:!0,options:{allowOther:!0,choices:[{text:"Regular",value:"Regular"},{text:"Bold",value:"Bold"},{text:"Italic",value:"Italic"},{text:"BoldItalic",value:"BoldItalic"}]}}},{field:"url",name:"Url",type:"string",meta:{width:"full",interface:"input",required:!0,options:{placeholder:"https://example.com/fonts/font.ttf",iconRight:"link"}}}]}}}]};export{e as default};
