var url = 'https://polemika.univ-paris8.fr/omk/api/items';

function getData(url) {
    var url_json = d3.json(url, () => {
    }).then((data) => {
        data.forEach(r => {
            // console.log(r);
            showItems(r);
        })
    })
}

function showItems(items) {

    var idItems = {
        subject: '',
        reference: '',
        date : '',
    };
    var mediaItems = [];
    var mediaItem;
    d3.json(items['@id'], () => {
    }).then((data) => {
        // console.log('itemDATA : ', data);
        idItems.subject = data['dcterms:subject'][0]['@value'];
        idItems.reference = data['dcterms:isReferencedBy'][1]['@id'];
        idItems.date = data['dcterms:date'][0]['@value'];

        items['o:media'].forEach(r => {
            // console.log(r);
            mediaItems.push(r['@id']);
            d3.json(mediaItems[0], () => {
            }).then((data) => {
                // console.log('MEDIA DATA : ', data);
                mediaItem = data['o:thumbnail_urls']['large'];
                // console.log('Image : ', mediaItem);
                d3.select('#container')
                .append('div')
                .attr('id', 'subContainer')
                .append('div')
                .style('margin', '10px') 
                .style('cursor', 'pointer')
                .on('click', () => {
                    window.open(idItems.reference, '_blank');
                })
                .html(() => {
                    return  '<b>Identifiant</b> : ' + items['@id'] + '<br>'
                            + '<b>Sujet</b> : ' + idItems.subject + '<br>'
                            // + '<b>Reference</b> : ' + '<a href="'+ idItems.reference +'">Voir plus</a>' + '<br>'
                            + '<b>Date</b> : ' + idItems.date + '<br>'
                            + '<b>Titre</b> : ' + items['o:title'] + '<br>'
                            + '<div id="image" style="width: 100%; height: 200px; display:flex; justify-content:center; align-items:center; margin-top: 20px"><img style="width: 300px; height:100%" src="' + mediaItem + '" alt=""></img></div>';
                })
            })
        })
    })

}

getData(url);