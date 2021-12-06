var url = "https://polemika.univ-paris8.fr/omk/api/items";



function showSujets() {

  d3.json(url, () => {}).then((data) => {
    data.forEach((r) => {
      d3.json(r['@id'], () => {

      }).then((data) => {
        console.log(data);
        d3.select('#menu').append('ul').append('li').style('cursor', 'pointer').on('click', () => {
          console.log('clicked : ', data)
          showFiltreItems(data);
        }).html(() => {
          return data['dcterms:subject'][0]['@value'];
        })
      })
    });
  });
}

function showFiltreItems(item) {
  d3.select('#item').append('div').html(() => {
    return 'Titre : ' + item['o:title'] + '<br>'
          + 'Identifiant : ' + item['@id'] + '<br>'
          + 'Media : ' + item['thumbnail_display_urls']['large'];
  })
}
