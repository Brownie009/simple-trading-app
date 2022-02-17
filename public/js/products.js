
//Assigning href's on anchor tags inside seller cells in table
const hiddenSellerNames = document.getElementsByClassName('hiddenSellerName');
const hiddenSellerIds = document.getElementsByClassName('hiddenSellerId');
const namesArray = [];
const idsArray = [];
const combinedArray = [];
for(let sellerName of hiddenSellerNames) {
  namesArray.push(sellerName.innerText);
}
for(let sellerId of hiddenSellerIds) {
  idsArray.push(sellerId.innerText);
}
for(let i = 0; i < namesArray.length; i++) {
  combinedArray.push({ name: namesArray[i], id: idsArray[i]});
}
 const sellerCells = document.getElementsByClassName('sellerCell');
 for(let cell of sellerCells) {
   for(let element of combinedArray) {
     if(cell.firstChild.innerText === element.name) {
       cell.firstChild.setAttribute(`href`,`/sellers/${element.id}`);
       break;
     }
   }
 }
 //Event Listeners and reactions for when user clicks +1 or -1 in qty cell
const plusSpans = document.getElementsByClassName('plus');
for(let plusSpan of plusSpans) {
    plusSpan.addEventListener('click', () => {
        const plusSpanId = plusSpan.id;
        const productName = plusSpanId.substring(0, plusSpanId.length - 4);
        //Add 1 to qty value
        let qtyValueSpan = document.getElementById(`${productName}qtyValue`);
        qtyValueSpan.innerText++;

        const unitPriceSpan = document.getElementById(`${productName}unitPriceSpan`);
        const totalPriceSpan = document.getElementById(`${productName}totalPriceSpan`);
        const inputQty = document.getElementById(`${productName}inputQty`);
        //Change total price value in table based on qty
        totalPriceSpan.innerText = ((qtyValueSpan.innerText)*(unitPriceSpan.innerText)).toFixed(2);
        //Plus 1 for qty input value in /buy form
        inputQty.value = qtyValueSpan.innerText;
    });
}
const minusSpans = document.getElementsByClassName('minus');
for(let minusSpan of minusSpans) {
    minusSpan.addEventListener('click', () => {
      const minusSpanId = minusSpan.id;
      const productName = minusSpanId.substring(0, minusSpanId.length - 5);
      //Minus 1 to qty value if qty > 1, otherwise keep qty at 1
      let qtyValueSpan = document.getElementById(`${productName}qtyValue`);
      if(qtyValueSpan.innerText > 1) {
        qtyValueSpan.innerText--;
      } else {
        qtyValueSpan.innerText = 1;
      }

      const unitPriceSpan = document.getElementById(`${productName}unitPriceSpan`);
      const totalPriceSpan = document.getElementById(`${productName}totalPriceSpan`);
      const inputQty = document.getElementById(`${productName}inputQty`);
      //Change total price value in table based on qty
      totalPriceSpan.innerText = ((qtyValueSpan.innerText)*(unitPriceSpan.innerText)).toFixed(2);
      //Adjust qty input value in /buy form
      inputQty.value = qtyValueSpan.innerText;
    });
}

const buyButtons = document.getElementsByClassName('buyBtn');
const buyCells = document.getElementsByClassName('buyCell');
window.addEventListener('resize', () => {
    console.log(`Button has width ${buyButtons[0].clientWidth}`);
    console.log(`Cell has width ${buyCells[0].clientWidth}`);
});


