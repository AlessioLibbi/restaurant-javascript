// Definisci il Menu
const menu = [
  { id: 1, nome: "Insalata Caprese", tipo: "antipasto", prezzo: 8.50, ordinato: false },
  { id: 2, nome: "Bresaola, ricotta e rucola", tipo: "antipasto", prezzo: 8.00, ordinato: false },
  { id: 3, nome: "Tortino al radicchio", tipo: "antipasto", prezzo: 7.50, ordinato: false },
  { id: 4, nome: "Pasta al Pesto", tipo: "primo", prezzo: 12.50, ordinato: false },
  { id: 5, nome: "Lasagne al ragù", tipo: "primo", prezzo: 12.50, ordinato: false },
  { id: 6, nome: "Carbonara", tipo: "primo", prezzo: 12.50, ordinato: false },
  { id: 7, nome: "Pasta al tonno", tipo: "primo", prezzo: 9.50, ordinato: false },
  { id: 8, nome: "Bistecca alla Griglia", tipo: "secondo", prezzo: 20.00, ordinato: false },
  { id: 9, nome: "Orata al forno", tipo: "secondo", prezzo: 20.00, ordinato: false },
  { id: 10, nome: "Spezzatino di maiale", tipo: "secondo", prezzo: 20.00, ordinato: false },
  { id: 11, nome: "Tagliata di manzo", tipo: "secondo", prezzo: 25.00, ordinato: false },
  { id: 12, nome: "Tiramisù", tipo: "dessert", prezzo: 9.50, ordinato: false },
  { id: 13, nome: "Gelato", tipo: "dessert", prezzo: 9.50, ordinato: false },
  { id: 14, nome: "Meringata", tipo: "dessert", prezzo: 9.50, ordinato: false }
  // Altri piatti ....
];

// Select tipo piatto


// Ordine LocalStorage
var order = JSON.parse(localStorage.getItem('savedOrder')) ?? []

var total = 0



// Totale ordine
var priceCounter = []

function generaSelectTipo() {

  var tipi = []
  var selectType = document.querySelector('#tipo-piatto');
  tipi.push('Seleizona categoria')
  optDef = document.createElement("option")
  optDef.innerHTML = 'Seleziona categoria'
  optDef.value = ""
  selectType.appendChild(optDef)
  menu.forEach(element => {
    if (!tipi.includes(element.tipo)) {
      tipi.push(element.tipo)
      const opt = document.createElement("option")
      opt.innerHTML = element.tipo
      opt.value = element.tipo
      selectType.appendChild(opt)
    }
  });
}

function showPiatti(tipo) {
  var plateList = document.querySelector('#piatti')
  plateList.innerHTML = ""
  var plateToShow = menu.filter(plate => plate.tipo === tipo)
  plateToShow.forEach(plate => {
    var plateDiv = document.createElement("div")
    plateDiv.classList.add("piatto-singolo")
    plateDiv.innerHTML = plate.nome + " " + plate.prezzo + "€"
    plateList.appendChild(plateDiv)
    plateDiv.addEventListener("click", () => addPiatto(plate))
  })
}

function addPiatto(plate) {
  ;
  if(confirm("Aggiunto " + plate.nome + " all'ordine") === true) {
    id = Math.floor(Math.random() * (200 - 100) + 100);
  newPlate = {...plate};
  newPlate.id = id
  order.push(newPlate)
  localStorage.setItem('savedOrder', JSON.stringify(order));
  showOrder();
  } else {

  }
  
}


function deletePlateFun(plate) {

  var deleteIndex = order.indexOf(plate);
  if(confirm(`Vuoi rimuovere ${plate.nome} dall ordine?`) === true) {
    if(deleteIndex !== -1) {
      order.splice(deleteIndex, 1 );
      localStorage.setItem('savedOrder', JSON.stringify(order));
    showOrder();
    } 
  }
 
}

function showOrder() {

  var orderList = document.querySelector('.order-space')
  orderList.innerHTML = ""
  order.forEach(plate => {
    var orderDiv = document.createElement("div")
    orderDiv.classList.add("ordine-singolo")
    orderDiv.innerHTML = `${plate.nome}`
    orderList.appendChild(orderDiv)
    var deletePlate = document.createElement("span");
    deletePlate.classList.add('delete-btn');
    deletePlate.innerHTML = `   ${plate.prezzo}€    <i class="fa-solid fa-xmark" style="color: #ff0000;"></i>`
    orderDiv.appendChild(deletePlate);
    deletePlate.addEventListener('click', () => {
      deletePlateFun(plate)
    })

  })
  getPrice()

}


function getPrice() {

  total = 0
  var priceList = document.querySelector('.price-list')
  var dollarCount = document.createElement("p")
  dollarCount.classList.add('price-counter')

  order.forEach((plate) => {
    total += plate.prezzo
  })
  console.log(total);
  localStorage.setItem('setPrice', total);

  //total= priceCounter.reduce(function(a, b) { return a + b; }, 0);
  priceList.innerHTML = `Il tuo conto e ${total}€`
  priceList.appendChild(dollarCount)
}



const randId = (size) => {
  const nums = Array.from({ length: 10 }, (_, i) =>
    String.fromCharCode("0".charCodeAt(0) + i)
  );
  const chars = [...nums];
  const rand = (length) => Math.floor(Math.random() * length);
  return Array.from({ length: size }, () => chars[rand(chars.length)]).join("");
 };

const newlist = menu.map(({ value }) => ({ value, id: randId(6) }));

 console.log(newlist);
