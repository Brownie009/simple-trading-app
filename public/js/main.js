
const navHome = document.getElementById('navHome');
const navProducts = document.getElementById('navProducts');
const navSellers = document.getElementById('navSellers');
const navTransactions = document.getElementById('navTransactions');
const navElements = document.getElementsByClassName('navElement');
navHome.addEventListener('click', () => {
  window.location.href = '/';
 });
navProducts.addEventListener('click', () => {
  window.location.href = '/products';
});
navSellers.addEventListener('click', () => {
  window.location.href = '/sellers';
});
navTransactions.addEventListener('click', () => {
  window.location.href = '/transactions';
});
//Reduce size of nav element text for smaller width screens
if(window.innerWidth < 700) {
  navHome.innerHTML = '<p style="margin:auto;"><b>HOME</b></p>';
  navProducts.innerHTML = '<p style="margin:auto;"><b>PRODUCTS</b></p>';
  navSellers.innerHTML = '<p style="margin:auto;"><b>SELLERS</b></p>';
  navTransactions.innerHTML = '<p style="margin:auto;"><b>TRANSACTIONS</b></p>';
} else {
  navHome.innerHTML = '<h4>HOME</h4>';
  navProducts.innerHTML = '<h4>PRODUCTS</h4>';
  navSellers.innerHTML = '<h4>SELLERS</h4>';
  navTransactions.innerHTML = '<h4>TRANSACTIONS</h4>';
}

window.addEventListener('resize', () => {
  if(window.innerWidth < 700) {
    navHome.innerHTML = '<p style="margin:auto;"><b>HOME</b></p>';
    navProducts.innerHTML = '<p style="margin:auto;"><b>PRODUCTS</b></p>';
    navSellers.innerHTML = '<p style="margin:auto;"><b>SELLERS</b></p>';
    navTransactions.innerHTML = '<p style="margin:auto;"><b>TRANSACTIONS</b></p>';
  } else {
    navHome.innerHTML = '<h4>HOME</h4>';
    navProducts.innerHTML = '<h4>PRODUCTS</h4>';
    navSellers.innerHTML = '<h4>SELLERS</h4>';
    navTransactions.innerHTML = '<h4>TRANSACTIONS</h4>';
  }
});

//Shade NavBar element corresponding to the page a user is on. 
if(window.location.href.slice(-1) == '/' ) {
  navHome.style.backgroundColor = 'rgb(233, 233, 233)';
} else if(window.location.href.slice(-9) == '/products') {
  navProducts.style.backgroundColor = 'rgb(233, 233, 233)';
} else if(window.location.href.slice(-8) == '/sellers') {
  navSellers.style.backgroundColor = 'rgb(233, 233, 233)';
} else if(window.location.href.slice(-13) == '/transactions') {
  navTransactions.style.backgroundColor = 'rgb(233, 233, 233)';
} 
//Shade on Nav element when mouse hover
for(let navElement of navElements) {
  navElement.addEventListener('mouseover', () => {
    if(navElement.style.backgroundColor !== 'rgb(233, 233, 233)') {
      navElement.style.backgroundColor = 'rgb(247, 247, 247)';
    } else {
      navElement.style.backgroundColor = 'rgb(233, 233, 233)';
    } 
  });
  navElement.addEventListener('mouseleave', () => {
    if(navElement.style.backgroundColor !== 'rgb(233, 233, 233)') {
      navElement.style.backgroundColor = "";
    } else {
      navElement.style.backgroundColor = 'rgb(233, 233, 233)';
    }
  });
}
//Button shade responses for hover and clicks whether click leads to a successful submit or not.
const buttonsOnPage = document.getElementsByClassName('btn');
for(let button of buttonsOnPage) {
  button.style.border = "1px solid black";
}

for(let button of buttonsOnPage) {
  button.style.backgroundColor = "rgb(247, 247, 247)";
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = "rgb(233, 233, 233)";
  });
  button.addEventListener('mousedown', () => {
    button.style.backgroundColor = "rgb(205, 205, 205)";
  });
  button.addEventListener('mouseup', () => {
    button.style.backgroundColor = "rgb(233, 233, 233)";
  });
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = "rgb(247, 247, 247)";

  });
}

//When sessionMeter = 2, display sessionMessage for about 4 seconds
const sessionMessageDiv = document.getElementsByClassName('sessionMessageDiv')[0];
const sessionMeterDiv = document.getElementsByClassName('sessionMeterDiv')[0];
console.log(`Session message is: ${sessionMessageDiv.innerText}`);
console.log(`Session meter is: ${sessionMeterDiv.innerText}`);
const messageDiv = document.getElementsByClassName('message')[0];

if(parseFloat(sessionMeterDiv.innerText) === 2) { 
     originalMessageText = messageDiv.children[0].innerText;
     messageDiv.children[0].innerHTML = `<b>${sessionMessageDiv.innerText}</b>`;
     setTimeout(() => {
      messageDiv.children[0].innerText = originalMessageText;
     }, 4000);   
}