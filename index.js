var url = 'https://polemika.univ-paris8.fr/omk/api/items';


var rt_json = d3.json(url, () => {
}).then((data) => {
    data.forEach(r => {
        console.log(r);
    })
})