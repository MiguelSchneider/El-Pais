function fetchFeed(url) {
	var xhr = new XMLHttpRequest({
		mozSystem : true
	});

	xhr.open('GET', url, true);

	xhr.addEventListener('load', function dataLoaded(e) {
		if(xhr.status == 200 || xhr.status == 0) {
			parseItems(xhr.responseXML);
		} else {
			// TODO : Handle error
			alert(e);
		}
	});
	try {
		xhr.send(null);
	} catch (e) {
		alert('ERROR   ' + e);
	}
};

////////////////////////////////////////////////////
//
// Fetch the main RSS and create the main list
//
////////////////////////////////////////////////////
function parseItems(responseXML) {
	var entries = responseXML.querySelectorAll('item');
	var list = document.getElementById("lista");
	list.innerHTML = "";

	document.getElementById('pubDate').innerHTML = responseXML.querySelector('pubDate').textContent;

	for(var i = 0; i < entries.length; i++) {
		var entry = entries[i];
		var contact = {};
		var title = entry.querySelector('title');
		var link = entry.querySelector('link');
		var description = entry.querySelector('description');
		var content = entry.getElementsByTagNameNS("http://purl.org/rss/1.0/modules/content/", "encoded");
		var pubDate = entry.querySelector('pubDate');
		var vignete = entry.querySelector('enclosure');

		var li = document.createElement("li");
		var par = document.createElement("p");
		var img = document.createElement("img");

		par.appendChild(document.createTextNode(title.textContent));

		var div = document.createElement('div');
		div.setAttribute("id", "description");
		div.appendChild(document.createTextNode(description.textContent));

		if(vignete) {
			img.setAttribute('src', vignete.getAttribute('url'));
			li.appendChild(img);
		}
		li.appendChild(par);
		li.appendChild(div);

		li.setAttribute('news', i);

		var index = new Object();
		index = i;
		li.addEventListener('click', function(evt) {
			showNews(responseXML, this.getAttribute('news'));
		});

		list.appendChild(li);

	}

};

////////////////////////////////////////////////////
//
// Display the content of the Article
//
////////////////////////////////////////////////////
function showNews(responseXML, index) {
	//alert(index);
	var entries = responseXML.querySelectorAll('item');
	var entry = entries[index];
	var pubDate = entry.querySelector('pubDate');
	var content = entry.getElementsByTagNameNS("http://purl.org/rss/1.0/modules/content/", "encoded");
	var description = entry.querySelector('description');
	var vignete = entry.querySelector('enclosure');

	document.getElementById('articleTitle').innerHTML = entry.querySelector('title').textContent;

	var container = document.getElementById('articleContent');
	container.innerHTML = "";

	if(vignete) {
		var img = document.createElement("img");
		img.setAttribute('src', vignete.getAttribute('url'));
		container.appendChild(img);
	}

	var div = document.createElement('div');
	div.setAttribute("id", "description");
	div.appendChild(document.createTextNode(description.textContent));
	container.appendChild(div);
	par = document.createElement("p");
	par.innerHTML = content[0].textContent;
	container.appendChild(par);

	document.getElementById('portada').classList.add('hide');
	document.getElementById('footer').classList.add('hide');
	document.getElementById('article').classList.remove('hide');
	document.getElementById('sections').classList.add('hide');
};

////////////////////////////////////////////////////
//
// Asigning Events to IDs and Buttons
//
////////////////////////////////////////////////////

document.getElementById('backArticle').addEventListener('click', function(evt) {
	document.getElementById('article').classList.add('hide');
	document.getElementById('portada').classList.remove('hide');
	document.getElementById('footer').classList.remove('hide');

});

document.getElementById('reloadButton').addEventListener('click', function(evt) {
	document.getElementById('info').className = 'visible';
	setTimeout(function() {
		document.getElementById('info').className = 'hidden';
	}, 150);
	fetchFeed(url);

});

document.getElementById('menuButton').addEventListener('click', function(evt) {
	if(document.getElementById('sections').classList.contains('hide'))
		document.getElementById('sections').classList.remove('hide');
	else
		document.getElementById('sections').classList.add('hide');

});
////////////////////////////////////////////////////
//
// Asigning RSS to Sections
// And some more info, like headers and timestamp
//
////////////////////////////////////////////////////

document.getElementById('portadaElPais').addEventListener('click', function(evt) {
	url = "http://ep00.epimg.net/rss/elpais/portada.xml";
	fetchFeed(url);
	document.getElementById('sections').classList.add('hide');
	document.getElementById('portadaTitle').innerHTML = "Portada";

});
document.getElementById('deportes').addEventListener('click', function(evt) {
	url = "http://ep00.epimg.net/rss/deportes/portada.xml";
	fetchFeed(url);
	document.getElementById('sections').classList.add('hide');
	document.getElementById('portadaTitle').innerHTML = "Deportes";

});
document.getElementById('internacional').addEventListener('click', function(evt) {
	url = "http://ep00.epimg.net/rss/internacional/portada.xml";
	fetchFeed(url);
	document.getElementById('sections').classList.add('hide');
	document.getElementById('portadaTitle').innerHTML = "Internacional";
});
////////////////////////////////////////////////////
//
// There we go!
//
////////////////////////////////////////////////////

var url = "ElPaisportada.xml";
fetchFeed(url);
url = "http://ep00.epimg.net/rss/elpais/portada.xml";
