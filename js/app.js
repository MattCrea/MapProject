new Vue({
    el: '#app', // Instance de la vue 'app'

    data: {
        map: null,
        titleLayer: null, // Initialisation des données : null titres des calques
        layers: [
            {
                id: 0,
                name: 'Porte de Champeret',
                type: 'marker',
                coords: [48.885495, 2.293116],
                active: false,
            },
            {
                id:1,
                name: 'Notre Dame',
                type:'marker',
                coords: [48.852810, 2.350384],
                active: false,
            },
            
        ],
    },

    mounted() {
        this.initMap(); // build init pour la carte et init des calques 
        this.initLayers(); // pointeur this qui se réfère bien à l'instance actuelle
    },

    methods: {
        initMap() {
            this.map = L.map('map').setView([48.856697, 2.351462], 12);
            this.tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                    {
                        maxZoom: 18,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">SpreadSheep</a>, &copy; <a href="https://carto.com/attribution">Carte</a>',
                    }
                );
            this.tileLayer.addTo(this.map); // affichage de la carte source : documentation
        },

        initLayers() {
            this.layers.forEach((layer) =>
            {
                layer.leafletObject = L.marker(layer.coords).bindPopup(layer.name).openPopup(); // affectation de l'objet 'marker' en fonction du layer, affectation coordonnées + popup + auto openPopup
            });
        },
        layerChanged(layerId,active) {
            const layer = this.layers.find(layer => layer.id === layerId); // déclaration layer en fonction du layer.id cliqué
                if (active) 
                {
                    layer.leafletObject.addTo(this.map); // si active == true donc onChanged -> Set marker
                } 
                else 
                {
                    layer.leafletObject.removeFrom(this.map); // sinon si active == false -> unset marker (Par défaut le mode active d'un layer == false) 
                }
        }, 
    },
});