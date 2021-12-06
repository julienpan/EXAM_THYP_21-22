var url = "https://polemika.univ-paris8.fr/omk/api/items";
var ancIndex = -1;
var ancLigne = "";
var liste;


var url_json = d3
.json(url, () => {})
.then((data) => {
  data.forEach((r) => {
    // console.log(r);
    showSujets(r);
  });
});

function showSujets(items) {
    // console.log(items);
    d3.json(items['@id'], () => {

    }).then((data) => {
        console.log(data);
        if(data['dcterms:subject']) {
            menu[0] += "<ul><li id='item'>" + data['dcterms:subject'][0]['@value'] + "</li></ul>";
        }
        d3.select("ul").selectAll('#item').style('cursor', 'pointer').on('click', () => {
            console.log('CLICKED');
        })
    })

}

function showFiltreItems() {
    // d3.select("ul").selectAll('#item').style('cursor', 'pointer').on('click', () => {
    //     console.log('CLICKED');
    // })
}

var menu = new Array();
// menu[0] = "<ul><li>1.1</li><li>1.2</li></ul>";

function init() {
  liste = document.getElementById("menu").getElementsByTagName("li");
}

function debut(i) {
  if (ancIndex >= 0) {
    liste[ancIndex].innerHTML = ancLigne;
  }
  ancLigne = liste[i].innerHTML;
  ancIndex = i;
  liste[i].innerHTML += menu[i];
}


