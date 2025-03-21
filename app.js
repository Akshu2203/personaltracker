let currentUser=null;
let transactions=[];
Window.onload=function(){
    if(localStorage.getItem("currentUser")){
        currentUser=localStorage.getItem("currentUser");
    }else{
        window.location.href="login.html";
    }
transactions=JSON.parse(localStorage.getItem("transactions"))||[];
updateTransactionsList();
};
function logout(){
    localStorage.removeItem("currentUser");
    currentUser=null;
    window.location.href="login.html";
}
document.getElementById("transaction-form")?.addEventListener("submit",function(e){
    e.preventDefault();
    const date=document.getElementById("date").value;
    const amount=parseFloat(document.getElementById("amount").value);
    const category=document.getElementById("category").value;
    const type=document.getElementById("type").value;
    if(category && !isNaN(amount)){
        transactions.push({date,category,amount,type});
        localStorage.setItem("transactions",JSON.stringify(transactions));
        updateTransactionsList();
    }
});

function updateTransactionsList(){
    const transactionList=document.getElementById("transaction-list");
    transactionList.innerHTML="";
    let balance=0;
    transactions.forEach(transaction=>{
        const li=document.createElement("li");
        li.textContent=`${transaction.category}:$${transaction.amount}(${transaction.type});`
        const deleteButton=document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click",function(){
            deleteTransaction(index);
        });
        li.appendChild(deleteButton);
        transactionList.appendChild(li);
        if(transaction.type==="income"){
            balance+=transaction.amount;
        }else {
            balance-=transaction.amount;
        }

    });
    document.getElementById("balance").textContent=`$${balance};`
}
function deleteTransaction(index){
    transactions.splice(index,1);
    localStorage.setItem("transactions",JSON.stringify(transactions));
    updateTransactionsList();
}