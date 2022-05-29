import {useState,useEffect,useReducer} from 'react'


const reducer=(state,action)=>{
	switch(action.type){
		case 'title':
		return{...state,title:action.payload}
		case 'amount':
		return{...state,amount:action.payload}
		
		default: throw new Error()
	}
}
const expReducer=(state,action)=>{
	switch(action.type){
		case 'extitle':
		return{...state,title:action.payload}
		case 'examount':
		return{...state,amount:action.payload}
		
		default: throw new Error()
	}
}
	

const Liabilities=()=>{
	const [state,dispatch]=useReducer(reducer,{
		title:"",
		amount:null,
		
	})
	const [expState,expDispatch]=useReducer(expReducer,{
		title:"",
		amount:null,
		
	})

return(
<article className=" p-3 text-lg font-bold uppercase w-full bg-blue-500 text-center">
<h2>Liabilities</h2>
<section>
<form>
<label htmlFor='title' >Title</label>
<input id='title' value={state.title} onChange={(e)=>dispatch({type:'title',payload:e.target.value})}></input>
<label htmlFor='amount' >Amount</label>
<input id='amount' value={state.amount} onChange={(e)=>dispatch({type:'amount',payload:e.target.value})}></input>
</form>
<h3 className='flex flex-col'>
<p>title:{state.title}</p>
<p>amount:{state.amount}</p>
</h3>



<form>
<label htmlFor='extitle' >exTitle</label>
<input id='extitle' value={expState.title} onChange={(e)=>expDispatch({type:'extitle',payload:e.target.value})}></input>
<label htmlFor='examount' >exAmount</label>
<input id='examount' value={expState.amount} onChange={(e)=>expDispatch({type:'examount',payload:e.target.value})}></input>
</form>

<h3 className='flex flex-col'>
<p>title:{expState.title}</p>
<p>amount:{expState.amount}</p>
</h3>

</section>



</article>
)
}

export default Liabilities