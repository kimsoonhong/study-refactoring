export default function ch6(invoice) {
	let defaultOwnerData = { a: "a", b: "b" };
  function defaultOwner (){return New Personalbar(defaultOwnerData)}
  function setDefaultOwner(arg){defaultOwnerData = arg}


  class Personalbar{
    constructor(data){
      this._b = data.b
      this._a = data.a
    }
    get a(){return this._a}
    get b(){return this._b}
  }


  const personalbar = (item) => {
    let sQty = 0;
    
    return {
        co_nm: item.co_nm,
        spl_nm: item.spl_nm,
        gds_cd: item.gds_cd,
        co_gds_cd: item.co_gds_cd,
        gds_attr: item.gds_attr,
        gds_nm: item.gds_nm,
        bcd: item.bcd,
        sch_qty: sQty,
        gds_seq: item.gds_seq ? item.gds_seq : item.whg_gds_seq,
        spl_list: item.spl_list,
    };
};


	return <div>ch.6</div>;
}
