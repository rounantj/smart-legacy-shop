import React, { useEffect, useState } from "react";
import inputStyle from '@styles/components/InputText.module.css'
import { Affiliate } from "@models/Affiliate";
import { ajustStrigfy } from "@models/masks";
 
 
 

 

function SelectBox( ) {
 
  const [locais, setLocais] = useState<Affiliate[]>([])
  const [nameAffiliate, setNameAffilaite] = useState<string>("")
  

  React.useEffect(()=>{
    var l = localStorage.getItem("FULL_DELIVERY_DEFAULT")
    if(!l || l == null){ l = '[]'}
    var Locals = JSON.parse(ajustStrigfy(l))
    let Lojas : Affiliate | any = []
   
    
    for(const k in Locals){
      Lojas.push({
        "address": Locals[k].affiliates_business_endereco,
        "name": Locals[k].affiliates_business_name,
        "telephone": Locals[k].affiliates_business_telefone,
      })
      var AFFILIATE_ID = Number(process.env.AFFILIATE_ID)
      var myID : number = 0
      if(AFFILIATE_ID != null){
        myID = Number(AFFILIATE_ID)
      }else{
        
        myID = Number(process.env.AFFILIATE_ID)
      }
     
      if(Locals[k].id == myID){
   
        setNameAffilaite(
          Locals[k].affiliates_business_name
        )
      }
    }
 
    setLocais(Lojas)
  },[])
  React.useEffect(()=>{
    
  },[locais])

  return (
  
   
    <div className={ inputStyle.headerSelect }>
      <label className={ inputStyle.labelComboBox }>Comprando em</label>
        <div className={inputStyle.inlineFlex}>
            <select className={ inputStyle.comboBoxHeader } disabled    > 
                <option   className="opcao">{nameAffiliate}</option> 
            </select>
            <div className={inputStyle.roundIcon}> </div>
       

        </div>
    </div>
 
  );
}

 

export default SelectBox;